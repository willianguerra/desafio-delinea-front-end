import { ElementType } from "react";
import { Text, Link as ChakraLink, Icon, LinkProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  let isActive = false
  const router = useRouter()
  if (router.asPath === href) {
    isActive = true
  }

  function handleClickLink() {
    router.push(href);
  }

  return (
    <ChakraLink onClick={handleClickLink} display='flex' alignItems="center" justifyContent="start" {...rest} color={isActive ? 'blue.500' : 'gray.50'}>
      <Icon as={icon} fontSize='20' />
      <Text ml='2' fontWeight='medium' >{children}</Text>
    </ChakraLink>
  )
}