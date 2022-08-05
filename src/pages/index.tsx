import { Flex, Box, useBreakpointValue, Heading, Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast, Input, } from '@chakra-ui/react'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { useRouter } from 'next/router';
import { Sidebar } from '../components/Sidebar'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ApiProducts } from '../services/api';
import { CardProducts } from '../components/CardProducts';
import { ProductsProps } from '../@types/ProductsProps';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Products() {
  const toast = useToast();
  const router = useRouter();
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [pesquisou, setPesquisou] = useState(false);
  const [isModalFilter, setIsModalFilter] = useState(false);


  const [titleFilter, setTitleFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [productsFilter, setProductsFilter] = useState<ProductsProps[]>([]);

  function handleOpenModalSearch() {
    setIsModalFilter(true);
  }

  function handleCloseModalhandleOpenModalSearch() {
    setIsModalFilter(false);
  }

  async function handleFilterTable() {
    try {
      let dados: ProductsProps[];
      setProductsFilter(products);
      if (titleFilter) {
        dados = products.filter((product) => {
          const title = product.title.toUpperCase() ?? "";
          return title.includes(titleFilter.toUpperCase());
        });
      } else {
        dados = products;
      }

      if (priceFilter) {
        dados = dados.filter((product) => {
          const price = product.price ?? "";
          return price.indexOf(priceFilter) > 0;
        });
      } else {
        dados.length == 0 && products;
      }

      toast({
        title: "Consultado Com Sucesso.",
        description: "Os dados foram retornados",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });

      setProductsFilter(dados);
      setPesquisou(true);
      setIsModalFilter(false);
      setPriceFilter("");
      setTitleFilter("");
    } catch (error) {
      console.error("Erro Consulta", error);
    }
  }
  useEffect(() => {
    async function getProducts() {
      const response = await ApiProducts.get('')
      setProducts(response.data)
    }

    getProducts();
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
      <Flex
        w='100%'
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
            <Flex gap={'2'}>
              <Button
                as='a'
                size='md'
                fontSize='md'
                colorScheme='blue'
                cursor={'pointer'}
                leftIcon={<Icon as={MagnifyingGlass} fontSize='20' />}
                onClick={handleOpenModalSearch}
              >
                Filtrar
              </Button>
              <Button
                as='a'
                size='md'
                fontSize='md'
                colorScheme='blue'
                cursor={'pointer'}
                leftIcon={<Icon as={Plus} fontSize='20' />}
                onClick={handleNewProduct}
              >
                Criar novo
              </Button>
            </Flex>
          </Flex>

          <Flex
            flex="1"
            gap="2"
            flexDirection={'column'}
          >
            {pesquisou ? (
              productsFilter.map((product, i) => {
                return (
                  <Box
                    key={i}
                    bg={'gray.900'}
                    borderRadius={"6"}
                    w={'100%'}
                    minH={'200px'}
                    border={'1px solid'}
                    borderColor={'gray.900'}
                    _hover={{ border: '1px solid #2B6CB0', transition: '0.4s ease' }}
                  >
                    <CardProducts
                      title={product.title}
                      content={product.content}
                      price={product.price}
                      responsible={product.responsible}
                      id_product={product.id_product}
                      image={product.image}
                    />
                  </Box>
                )
              }))
              : (
                products.map((product, i) => {
                  return (
                    <Box
                      key={i}
                      bg={'gray.900'}
                      borderRadius={"6"}
                      w={'100%'}
                      minH={'200px'}
                      border={'1px solid'}
                      borderColor={'gray.900'}
                      _hover={{ border: '1px solid #2B6CB0', transition: '0.4s ease' }}
                    >
                      <CardProducts
                        title={product.title}
                        content={product.content}
                        price={product.price}
                        responsible={product.responsible}
                        id_product={product.id_product}
                        image={product.image}
                      />
                    </Box>
                  )
                }))
            }
          </Flex>
        </Box>
      </Flex>

      <Modal
        isOpen={isModalFilter}
        onClose={handleCloseModalhandleOpenModalSearch}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent
          padding={5}
          color="gray.50"
          bg="gray.900"
        >
          <ModalHeader>Filtrar Produtos</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={0}>
            <>
              <Text mb="8px">Titulo Produto: </Text>
              <Input
                // value={}
                // onChange={}
                bg="gray.800"
                focusBorderColor="blue.500"
                placeholder="Titulo Produto"
                borderRadius={2}
                borderColor={"transparent"}
                size="md"
                onChange={(event) => setTitleFilter(event.target.value)}
              />
              <Text mb="8px">Preco Produto: </Text>
              <Input
                // value={}
                // onChange={}
                type='number'
                bg="gray.800"
                focusBorderColor="blue.500"
                placeholder="Preco Produto"
                borderRadius={2}
                borderColor={"transparent"}
                size="md"
                onChange={(event) => setPriceFilter(event.target.value)}
              />
            </>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              borderRadius={4}
              w={100}
              mr={-6}
              onClick={handleFilterTable}
            >
              Consultar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
