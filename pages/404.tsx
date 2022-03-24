import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout } from '../components/layouts';

const Custom404Page = () => {
    return (
        <ShopLayout title='Page not found' pageDescription='There is nothing to show in here...' imageFullUrl={''}>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>
                    404 |
                </Typography>
                <Typography marginLeft={2}>
                    We couldn't find a page here
                </Typography>
            </Box>
        </ShopLayout>
    )
}

export default Custom404Page;