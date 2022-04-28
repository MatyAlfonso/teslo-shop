import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { countries } from '../../utils';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        city: Cookies.get('city') || '',
        zip: Cookies.get('zip') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || ''
    };
}

const AddressPage = () => {

    const router = useRouter();

    const { updateAddress } = useContext(CartContext)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            city: '',
            zip: '',
            country: countries[0].code,
            phone: ''
        }
    });

    useEffect(() => {
        reset(getAddressFromCookies());
    }, [reset])


    const onSubmitAddress = (data: FormData) => {
        updateAddress(data);
        router.push('/checkout/summary');
    }

    return (
        <ShopLayout title='Address' pageDescription='Confirm your destination address'>
            <form onSubmit={handleSubmit(onSubmitAddress)}>
                <Typography variant='h1' component='h1'>Address</Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='First Name'
                            variant='filled'
                            fullWidth
                            {...register('firstName', { required: 'First name is required' })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Last Name'
                            variant='filled'
                            fullWidth
                            {...register('lastName', { required: 'Last name is required' })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='First Address'
                            variant='filled'
                            fullWidth
                            {...register('address', { required: 'First address is required' })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Second Address (optional)'
                            variant='filled'
                            fullWidth
                            {...register('address2')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='City'
                            variant='filled'
                            fullWidth
                            {...register('city', { required: 'City is required' })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Postal Code'
                            variant='filled'
                            fullWidth
                            {...register('zip', { required: 'Postal Code is required' })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                key={Cookies.get('country') || countries[0].code}
                                select
                                variant='filled'
                                label='Country'
                                defaultValue={Cookies.get('country') || countries[0].code}
                                {...register('country', { required: 'Country is required' })}
                                error={!!errors.country}
                                helperText={errors.country?.message}
                            >
                                {
                                    countries.map((country) => (
                                        <MenuItem
                                            key={country.code}
                                            value={country.code}
                                        >{country.name}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Phone number'
                            variant='filled'
                            fullWidth
                            {...register('phone', { required: 'Phone number is required' })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type='submit' color='secondary' className='circular-btn' size='large'>
                        Check order
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}

/* export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if (!isValidToken) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }

    return {
        props: {

        }
    }
} */

export default AddressPage;
