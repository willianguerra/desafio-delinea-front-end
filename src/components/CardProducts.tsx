import { Box, Flex, Heading, Image, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductsProps } from "../@types/ProductsProps";

export function CardProducts({ id_product, responsible, title, content, price, image }: ProductsProps) {
  const router = useRouter();
  function handleClick() {
    router.push(`/products/${id_product}`)
  }
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })

  return (
    <Flex
      cursor={"pointer"}
      userSelect={"none"}
      w={'100%'}
      h={'100%'}
      minH={'200px'}
      p={"2rem"}
      onClick={handleClick}
      flexDirection={isDrawerSidebar ? 'column' : 'row'}
      alignItems={isDrawerSidebar ? 'center' : 'row'}
      textAlign={isDrawerSidebar ? 'center' : 'start'}
    >
      <Flex minW="100px" maxW={'150px'} alignItems={'center'} justifyContent='center' pr={'4'}>
        {image ? <Image w={'100%'} h={'100%'} src="https://cutewallpaper.org/24/no-image-png/room-%E2%80%93-south-tahoe-resort.png" alt='Product image' /> : image}
      </Flex>
      <Flex flexDirection={"column"} justifyContent={'space-between'} alignItems="initial">
        <Heading fontSize={'xl'} h={'100%'}>{title}</Heading>
        <Text fontSize="mb" h={'100%'}>{content}</Text>
      </Flex>
    </Flex>
  )
}