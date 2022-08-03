import { Flex, Box, Text, useBreakpointValue, Heading, Link, Button, Icon } from '@chakra-ui/react'
import { Plus } from 'phosphor-react'
import { useRouter } from 'next/router';
import { Sidebar } from '../../components/Sidebar'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ApiProducts } from '../../services/api';
import { CardProducts } from '../../components/CardProducts';
import { ProductsProps } from '../../@types/ProductsProps';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';


export default function Produtos() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    async function getProdutos() {
      const response = await ApiProducts.get('')

      setProducts(response.data)
      console.log(response.data)
    }

    getProdutos();
  }, [])
  function handleNewProduct() {
    router.push('/products/create');
  }
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })


  return (
    <>
      <Head>
        <title>Products | Delinea</title>
      </Head>
      <Flex w='100%'
        bg={'gray.800'}
        minHeight={'100vh'}
        h={'full'}
        color='gray.50'
        mx='auto'
        px={['4', '4', '6']}
        flexDirection={isDrawerSidebar ? 'column' : 'row'}
      >
        <Sidebar />
        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Produtos
            </Heading>

            <Button
              as='a'
              size='sm'
              fontSize='sm'
              colorScheme='blue'
              cursor={'pointer'}
              leftIcon={<Icon as={Plus} fontSize='20' />}
              onClick={handleNewProduct}
            >
              Criar novo
            </Button>
          </Flex>

          <Flex>
            {products && (
              products.map((product, i) => (
                <CardProducts title={product.title} content={product.content} price={product.price} responsible={product.responsible} key={i} id_product={product.id_product} />
              ))
            )}
          </Flex>


        </Box>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["logado"]: validado } = parseCookies(ctx);

  if (validado != "TRUE") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
    },
  };
};
