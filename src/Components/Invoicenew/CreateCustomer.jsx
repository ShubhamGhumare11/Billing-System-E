


// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   Input,
//   FormControl,
//   FormLabel,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   useToast,
// } from '@chakra-ui/react';

// const CreateCustomer = ({ isOpen, onClose,onCustomerData  }) => {
//   const [customerData, setCustomerData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//   });
//   const toast = useToast();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerData({ ...customerData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare customer data with null values for unspecified fields
//     const payload = {
//       firstName: customerData.firstName || null,
//       lastName: customerData.lastName || null,
//       email: customerData.email || null,
//       phone: customerData.phone || null,
//       address: customerData.address || null,
//       invoiceDTOS: null, // Set to null as per your requirement
//       paymentDTO: null, // Set to null as per your requirement
//     };
   
//     try {

//       console.log("Payload being sent to backend:", payload);
//      const response= await axios.post("http://localhost:8080/customers/saveInformation", payload); // Adjust the endpoint as needed
    
//      const customerData = response.data.object;
//      console.log("Customer ID (stringified):", JSON.stringify(customerData.customerID));
//      const customerid = JSON.stringify(customerData.customerID)





//      // Pass customer data including customerID to parent component
//      onCustomerData({ ...customerData, customerid });
   
//      toast({
//         title: "Customer created.",
//         description: "The customer has been successfully created.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });

     
//       // Reset form
//       setCustomerData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         address: '',
//       });
//       onClose(); // Close modal after successful submission
//     } catch (error) {
//       console.error("Error creating customer:", error);
//       toast({
//         title: "Error occurred.",
//         description: "There was an error creating the customer.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="lg">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Create Customer</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Box as="form" onSubmit={handleSubmit}>
//             <FormControl isRequired>
//               <FormLabel>First Name</FormLabel>
//               <Input 
//                 name="firstName" 
//                 value={customerData.firstName} 
//                 onChange={handleChange} 
//                 placeholder="Enter first name"
//               />
              
//               <FormLabel>Last Name</FormLabel>
//               <Input 
//                 name="lastName" 
//                 value={customerData.lastName} 
//                 onChange={handleChange} 
//                 placeholder="Enter last name"
//               />
              
//               <FormLabel>Email</FormLabel>
//               <Input 
//                 name="email" 
//                 type="email" 
//                 value={customerData.email} 
//                 onChange={handleChange} 
//                 placeholder="Enter email"
//               />
              
//               <FormLabel>Phone</FormLabel>
//               <Input 
//                 name="phone" 
//                 value={customerData.phone} 
//                 onChange={handleChange} 
//                 placeholder="Enter phone number"
//               />
              
//               <FormLabel>Address</FormLabel>
//               <Input 
//                 name="address" 
//                 value={customerData.address} 
//                 onChange={handleChange} 
//                 placeholder="Enter address"
//               />
//             </FormControl>
//           </Box>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="teal" onClick={handleSubmit}>
//             Create Customer
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default CreateCustomer;








// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   Input,
//   FormControl,
//   FormLabel,
//   Flex,
//   useToast,
// } from '@chakra-ui/react';

// const CreateCustomer = ({ onCustomerData }) => {
//   const [customerData, setCustomerData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//   });
//   const toast = useToast();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerData({ ...customerData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       firstName: customerData.firstName || null,
//       lastName: customerData.lastName || null,
//       email: customerData.email || null,
//       phone: customerData.phone || null,
//       address: customerData.address || null,
//       invoiceDTOS: null,
//       paymentDTO: null,
//     };
   
//     try {
//       console.log("Payload being sent to backend:", payload);
//       const response = await axios.post("http://localhost:8080/customers/saveInformation", payload);
//       const customerData = response.data.object;
//       const customerid = JSON.stringify(customerData.customerID);
      
//       onCustomerData({ ...customerData, customerid });

//       toast({
//         title: "Customer created.",
//         description: "The customer has been successfully created.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });

//       setCustomerData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         address: '',
//       });
//     } catch (error) {
//       console.error("Error creating customer:", error);
//       toast({
//         title: "Error occurred.",
//         description: "There was an error creating the customer.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Box as="form" onSubmit={handleSubmit} p={4}>
//       <Flex gap={4} flexWrap="wrap">
//         <FormControl isRequired>
//           <FormLabel>First Name</FormLabel>
//           <Input 
//             name="firstName" 
//             value={customerData.firstName} 
//             onChange={handleChange} 
//             placeholder="Enter first name"
//           />
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel>Last Name</FormLabel>
//           <Input 
//             name="lastName" 
//             value={customerData.lastName} 
//             onChange={handleChange} 
//             placeholder="Enter last name"
//           />
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel>Email</FormLabel>
//           <Input 
//             name="email" 
//             type="email" 
//             value={customerData.email} 
//             onChange={handleChange} 
//             placeholder="Enter email"
//           />
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel>Phone</FormLabel>
//           <Input 
//             name="phone" 
//             value={customerData.phone} 
//             onChange={handleChange} 
//             placeholder="Enter phone number"
//           />
//         </FormControl>

//         <FormControl>
//           <FormLabel>Address</FormLabel>
//           <Input 
//             name="address" 
//             value={customerData.address} 
//             onChange={handleChange} 
//             placeholder="Enter address"
//           />
//         </FormControl>
//       </Flex>
//       <Button colorScheme="teal" mt={4} type="submit">
//         Create Customer
//       </Button>
//     </Box>
//   );
// };

// export default CreateCustomer;




import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  useToast,Flex,
} from '@chakra-ui/react';

const CreateCustomer = ({ onCustomerData }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

   // Track the validity of each field
   const [isFirstNameValid, setIsFirstNameValid] = useState(false);
   const [isEmailValid, setIsEmailValid] = useState(false);
   const [isPhoneValid, setIsPhoneValid] = useState(false);
  //  const [isAddressValid, setIsAddressValid] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
     // Validation logic for each field
     if (name === 'firstName') {
      setIsFirstNameValid(value.trim() !== '');
    } else if (name === 'email') {
      setIsEmailValid(value.trim() !== '' && /\S+@\S+\.\S+/.test(value)); // Email validation regex
    } else if (name === 'phone') {
      setIsPhoneValid(value.trim() !== '' && /^\d{10}$/.test(value)); // Phone number validation (10 digits)
    } 
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      firstName: customerData.firstName || null,
      lastName: customerData.lastName || null,
      email: customerData.email || null,
      phone: customerData.phone || null,
      address: customerData.address || null,
      invoiceDTOS: null,
      paymentDTO: null,
    };

    try {
      const response = await axios.post("http://localhost:8080/customers/saveInformation", payload);
      const customerData = response.data.object;
      const customerid = JSON.stringify(customerData.customerID);
      onCustomerData({ ...customerData, customerid });

      toast({
        title: "Customer created.",
        description: "The customer has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setCustomerData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      });
    } catch (error) {
      console.error("Error creating customer:", error);
      toast({
        title: "Error occurred.",
        description: "There was an error creating the customer.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const isFormValid = isFirstNameValid && isEmailValid && isPhoneValid ;

  return (
    <Box as="form" onSubmit={handleSubmit} p="2rem" maxW="50rem" mx="auto">
      <VStack spacing="1.5rem" align="stretch">
      
      <Flex
        wrap="wrap"
        align="center"
        justify="space-between"
        direction={{ base: 'column', md: 'row' }}
        gap={4}
      >
        <HStack spacing="1rem" wrap={{ base: 'wrap', md: 'nowrap' }}>
          <FormControl  flex="1" minWidth="12rem">
            <FormLabel fontSize="1rem"> Name</FormLabel>
            <Input
              name="firstName"
              value={customerData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              fontSize="1rem"
              padding="0.5rem"
              minWidth={{ base: '100%', md: '12rem' }}width="100%"
            />
          </FormControl>

          {/* <FormControl isRequired flex="1">
            <FormLabel fontSize="1rem">Last Name</FormLabel>
            <Input
              name="lastName"
              value={customerData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              fontSize="1rem"
              padding="0.5rem"
              minWidth={{ base: '100%', md: '12rem' }}
            />
          </FormControl> */}

          <FormControl  flex="1" minWidth="12rem">
            <FormLabel fontSize="1rem">Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={customerData.email}
              onChange={handleChange}
              placeholder="Enter email"
              fontSize="1rem"
              padding="0.5rem"
              minWidth={{ base: '100%', md: '12rem' }}width="100%"
            />
          </FormControl>


          <FormControl  flex="1" minWidth="12rem">
            <FormLabel fontSize="1rem">Phone</FormLabel>
            <Input
              name="phone"
              value={customerData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              fontSize="1rem"
              padding="0.5rem"
              minWidth={{ base: '100%', md: '12rem' }} width="100%"
            />
          </FormControl>

          <Button
          colorScheme="teal"
          type="submit"
          width={{ base: '100%', md: '10rem' }}
          alignSelf={{ base: 'stretch', md: 'flex-end' }}
          fontSize="0.75rem"
          padding="0.75rem" isDisabled={!isFormValid}
        >
          Create Customer
        </Button>
        </HStack>

        {/* <HStack spacing="1rem" wrap={{ base: 'wrap', md: 'nowrap' }}>
        

          <FormControl isRequired flex="1">
            <FormLabel fontSize="1rem">Address</FormLabel>
            <Input
              name="address"
              value={customerData.address}
              onChange={handleChange}
              placeholder="Enter address"
              fontSize="1rem"
              padding="0.5rem"
              minWidth={{ base: '100%', md: '12rem' }}
            />
          </FormControl>
        </HStack> */}

        </Flex>
      </VStack>
    </Box>
  );
};

export default CreateCustomer;
