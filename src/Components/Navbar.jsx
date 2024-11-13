// import React, { useState } from "react";
// import {
//   Box,
//   Flex,
//   Heading,
//   Input,
//   IconButton,
//   useColorMode,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { FaMoon, FaSun, FaUser } from "react-icons/fa";

// const Navbar = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <Box
//       bg={useColorModeValue("white", "gray.800")}
//       color={useColorModeValue("black", "white")}
//       px={4}
//       py={2}
//       boxShadow="md"
//     >
//         <Flex alignItems="center" justifyContent="center">
//         <Heading
//           as="h1"
//           size="lg"
//           color={useColorModeValue("purple", "blue.300")}
//           fontFamily="Poppins, sans-serif" // ensure "Poppins" is imported
//           textAlign="center"
//           boxShadow="md"
//           p={2}
//           borderRadius="md"
//           bg={useColorModeValue("white", "gray.700")}
//         >
//           Billing Dashboard
//         </Heading>

//         <Input
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           maxW="300px"
//           bg={useColorModeValue("gray.100", "gray.700")}
//           borderColor={useColorModeValue("gray.300", "gray.600")}
//           _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
//         />

//         <Flex alignItems="center">
//           <IconButton
//             aria-label="Toggle Theme"
//             icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
//             onClick={toggleColorMode}
//             variant="outline"
//             colorScheme={colorMode === "light" ? "blue" : "yellow"}
//             mr={2}
//           />
//           <IconButton
//             aria-label="Login"
//             icon={<FaUser />}
//             variant="outline"
//             colorScheme="blue"
//           />
//         </Flex>
//       </Flex>
//     </Box>
//   );
// };

// export default Navbar;




// import React from 'react';
// import { Box, Flex, Spacer, HStack, Button, IconButton, Avatar, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
// import { HamburgerIcon } from '@chakra-ui/icons';
// import { Link } from 'react-router-dom'; // For navigation (you can modify this as needed)

// const Navbar = () => {
//   const { isOpen, onToggle } = useDisclosure();
//   const display = useBreakpointValue({ base: 'none', md: 'flex' });

//   return (
//     <Box as="nav" w="100%" p={4} boxShadow="md" bg="teal.500">
//       <Flex align="center" justify="space-between">
//         {/* Logo or Title */}
//         <Box>
//           <Link to="/home"> {/* Logo or Title Link */}
//             <Button colorScheme="white" variant="link" fontSize="xl" fontWeight="bold">
             
//             </Button>
//           </Link>
//         </Box>

//         {/* Nav Links (Visible on medium screens and larger) */}
//         <HStack spacing={4} display={display}>

        
//           {/* <Link to="/home">
//             <Button variant="link" color="white" fontWeight="bold">
//               Home
//             </Button>
//           </Link>
//           <Link to="/about">
//             <Button variant="link" color="white" fontWeight="bold">
//               About
//             </Button>
//           </Link>
//           <Link to="/services">
//             <Button variant="link" color="white" fontWeight="bold">
//               Services
//             </Button>
//           </Link>
//           <Link to="/contact">
//             <Button variant="link" color="white" fontWeight="bold">
//               Contact
//             </Button>
//           </Link> */}
//         </HStack>

//         {/* Avatar and Hamburger Menu for Mobile */}
//         <Flex align="center">
//           <Avatar name="User Name" src="https://bit.ly/broken-link" size="sm" />
//           <IconButton
//             aria-label="Open menu"
//             icon={<HamburgerIcon />}
//             display={{ base: 'block', md: 'none' }}
//             onClick={onToggle}
//             ml={4}
//             variant="outline"
//             color="white"
//           />
//         </Flex>
//       </Flex>

//       {/* Hamburger Menu for Mobile */}
//       {isOpen && (
//         <Box display={{ base: 'block', md: 'none' }} p={4}>

//         <Text>GA_BillingSYSTEM</Text>
//           {/* <Link to="/home">
//             <Button variant="link" color="teal.600" width="full">
//               Home
//             </Button>
//           </Link>
//           <Link to="/about">
//             <Button variant="link" color="teal.600" width="full">
//               About
//             </Button>
//           </Link>
//           <Link to="/services">
//             <Button variant="link" color="teal.600" width="full">
//               Services
//             </Button>
//           </Link>
//           <Link to="/contact">
//             <Button variant="link" color="teal.600" width="full">
//               Contact
//             </Button>
//           </Link> */}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Navbar;





// import React from 'react';
// import { Box, Flex, HStack, Button, IconButton, Avatar, useDisclosure, useBreakpointValue, Text } from '@chakra-ui/react';
// import { HamburgerIcon } from '@chakra-ui/icons';
// import { MdHome, MdInfo, MdPhone } from 'react-icons/md'; // Use MdHome from react-icons/md
// import { Link } from 'react-router-dom'; // For navigation

// const Navbar = () => {
//   const { isOpen, onToggle } = useDisclosure();
//   const display = useBreakpointValue({ base: 'none', md: 'flex' });

//   return (
//     <Box as="nav" w="100%" p={4} boxShadow="md" bg="teal.500">
//       <Flex align="center" justify="space-between">
//         {/* Logo or Title */}
//         <Box>
//           <Link to="/home"> {/* Logo or Title Link */}
//             <Button colorScheme="white" variant="link" fontSize="xl" fontWeight="bold">
//               GA_BillingSYSTEM
//             </Button>
//           </Link>
//         </Box>

//         {/* Nav Links (Visible on medium screens and larger) */}
//         <HStack spacing={4} display={display}>
//           <Link to="/home">
//             <Button variant="link" color="white" fontWeight="bold" leftIcon={<MdHome />}>
//               Home
//             </Button>
//           </Link>
//           <Link to="/about">
//             <Button variant="link" color="white" fontWeight="bold" leftIcon={<MdInfo />}>
//               About
//             </Button>
//           </Link>
//           <Link to="/services">
//             <Button variant="link" color="white" fontWeight="bold" leftIcon={<MdInfo />}>
//               Services
//             </Button>
//           </Link>
//           <Link to="/contact">
//             <Button variant="link" color="white" fontWeight="bold" leftIcon={<MdPhone />}>
//               Contact
//             </Button>
//           </Link>
//         </HStack>

//         {/* Avatar and Hamburger Menu for Mobile */}
//         <Flex align="center">
//           <Avatar name="User Name" src="https://bit.ly/broken-link" size="sm" />
//           <IconButton
//             aria-label="Open menu"
//             icon={<HamburgerIcon />}
//             display={{ base: 'block', md: 'none' }}
//             onClick={onToggle}
//             ml={4}
//             variant="outline"
//             color="white"
//           />
//         </Flex>
//       </Flex>

//       {/* Hamburger Menu for Mobile */}
//       {isOpen && (
//         <Box display={{ base: 'block', md: 'none' }} p={4}>
//           <Text>GA_BillingSYSTEM</Text>
//           <Link to="/home">
//             <Button variant="link" color="teal.600" width="full" leftIcon={<MdHome />}>
//               Home
//             </Button>
//           </Link>
//           <Link to="/about">
//             <Button variant="link" color="teal.600" width="full" leftIcon={<MdInfo />}>
//               About
//             </Button>
//           </Link>
//           <Link to="/services">
//             <Button variant="link" color="teal.600" width="full" leftIcon={<MdInfo />}>
//               Services
//             </Button>
//           </Link>
//           <Link to="/contact">
//             <Button variant="link" color="teal.600" width="full" leftIcon={<MdPhone />}>
//               Contact
//             </Button>
//           </Link>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Navbar;



import React from 'react';
import { Box, Button, HStack, IconButton, Text, VStack, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Icon } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom'; // For navigation
import { FaBox, FaClipboardList, FaFileInvoice, FaChartBar } from 'react-icons/fa'; // React Icons for buttons

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="nav" p={4} bg="teal.500" color="white">
      <HStack justify="space-between" align="center">
        {/* Logo or Title */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
          JUST_BILLING
          </Text>
        </Box>

        {/* Navbar Links (Visible on medium screens and larger) */}
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Link to="/ProductManagement">
            <Button variant="link" color="white" fontWeight="bold" leftIcon={<FaBox />}>
              Product Management
            </Button>
          </Link>
          <Link to="/stockmanagement">
            <Button variant="link" color="white" fontWeight="bold" leftIcon={<FaClipboardList />}>
              Stock Management
            </Button>
          </Link>
          <Link to="/invoicemanager">
            <Button variant="link" color="white" fontWeight="bold" leftIcon={<FaFileInvoice />}>
              Invoice
            </Button>
          </Link>
          <Link to="/SalesDashboard">
            <Button variant="link" color="white" fontWeight="bold" leftIcon={<FaChartBar />}>
              Sales Report
            </Button>
          </Link>
        </HStack>

        {/* Hamburger Button for Mobile */}
        <IconButton
          aria-label="Open Sidebar"
          icon={<HamburgerIcon />}
          display={{ base: 'block', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          color="white"
        />
      </HStack>

      {/* Sidebar Drawer for Mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="teal.500" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="start">
              <Link to="/ProductManagement">
                <Button variant="link" color="white" fontWeight="bold" leftIcon={<FaBox />} onClick={onClose}>
                  Product Management
                </Button>
              </Link>
              <Link to="/stockmanagement">
                <Button variant="link" color="white" fontWeight="bold" leftIcon={<FaClipboardList />} onClick={onClose}>
                  Stock Management
                </Button>
              </Link>
              <Link to="/invoicemanager">
                <Button variant="link" color="white" fontWeight="bold" leftIcon={<FaFileInvoice />} onClick={onClose}>
                  Invoice
                </Button>
              </Link>
              <Link to="/SalesDashboard">
                <Button variant="link" color="white" fontWeight="bold" leftIcon={<FaChartBar />} onClick={onClose}>
                  Sales Report
                </Button>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
