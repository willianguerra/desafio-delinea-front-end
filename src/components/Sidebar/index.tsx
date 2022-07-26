import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, IconButton, Image, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { List } from "phosphor-react";
import { useRouter } from "next/router";

import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })

  function handleLogo() {
    router.push('/')
  }

  if (isDrawerSidebar) {
    return (
      <>
        <Flex h={20} alignItems={'center'}>
          <IconButton
            aria-label="Open Navigation"
            icon={<Icon as={List} />}
            fontSize="24"
            variant="unstyled"
            mr="2"
            onClick={onOpen}
          />
          <Image w={10} h={10} src="https://www.delinea.com.br/wp-content/uploads/2021/12/favicon-delinea.png" alt="" />
        </Flex>
        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent p='4' bg={'gray.900'} color={'gray.50'}>
              <DrawerCloseButton mt='6' />
              <DrawerHeader>Navegação</DrawerHeader>
              <DrawerBody>
                <SidebarNav />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    )
  }

  return (
    <Box as='aside' w='64' mt={5}>
      <Flex alignItems={'center'} onClick={handleLogo} cursor='pointer'>
        <Image w={10} h={10} src="https://www.delinea.com.br/wp-content/uploads/2021/12/favicon-delinea.png" alt="" />
        <Text color="gray.50" fontSize='2xl' ml={2}>delinea</Text>
      </Flex>
      <SidebarNav />
    </Box>
  )
}