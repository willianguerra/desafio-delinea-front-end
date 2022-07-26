import { Flex, Box, Text, useBreakpointValue, Heading, Link, Button, Icon } from '@chakra-ui/react'
import { Plus } from 'phosphor-react'
import { useRouter } from 'next/router';
import { Sidebar } from '../../components/Sidebar'
import Head from 'next/head';


export default function Produtos() {
  const router = useRouter();

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