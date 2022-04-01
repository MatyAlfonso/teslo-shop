import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Link, Chip } from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
    return (
        <ShopLayout title='Order 123456 checkout' pageDescription="Order checkout" imageFullUrl={''}>
            <Typography variant='h1' component='h1'>Order: abc123 checkout</Typography>
            {/*   <Chip 
                sx={{my:2}}
                label='Not payed yet'
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined/>}
            /> */}
            <Chip
                sx={{ my: 2 }}
                label='Order already payed'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' component='h2'>Order</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Delivery address</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Matias Alfonso</Typography>
                            <Typography>Giosuè Carducci, 8 </Typography>
                            <Typography>Codroipo</Typography>
                            <Typography>33033</Typography>
                            <Typography>Italy</Typography>
                            <Typography>3517724131</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <h1>Pay</h1>
                                <Chip
                                    sx={{ my: 2 }}
                                    label='Order already payed'
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout >
    )
}

export default OrderPage;