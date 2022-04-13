import { useContext, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from "../../components/layouts";
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';

import { IProduct, ICartProduct, ISize } from '../../interfaces';
import { dbProducts } from '../../database';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();

  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  })

  const selectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) { return; }

    addProductToCart(tempCartProduct);
    router.push('/cart');
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description} imageFullUrl={""}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>${product.price}</Typography>

            {/*Quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={quantity => onUpdateQuantity(quantity)}
                maxValue={product.inStock}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={selectedSize}
              />
            </Box>

            {/* Add to cart if there are products in stock */}

            {
              (product.inStock > 0)
                ? (
                  <Button color='secondary' className='circular-btn' onClick={onAddProduct}>
                    {
                      tempCartProduct.size
                        ? 'Add to cart'
                        : 'Select size'
                    }
                  </Button>
                ) : (
                  <Chip label='Out of stock' color='error' variant='outlined' />
                )
            }

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

export default ProductPage;