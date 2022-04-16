import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { tesloApi } from '../../api';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
    name: string;
    email: string,
    password: string,
};

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterForm = async ({ name, email, password }: FormData) => {

        setShowError(false);

        const { hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            return;
        }

        router.replace('/');
    }

    return (
        <AuthLayout title={'Register'}>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>
                                Register
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
                                label='Full name'
                                variant='filled'
                                fullWidth
                                {...register('name', {
                                    required: 'Name is required',
                                    minLength: { value: 3, message: 'Name must be at least 3 characters' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
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
                                helperText={errors.email?.message} />
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
                                helperText={errors.password?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color='secondary' className='circular-btn' size='large' fullWidth type='submit'>
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
            </form>
        </AuthLayout>
    )
}

export default RegisterPage;