import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("black", "white")}
      px={4}
      py={2}
      boxShadow="md"
    >
        <Flex alignItems="center" justifyContent="center">
        <Heading
          as="h1"
          size="lg"
          color={useColorModeValue("purple", "blue.300")}
          fontFamily="Poppins, sans-serif" // ensure "Poppins" is imported
          textAlign="center"
          boxShadow="md"
          p={2}
          borderRadius="md"
          bg={useColorModeValue("white", "gray.700")}
        >
          Billing Dashboard
        </Heading>

        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          maxW="300px"
          bg={useColorModeValue("gray.100", "gray.700")}
          borderColor={useColorModeValue("gray.300", "gray.600")}
          _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
        />

        <Flex alignItems="center">
          <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="outline"
            colorScheme={colorMode === "light" ? "blue" : "yellow"}
            mr={2}
          />
          <IconButton
            aria-label="Login"
            icon={<FaUser />}
            variant="outline"
            colorScheme="blue"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
