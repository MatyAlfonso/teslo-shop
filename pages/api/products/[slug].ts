import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
    | { message: string }
    | IProduct

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProductsBySlug(req, res)

        default:
            return res.status(400).json({ message: 'Method not allowed' });
    }
}

const getProductsBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const { slug } = req.query;
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) {
        return res.status(400).json({ message: 'Product not found' });
    }

    product.images = product.images.map(image => {
        return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
    });

    return res.json(product);
}
