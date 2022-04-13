import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';

const productSchema: Schema = new Schema({
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String
        }
    ],
    inStock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    sizes: [
        {
            type: String,
            enum: {
                values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                message: '{VALUE} is not a valid size.'
            }
        }
    ],
    slug: {
        type: String,
        required: true,
        unique: true
    },
    tags: [
        {
            type: String
        }
    ],
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: '{VALUE} is not a valid type.'
        }
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['men', 'women', 'kids', 'unisex'],
            message: '{VALUE} is not a valid gender.'
        }
    }
}, {
    timestamps: true
});

productSchema.index({title: 'text', tags: 'text'})

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;