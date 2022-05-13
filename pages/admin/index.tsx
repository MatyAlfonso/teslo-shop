import useSWR from 'swr';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts';
import { DashboardSummaryResponse } from '../../interfaces';
import { useEffect, useState } from 'react';

const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000, // 30 seconds
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Tick');
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!error && !data) {
        return <></>
    }

    if (error) {
        console.log(error);
        return <Typography>Error while trying to load data</Typography>;
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoStock,
        lowStockProducts,
        notPaidOrders
    } = data!;

    return (
        <AdminLayout
            title='Dashboard'
            subtitle='General Stats'
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>

                <SummaryTile
                    title={numberOfOrders}
                    subtitle='Total orders'
                    icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={paidOrders}
                    subtitle='Paid orders'
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={notPaidOrders}
                    subtitle='Pending orders'
                    icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfClients}
                    subtitle='Clients'
                    icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfProducts}
                    subtitle='Products'
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={productsWithNoStock}
                    subtitle='Products out of stock'
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={lowStockProducts}
                    subtitle='Low stock'
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={refreshIn}
                    subtitle='Update in:'
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />

            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage;