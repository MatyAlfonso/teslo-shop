import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts'

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
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Show order
                    </Link>
                </NextLink>
            )
        }
    },
];

const rows = [
    { id: '1', paid: true, fullName: 'Matias Alfonso' },
    { id: '2', paid: false, fullName: 'Giosuè Carducci' },
    { id: '3', paid: true, fullName: 'Solange Gadischeski' },
    { id: '4', paid: false, fullName: 'Minerva Alfonso' },
]

const HistoryPage = () => {
    return (
        <ShopLayout title={'Order History'} pageDescription={'Client Order History'}>
            <Typography variant='h1' component='h1'>Order History</Typography>

            <Grid container>
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

export default HistoryPage;