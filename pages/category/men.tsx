import { Typography } from "@mui/material";
import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const MenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=men');

    return (
        <ShopLayout title={'Teslo | Shop - Men'} pageDescription={'Find the best men Teslo products here'} imageFullUrl={''}>

            <Typography variant='h1' component='h1'>Men</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>All men products</Typography>

            {isLoading
                ? <FullScreenLoading />
                : <ProductList products={products} />
            }

        </ShopLayout>
    )
}

export default MenPage;