import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react'
import { AdminLayout } from '../../../components/layouts';
import useSWR from 'swr';
import { IOrder } from '../../../interfaces/order';
import { IUser } from '../../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Full Name', width: 300 },
    { field: 'total', headerName: 'Total', width: 300 },
    {
        field: 'isPaid',
        headerName: 'Paid',
        renderCell: ({ row }: GridValueGetterParams) => {
            return row.isPaid
                ? (<Chip variant='outlined' label='Paid' color='success' />)
                : (<Chip variant='outlined' label='Not paid' color='error' />)
        },
    },
    { field: 'noProducts', headerName: 'N° of Products', align: 'center', width: 150 },
    {
        field: 'check',
        headerName: 'See order',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>See order</a>
            )
        },
    },
    { field: 'createdAt', headerName: 'Created at', width: 300 },

];

const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if (!data && !error) return (<></>);

    const rows = data!.map(order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: order.createdAt,

    }));

    return (
        <AdminLayout
            title={'Orders'}
            subtitle={'Orders maintenance'}
            icon={<ConfirmationNumberOutlined />}
        >

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 'calc(100vh - 250px)', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>

        </AdminLayout>
    )
}

export default OrdersPage;