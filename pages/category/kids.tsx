import { Typography } from "@mui/material";
import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const KidsPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=kids');

    return (
        <ShopLayout title={'Teslo | Shop - Kids'} pageDescription={'Find the best kids Teslo products here'} imageFullUrl={''}>

            <Typography variant='h1' component='h1'>Kids</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>All kids products</Typography>

            {isLoading
                ? <FullScreenLoading />
                : <ProductList products={products} />
            }

        </ShopLayout>
    )
}

export default KidsPage;