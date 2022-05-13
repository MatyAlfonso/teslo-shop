import { GetServerSideProps, NextPage } from 'next';

import { Typography, Grid, Card, CardContent, Divider, Box, Chip } from '@mui/material';

import { CartList, OrderSummary } from '../../../components/cart';
import { AdminLayout } from '../../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined, ConfirmationNumberOutlined } from '@mui/icons-material';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

    return (
        <AdminLayout title='Order checkout' subtitle={`OrderId: ${order._id}`} icon={<ConfirmationNumberOutlined />}>
            {
                order.isPaid
                    ? (
                        <Chip
                            sx={{ my: 2 }}
                            label='Order already paid'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined />}
                        />
                    ) : (
                        <Chip
                            sx={{ my: 2 }}
                            label='Not paid yet'
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


                                <Box display='flex' flexDirection='column'>
                                    {
                                        order.isPaid
                                            ? (
                                                <Chip
                                                    sx={{ my: 2, flex: 1 }}
                                                    label='Order already paid'
                                                    variant='outlined'
                                                    color='success'
                                                    icon={<CreditScoreOutlined />}
                                                />
                                            ) : (
                                                <Chip
                                                    sx={{ my: 2, flex: 1 }}
                                                    label='Not paid yet'
                                                    variant='outlined'
                                                    color='error'
                                                    icon={<CreditCardOffOutlined />}
                                                />
                                            )
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout >
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/admin/orders',
                permanent: false
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