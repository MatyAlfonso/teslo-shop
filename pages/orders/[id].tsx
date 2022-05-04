import { GetServerSideProps, NextPage } from 'next';

import { Typography, Grid, Card, CardContent, Divider, Box, Link, Chip } from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

    return (
        <ShopLayout title='Order checkout' pageDescription="Order checkout" imageFullUrl={''}>
            <Typography variant='h1' component='h1'>Order: {order._id} checkout</Typography>
            {
                order.isPaid
                    ? (
                        <Chip
                            sx={{ my: 2 }}
                            label='Order already payed'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined />}
                        />
                    ) : (
                        <Chip
                            sx={{ my: 2 }}
                            label='Not payed yet'
                            variant='outlined'
                            color='error'
                            icon={<CreditCardOffOutlined />}
                        />
                    )
            }

            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' component='h2'>Order</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Delivery address</Typography>
                            </Box>

                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                            <Typography>{shippingAddress.city}</Typography>
                            <Typography>{shippingAddress.zip}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrderSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    total: order.total,
                                    tax: order.tax,
                                }}
                            />

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                {
                                    order.isPaid
                                        ? (
                                            <Chip
                                                sx={{ my: 2 }}
                                                label='Order already payed'
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditScoreOutlined />}
                                            />
                                        ) : (
                                            <h1>Pay</h1>
                                        )
                                }
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout >
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;