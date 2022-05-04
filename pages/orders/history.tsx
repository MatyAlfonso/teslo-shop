import { GetServerSideProps, NextPage } from 'next';

import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts'
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'fullName', headerName: 'Full name', width: 300 },
    {
        field: 'paid',
        headerName: 'Paid',
        description: 'Show if the order is paid or not',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Payed' variant='outlined' />
                    : <Chip color='error' label='Not payed' variant='outlined' />
            )
        }
    },
    {
        field: 'order',
        headerName: 'Order link',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline='always'>
                        Show order
                    </Link>
                </NextLink>
            )
        }
    },
];

interface Props {
    orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows = orders.map((order, index) => ({
        id: index + 1,
        paid: order.isPaid,
        fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        orderId: order._id
    }))

    return (
        <ShopLayout title={'Order History'} pageDescription={'Client Order History'}>
            <Typography variant='h1' component='h1'>Order History</Typography>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id);

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage;