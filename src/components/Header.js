import { Box, Text } from '@chakra-ui/layout';

export const Header = () => {
  return (
    <Box bg="teal" w="100%" h="4rem" shadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);">
      <Box h="100%" maxWidth="80%" mx="auto" d="flex" alignItems="center">
        <Text color="white" fontSize="2xl">
          Clootrack Chart Dashboard
        </Text>
      </Box>
    </Box>
  );
};
