import { Flex, Box, Text, useBreakpointValue, Heading, Link, Button, Icon } from '@chakra-ui/react'
import { Plus } from 'phosphor-react'
import { useRouter } from 'next/router';
import { Sidebar } from '../../components/Sidebar'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';


export default function Produtos() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProdutos() {
      const response = await api.get('products/',
        {
          headers: {
            contentType: 'application/json',
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5MzE2ODAxLCJpYXQiOjE2NTkzMTY1MDEsImp0aSI6IjU5MmUwODYzZmVlOTRmODViNWRjYjNjYzczNTU1NWFmIiwidXNlcl9pZCI6MX0.m0MtfWPGrBubuI7X-PMecvh37HCTJjV5bR4dAk_x700`,
          },
        })

      console.log(response)
    }

    getProdutos();
  }, [])
  function handleNewProduct() {
    router.push('/products/1');
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


        </Box>
      </Flex>
    </>
  )
}