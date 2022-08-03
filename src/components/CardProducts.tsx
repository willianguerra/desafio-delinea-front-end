import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductsProps } from "../@types/ProductsProps";

export function CardProducts({ id_product, responsible, title, content, price }: ProductsProps) {
  const router = useRouter();
  function handleClick() {
    router.push(`/products/${id_product}`)
  }

  return (
    <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} bg={'gray.900'} p={8} m={4} onClick={handleClick} cursor={'pointer'}>
      <Box>
        <Image src="https://www.delinea.com.br/wp-content/uploads/2021/12/favicon-delinea.png" alt='delinea logo' />
      </Box>
      <Flex w={'full'} justifyContent={'space-between'} mt={'4'}>
        <Text fontSize="2xl">{title}</Text>
        <Text fontSize="2xl">{price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
      </Flex>
    </Flex>
  )
}