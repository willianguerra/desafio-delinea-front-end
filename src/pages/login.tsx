/* eslint-disable react/no-children-prop */
import { Box, Button, Flex, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Text, useBreakpointValue, useToast } from "@chakra-ui/react";
import { ArrowLeft, Envelope, Eye, EyeSlash, Lock, User } from "phosphor-react";
import { useContext, useState } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import { AuthContext } from "../contexts/AuthContexts";
import { api } from "../services/api";

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const toast = useToast();
  const isMobile = useBreakpointValue({
    base: true,
    lg: false
  })

  async function handleSignIn() {
    try {
      setLoading(true);

      if (!username || !password) {
        toast({
          title: "Erro ao realizar login!",
          description: "Usuário ou senha não informados",
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => setLoading(false),
        });

        return;
      }
      const logado = await signIn({ username, password });

      if (logado) {
        toast({
          title: "Logado com sucesso!",
          description: "Redirecionando...",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        router.push("/");
      } else {
        toast({
          title: "Erro ao realizar login!",
          description: "Usuário ou senha incorretos",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Erro Login: ", error);
    }
  }

  function handleOpenOrCloseSignup() {
    setRegister(!register);
  }

  async function handleSignUp() {
    const response = await api.post('/api/user', {
      "username": username,
      "password": password,
      "email": email
    });

    if (response.status != 201) {
      toast({
        title: "Erro ao cadastrar usuário!",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setLoading(false),
      });
      return;
    }

    toast({
      title: "Usuário cadastrado com sucesso!",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
      onCloseComplete: () => {
        setRegister(false)
        setLoading(false)
      }
    });
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
              {register && (
                <Text
                  color={'white'}
                  cursor='pointer'
                  mt={isMobile ? -8 : -10}
                  fontSize={'2xl'}
                  position={'absolute'}
                  onClick={handleOpenOrCloseSignup}
                >
                  <ArrowLeft />
                </Text>
              )}
              <Stack spacing='4'>
                <InputGroup size='lg'>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<User color="#dcdcdc" />}
                  />
                  <Input
                    border="none"
                    color="#dcdcdc"
                    bg={'gray.900'}
                    focusBorderColor='blue.600'
                    type='text'
                    placeholder='Usuário'
                    borderRadius={3}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                </InputGroup>

                {register && (
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
                      type='email'
                      placeholder='Email'
                      borderRadius={3}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </InputGroup>
                )}

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
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <InputRightElement onClick={handleClick} children={show ? <EyeSlash color="#dcdcdc" /> : <Eye color="#dcdcdc" />} />
                </InputGroup>
              </Stack>

              <Button
                type='button'
                mt='6'
                colorScheme='blue'
                size='lg'
                borderRadius={2}
                onClick={register ? handleSignUp : handleSignIn}
                isLoading={loading}
              >
                {register ? 'Cadastrar' : 'Entrar'}
              </Button>

              <Flex color={'gray.50'} w={'full'} alignItems={'center'} flexDirection={'column'}>

                <Text color={'gray.50'} w={'full'} textAlign='center' py={4} >
                  Não tem uma conta? <Link color={'blue.500'} fontWeight={'600'} textDecoration='none' onClick={handleOpenOrCloseSignup}> Registre-se</Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}