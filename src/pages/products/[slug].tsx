import { Box, Button, Flex, Heading, Input, Textarea, useBreakpointValue, useToast } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { ClipLoader } from "react-spinners";
import { ProductsProps } from "../../@types/ProductsProps";
import { Sidebar } from "../../components/Sidebar";
import { ApiProducts } from "../../services/api";

export default function Products(props: { logado: Boolean }) {
  const toast = useToast();
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductsProps>({
    id_product: '',
    responsible: '',
    title: '',
    content: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    async function getProducts() {
      const response = await ApiProducts.get('')

      if (response.status === 200) {
        const product = response.data.filter((product: { id_product: string | string[] | undefined; }) => product.id_product === slug)
        setProducts(product[0])
      }
    }
    if (slug == 'create') {
      return;
    } else {
      getProducts();
    }
  }, [slug])

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  });

  async function handleDeleteProduct() {
    try {
      setLoading(true)
      const response = await ApiProducts.delete(`/${products.id_product}/`);

      if (response.status != 204) {
        toast({
          title: "Erro ao editar novo Produto!",
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => setLoading(false),
        });
        return;
      }

      toast({
        title: "Produto deletado com sucesso!",
        description: "Rendirecionando...",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => router.push('/'),
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  async function handleChangeProduct() {
    try {
      setLoading(true)
      const response = await ApiProducts.put(`/${products.id_product}/`, {
        body: {
          "id_product": products.id_product,
          "responsible": products.responsible,
          "title": products.title,
          "content": products.content,
          "price": products.price,
          "image": ''
        }
      });

      if (response.status != 200) {
        toast({
          title: "Erro ao editar novo Produto!",
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => setLoading(false),
        });
        return;
      }

      toast({
        title: "Produto editado com sucesso!",
        description: "Rendirecionando...",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => router.push('/'),
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }
  async function handleNewProduct() {
    try {
      setLoading(true)
      const response = await ApiProducts.post('', {
        body: {
          "responsible": products.responsible,
          "title": products.title,
          "content": products.content,
          "price": products.price,
          "image": ''
        }
      });

      if (response.status != 201) {
        toast({
          title: "Erro ao Cadastrar/Alterar produto!",
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => setLoading(false),
        });
        return;
      }

      toast({
        title: "Produto cadastrado com sucesso!",
        description: "Rendirecionando...",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => router.push('/'),
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
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


              {props.logado && slug != 'create' && (
                <Button
                  title={'Deletar Produto'}
                  type='submit'
                  mt='6'
                  colorScheme='red'
                  size='lg'
                  borderRadius={2}
                  onClick={handleDeleteProduct}
                  isLoading={loading}
                >
                  <Trash />
                </Button>
              )}

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
                onChange={(event) => {
                  setProducts({ ...products, title: event.target.value });
                }}
              />
              <Input
                disabled={slug != 'create'}
                border="none"
                color="#dcdcdc"
                bg={'gray.900'}
                focusBorderColor='blue.600'
                borderRadius={3}
                pr='4.5rem'
                type={'text'}
                placeholder='Responsável'
                value={products.responsible}
                onChange={(event) => {
                  setProducts({ ...products, responsible: event.target.value });
                }}
              />
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
                placeholder='Preco'
                value={products.price}
                onChange={(event) => {
                  setProducts({ ...products, price: event.target.value });
                }}
              />

              <Input
                disabled={slug != 'create'}
                border="none"
                color="#dcdcdc"
                bg={'gray.900'}
                focusBorderColor='blue.600'
                borderRadius={3}
                pr='4.5rem'
                type="file"
                placeholder='Imagem'
                onChange={(event) => {
                  setProducts({ ...products, image: event.target.value });
                }}
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
              onChange={(event) => {
                setProducts({ ...products, content: event.target.value });
              }}
            />
            <Flex w={'full'} justifyContent={'flex-end'} gap={'2'}>
              {props.logado && (
                <Button
                  title={'Cadastrar/Alterar Produto'}
                  type='submit'
                  mt='6'
                  colorScheme='blue'
                  size='lg'
                  borderRadius={2}
                  onClick={slug == 'create' ? handleNewProduct : handleChangeProduct}
                >
                  Confirmar
                </Button>
              )}
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
      logado: validado == 'TRUE',
    },
  };
};
