import { ReactNode } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text mt={6} fontWeight='bold' color='gray.400' fontSize='small'>{title}</Text>
      <Stack spacing='4' mt='4' align='stretch'>
        {children}
      </Stack>
    </Box>
  )
}