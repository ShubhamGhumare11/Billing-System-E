// Sidebar.jsx
import React from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FiMenu, FiX, FiHome, FiInfo, FiPhone, FiPackage } from 'react-icons/fi'; // FiPackage for Inventory icon
import { Link } from 'react-router-dom';
import { TbFileReport } from 'react-icons/tb';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      {/* Sidebar */}
      <Box
        w={{ base: isOpen ? '100%' : '0', md: '250px' }} // Responsive width
        transition="width 0.3s ease"
        overflow="hidden"
        bg="gray.800"
        color="white"
        h="100vh"
        ml={{ base: '0', md: '0' }} 
        position={{ base: 'fixed', md: 'relative' }} // Fixed for mobile, relative for desktop
        zIndex={2}
      >
        {/* Close button for mobile view */}
        <IconButton
          aria-label="Close Sidebar"
          icon={<FiX />}
          onClick={onClose}
          display={{ base: 'block', md: 'none' }} // Only show on mobile
          variant="outline"
          colorScheme="whiteAlpha"
          position="absolute"
          top={4}
          right={4}
        />

        {/* Sidebar Content */}
        <Box p={4}>
          <Text fontSize="lg" mb={4} fontWeight="bold">
            Navigation
          </Text>
          <VStack align="start" spacing={4}>
            <Link to="/ProductManagement" onClick={onClose}>
              <Button variant="link" colorScheme="whiteAlpha" leftIcon={<FiHome />} w="full">
                Product Management
              </Button>
            </Link>
            {/* <Link to="/invoicemanagement" onClick={onClose}>
              <Button variant="link" colorScheme="whiteAlpha" leftIcon={<FiInfo />} w="full">
                Invoice Management
              </Button>
            </Link> */}
            <Link to="/invoicemanager" onClick={onClose}>
              <Button variant="link" colorScheme="whiteAlpha" leftIcon={<FiPhone />} w="full">
               Invoice Management
              </Button>
            </Link>
            <Link to="/stockmanagement" onClick={onClose}>
              <Button variant="link" colorScheme="whiteAlpha" leftIcon={<FiPhone />} w="full">
               Stock Management
              </Button>
            </Link>
            <Link to="/SalesDashboard" onClick={onClose}>
              <Button variant="link" colorScheme="whiteAlpha" leftIcon={<TbFileReport />} w="full">
                Sales Reports
              </Button>
            </Link>
            <Link to="/Inventory" onClick={onClose}>
              <Button variant="link" colorScheme="whiteAlpha" leftIcon={<FiPackage />} w="full">
                Inventory
              </Button>
            </Link>
          </VStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        flex="1"
        ml={{ base: '0', md: isOpen ? '0' : '250px' }} // Adjust margin for mobile
        transition="margin-left 0.3s ease"
        p={4}
      >
        <IconButton
          aria-label="Open Sidebar"
          icon={<FiMenu />}
          onClick={onOpen}
          display={{ base: 'block', md: 'none' }} // Only show on mobile
          variant="outline"
          colorScheme="blue"
          mb={4}
        />
        {/* This is where the navigated components will be rendered */}
        {/* <Text fontSize="xl" mb={4}>
          Main Content Area
        </Text> */}
      </Box>
    </Flex>
  );
};

export default Sidebar;
