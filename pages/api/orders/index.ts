import type { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from '../../../interfaces';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { Product, Order } from '../../../models';

type Data =
    | { message: string }
    | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { orderItems, total } = req.body as IOrder;

    // Verify we have an user 
    const session: any = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Create array of order items
    const productsIds = orderItems.map(product => product._id);
    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    try {
        const subTotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price;
            if (!currentPrice) {
                throw new Error('Product not found');
            }
            return (currentPrice * current.quantity) + prev;
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * (taxRate + 1);

        if (total.toLocaleString() !== backendTotal.toLocaleString()) {
            throw new Error('Total is not correct');
        } // Is made with toLocaleString() to round up the backendTotal number, with Math.round() it will round down the number and it won't match

        // So far so good, create order
        const userId = session.user._id;
        const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
        newOrder.total = Math.round(newOrder.total * 100) / 100;
        await newOrder.save();
        await db.disconnect();

        return res.status(201).json(newOrder);
        //return res.status(201).json({ message: `${total.toLocaleString()} ${backendTotal.toLocaleString()} ${total.toLocaleString() !== backendTotal.toLocaleString()}` });
    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Bad Request'
        });
    }

    //return res.status(201).json(req.body);
}
