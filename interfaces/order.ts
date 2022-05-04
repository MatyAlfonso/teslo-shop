import { IUser, ISize } from "./";

export interface IOrder {
    _id?: string;
    user?: IUser | string;
    orderItems: IOrderItem[]
    shippingAddress: ShippingAddress;
    paymentResult?: string;

    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    isPaid: boolean;
    paydAt?: string;
}

export interface IOrderItem {
    _id: string;
    title: string;
    size: ISize;
    quantity: number;
    slug: string;
    image: string;
    price: number;
    gender: string;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
}