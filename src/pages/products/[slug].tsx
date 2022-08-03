import { Box, Button, Flex, Heading, Input, Textarea, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { ClipLoader } from "react-spinners";
import { ProductsProps } from "../../@types/ProductsProps";
import { Sidebar } from "../../components/Sidebar";
import { ApiProducts } from "../../services/api";

export default function Products() {

  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState<ProductsProps>({
    id_product: '',
    responsible: '',
    title: '',
    content: '',
    price: '',
  });

  useEffect(() => {
    async function getProdutos() {
      const response = await ApiProducts.get('')

      if (response.status === 200) {
        const product = response.data.filter((product: { id_product: string | string[] | undefined; }) => product.id_product === slug)
        setProducts(product[0])
      }
    }
    if (slug == 'create') {
      return;
    } else {
      getProdutos();
    }
  }, [slug])

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  });


  async function handleChangeProduct() {
    // const response = await ApiProducts.put('', )
    console.log(`vai alterar`)
  }
  async function handleNewProduct() {
    // const response = await ApiProducts.post('', )
    console.log(`vai cadastrar`)
  }

  return (
    <>
      <Head>
        <title>Products | Delinea</title>
      </Head>

      {products.id_product != '' || slug == 'create' ? (

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
                {slug != 'create' ? `Produto ${products.title}` : 'Novo Produto'}
              </Heading>

            </Flex>
            <Flex justifyContent={isDrawerSidebar ? 'space-between' : 'center'} flexDirection={isDrawerSidebar ? 'column' : 'row'} gap='2' mb='2' >

              <Input
                border="none"
                color="#dcdcdc"
                bg={'gray.900'}
                focusBorderColor='blue.600'
                borderRadius={3}
                pr='4.5rem'
                type={'text'}
                placeholder='Titúlo'
                value={products.title}
              />
              <Input
                border="none"
                color="#dcdcdc"
                bg={'gray.900'}
                focusBorderColor='blue.600'
                borderRadius={3}
                pr='4.5rem'
                type={'text'}
                placeholder='Responsável'
                value={products.responsible}
              />
              <Input
                border="none"
                color="#dcdcdc"
                bg={'gray.900'}
                focusBorderColor='blue.600'
                borderRadius={3}
                pr='4.5rem'
                type={'text'}
                placeholder='Preco'
                value={products.price}
              />
            </Flex>

            <Textarea
              border="none"
              color="#dcdcdc"
              bg={'gray.900'}
              focusBorderColor='blue.600'
              borderRadius={3}
              pr='4.5rem'
              placeholder='Conteúdo'
              value={products.content}
            />
            <Flex w={'full'} justifyContent={'flex-end'}>
              <Button
                type='submit'
                mt='6'
                colorScheme='blue'
                size='lg'
                borderRadius={2}
                onClick={slug == 'create' ? handleNewProduct : handleChangeProduct}
                isLoading={false}
              >
                {slug == 'create' ? ('Cadastrar') : ('Alterar')}
              </Button>
            </Flex>
          </Box>
        </Flex >
      ) : (

        <Flex w={'100vw'} h={'100vh'} alignItems={'center'} justifyContent='center'>
          <LoadingOverlayWrapper
            active={true}
            spinner={<ClipLoader color="blue" />}
          />
        </Flex>
      )
      }
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
