import { CartState } from './';
import { ICartProduct } from '../../interfaces';
import { ShippingAddress } from './';

type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update products in cart', payload: ICartProduct[] }
    | { type: '[Cart] - Change cart quantity', payload: ICartProduct }
    | { type: '[Cart] - Remove product from cart', payload: ICartProduct }
    | { type: '[Cart] - Load address from cookies', payload: ShippingAddress }
    | { type: '[Cart] - Update address', payload: ShippingAddress }

    | {
        type: '[Cart] - Update order summary',
        payload: {
            numberOfItems: number,
            subTotal: number,
            tax: number,
            total: number
        }
    }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }
        case '[Cart] - Update products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }
        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product;
                    if (product.size !== action.payload.size) return product;

                    return action.payload;
                })
            }
        case '[Cart] - Remove product from cart':
            return {
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
            }
        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }
        case '[Cart] - Update address':
        case '[Cart] - Load address from cookies':
            return {
                ...state,
                shippingAddress: action.payload
            }
        default:
            return state;
    };
};