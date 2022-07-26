import { Box, Button, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Sidebar } from '../components/Sidebar'

const Home: NextPage = () => {

  const isMobile = useBreakpointValue({
    base: true,
    lg: false
  })

  return (
    <>
      <Head>
        <title>Home | Delinea</title>
      </Head>
      <Flex w='100%'
        bg={'gray.800'}
        minHeight={'100vh'}
        h={'full'}
        color='gray.50'
        mx='auto'
        px={['4', '4', '6']}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Sidebar />
        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Home
            </Heading>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default Home
