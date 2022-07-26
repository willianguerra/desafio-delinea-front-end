/* eslint-disable react/no-children-prop */
import { Box, Button, Flex, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { Envelope, Eye, EyeSlash, Lock } from "phosphor-react";
import { useState } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";

export default function Login() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const router = useRouter();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false
  })

  function handleSignIn() {
    router.push('/');
  }

  return (

    <>
      <Head>
        <title>Login | Delinea</title>
      </Head>
      <Flex
        w={'100%'}
        bg={'gray.900'}
        align='center'
        justify='center'
        userSelect={'none'}
        minHeight={'100vh'}
        h={'100%'}
      >
        <Flex
          align='center'
          justify='space-between'
          w={'full'}
          h={'100vh'}
          flexDirection={isMobile ? 'column' : 'row'}
          maxWidth='1000px'
        >
          <Flex
            px={isMobile ? 4 : 0}
            justify='center'
            h={'100vh'}
            align='center'
            flexDirection={'column'}
            gap={6}
          >
            <Flex w={'100%'} alignItems={isMobile ? 'center' : 'start'} pt={isMobile ? 4 : 0}>
              <Image w={isMobile ? 14 : 28} src="https://www.delinea.com.br/wp-content/uploads/2021/12/favicon-delinea.png" alt='delinea logo' />
              <Text color="gray.50" fontSize={isMobile ? '4xl' : '6xl'} ml={4}>delinea</Text>
            </Flex>
            <Box textAlign={isMobile ? 'center' : 'left'}>
              <Text color="gray.50" fontSize={isMobile ? '3xl' : '5xl'} fontWeight={'600'} ml={4}>
                Faça o login em nosso Marketplace
              </Text>
            </Box>
          </Flex>

          <Flex
            w={'100%'}
            h={'100vh'}
            alignItems='center'
            justifyContent='center'
            p={isMobile ? 4 : 0}
            maxWidth={480}
          >
            <Flex
              w='100%'
              as='form'
              bg={'gray.800'}
              p={isMobile ? 10 : 16}
              borderRadius={8}
              flexDir='column'
            >
              <Stack spacing='4'>
                <InputGroup size='lg'>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<Envelope color="#dcdcdc" />}
                  />
                  <Input
                    border="none"
                    color="#dcdcdc"
                    bg={'gray.900'}
                    focusBorderColor='blue.600'
                    type='mail'
                    placeholder='Email'
                    borderRadius={3} />
                </InputGroup>

                <InputGroup size='lg' >
                  <InputLeftElement
                    pointerEvents='none'
                    children={<Lock color="#dcdcdc" />}
                  />

                  <Input
                    border="none"
                    color="#dcdcdc"
                    bg={'gray.900'}
                    focusBorderColor='blue.600'
                    borderRadius={3}
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Senha'
                  />

                  <InputRightElement onClick={handleClick} children={show ? <EyeSlash color="#dcdcdc" /> : <Eye color="#dcdcdc" />} />
                  {/* <IconButton variant="unstyled"  aria-label="Open Navigation" icon /> */}
                </InputGroup>
              </Stack>

              <Button
                type='submit'
                mt='6'
                colorScheme='blue'
                size='lg'
                borderRadius={2}
                onClick={handleSignIn}
              >
                Entrar
              </Button>

              <Flex color={'gray.50'} w={'full'} alignItems={'center'} flexDirection={'column'}>

                <Text color={'gray.50'} w={'full'} textAlign='center' py={4} >
                  Não tem uma conta? <Link color={'blue.500'} fontWeight={'600'} textDecoration='none'> Registre-se</Link>
                </Text>
                <Text w={40} borderBottom={'1px solid #2D3748'}></Text>
                <Text color={'gray.50'} textAlign='center' pt={4} pb={1} />
                <Flex alignItems={'center'} justifyContent='center' w={'full'}>
                  <Flex alignItems={'center'} minWidth={'100%'} gap={2} bg={'gray.900'} p={4} borderRadius={4} cursor={'pointer'}>
                    <Image src={'./google.png'} alt="google image" w={8} />
                    Continuar com Google
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}