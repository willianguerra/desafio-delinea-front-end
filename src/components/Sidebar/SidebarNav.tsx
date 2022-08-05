import { Flex, Stack, Text } from "@chakra-ui/react";

import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";
import { Barcode, ChartBar } from "phosphor-react";

export function SidebarNav() {
  return (
    <Stack spacing='14' align='flex-start' >
      <NavSection title='Geral'>
        <NavLink icon={ChartBar} href='/' _hover={{ color: 'blue.500', transition: '0.5s ease', textDecoration: 'none' }}>Dashboard</NavLink>
        <NavLink icon={Barcode} href='/products' _hover={{ color: 'blue.500', transition: '0.5s ease', textDecoration: 'none' }}>Produtos</NavLink>
      </NavSection>
    </Stack>
  )
}