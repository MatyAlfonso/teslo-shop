import NextLink from 'next/link';
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import { AuthLayout } from '../../components/layouts';

const RegisterPage = () => {
    return (
        <AuthLayout title={'Register'}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>
                            Register
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='First name' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Last name' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Email' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Password' type='password' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='secondary' className='circular-btn' size='large' fullWidth>
                            Create your account
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/login' passHref>
                            <Link underline='always'>Already have an account? Login</Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage;