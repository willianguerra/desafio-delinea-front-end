import { Flex, Text, Box, Avatar } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData: boolean | undefined;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align='center'>
      <Avatar size='md' name='Usuario' src='' />
      {showProfileData && (
        <Box
          ml='2'
          textAlign='right'
        >
          <Text>Usuario</Text>
          <Text color='gray.300' fontSize='small'>
            user.email
          </Text>
        </Box>
      )}
    </Flex>
  )
}