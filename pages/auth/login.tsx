import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next'
import { signIn, getSession, getProviders } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useForm } from "react-hook-form";
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { isGeneratorObject } from 'util/types';

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {
    const router = useRouter();
    //const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            //console.log({ prov });
            setProviders(prov);
        });
    }, [])


    const onLoginUser = async ({ email, password }: FormData) => {

        setShowError(false);

        /* const isValidLogin = await loginUser(email, password);

        if (!isValidLogin) {
            setShowError(true);
            return;
        }

        const destination = router.query.p?.toString() || '/';
        router.replace(destination); */

        await signIn('credentials', { email, password });
    }

    return (
        <AuthLayout title={'Login'}>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate={true} >
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>
                                Login
                            </Typography>
                            <Chip
                                label='Email or password is incorrect'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                variant='outlined'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label='Email'
                                variant='filled'
                                fullWidth
                                {...register('email', {
                                    required: 'Email is required',
                                    validate: validations.isEmail,
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Password'
                                type='password'
                                variant='filled'
                                fullWidth
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='secondary'
                                className='circular-btn'
                                size='large'
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref>
                                <Link underline='always'>Do not have an account? Create one</Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values(providers).map((provider: any) => {
                                    if (provider.id === 'credentials') return (<div key='credentials'></div>);
                                    return (
                                        <Button
                                            key={provider.id}
                                            variant='outlined'
                                            fullWidth
                                            color='primary'
                                            sx={{ mb: 1 }}
                                            onClick={() => signIn(provider.id)}
                                        >
                                            {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });

    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default LoginPage;