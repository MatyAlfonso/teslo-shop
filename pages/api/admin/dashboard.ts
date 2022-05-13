import type { NextApiRequest, NextApiResponse } from 'next'
import { Order, Product, User } from '../../../models';
import { disconnect, connect } from '../../../database/db';
import { db } from '../../../database';

type Data = {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number;
    numberOfProducts: number;
    productsWithNoStock: number;
    lowStockProducts: number; // products with stock less than 10
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();

    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoStock,
        lowStockProducts
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10 } }).count(),
    ])

    await db.disconnect();

    res.status(200).json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoStock,
        lowStockProducts,
        notPaidOrders: numberOfOrders - paidOrders,
    });
}

