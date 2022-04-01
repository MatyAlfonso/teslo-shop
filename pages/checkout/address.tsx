import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const AddressPage = () => {
    return (
        <ShopLayout title='Address' pageDescription='Confirm your destination address'>
            <Typography variant='h1' component='h1'>Address</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField label='Name' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Last Name' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='First Address' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Second Address (optional)' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Postal Code' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='City' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select
                            variant='filled'
                            label='Country'
                            value={1}
                        >
                            <MenuItem value={1}>Spain</MenuItem>
                            <MenuItem value={1}>Germany</MenuItem>
                            <MenuItem value={1}>United Kingdom</MenuItem>
                            <MenuItem value={1}>Italy</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Phone number' variant='filled' fullWidth />
                </Grid>
            </Grid>
            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button color='secondary' className='circular-btn' size='large'>
                    Check order
                </Button>
            </Box>
        </ShopLayout>
    )
}

export default AddressPage;