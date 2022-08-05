import { Box, Button, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { Sidebar } from '../components/Sidebar'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options1 = {
  colors: ['#174bdb'],
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    }
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
    theme: 'dark'
  },
  xaxis: {
    // type: 'category',
    axisBorder: {
      color: "#363535"
    }, axisTicks: {
      color: "#363535"
    },
    categories: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
    ]
  }

};

const series1 = [
  {
    name: 'One', data: [31, 120, 10, 28, 50, 109, 169]
  }
];
const series2 = [
  {
    name: 'One', data: [0, 15, 30]
  }
];
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
          <Flex mb='8' justify='space-between' >
            <Heading size='lg' fontWeight='normal'>
              Dashboard
            </Heading>
          </Flex>
          <Flex flex='1'>
            <Flex flexWrap={isMobile ? 'wrap' : 'nowrap'} height='100%' w={'100%'} gap={2} justifyContent={'space-between'}>

              <Box bg='gray.900' pt={5} pl={8} w={'100%'} minH='200px' borderRadius={4}>
                Produtos Cadastrados Semana
                <Box h={'100%'} pr={12} pb={4}>
                  <Chart options={options1} series={series1} type="area" height="160" />
                </Box>
              </Box>

              <Box bg='gray.900' pt={5} pl={8} w={'100%'} minH='200px' borderRadius={8}>
                Produtos Cadastrados Mensal
                <Box h={'100%'} pr={12} pb={4}>
                  <Chart options={options1} series={series2} type="area" height="160" />
                </Box>
              </Box>

            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default Home


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
