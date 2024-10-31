// import React, { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

// const CreateCustomer = () => {
//   const [customerData, setCustomerData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerData({ ...customerData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post('/api/customers', customerData); // Adjust the endpoint as needed
//     // Reset form or navigate to another page after successful submission
//   };

//   return (
//     <Box as="form" onSubmit={handleSubmit}>
//       <FormControl>
//         <FormLabel>First Name</FormLabel>
//         <Input name="firstName" value={customerData.firstName} onChange={handleChange} />
        
//         <FormLabel>Last Name</FormLabel>
//         <Input name="lastName" value={customerData.lastName} onChange={handleChange} />
        
//         <FormLabel>Email</FormLabel>
//         <Input name="email" type="email" value={customerData.email} onChange={handleChange} />
        
//         <FormLabel>Phone</FormLabel>
//         <Input name="phone" value={customerData.phone} onChange={handleChange} />
        
//         <FormLabel>Address</FormLabel>
//         <Input name="address" value={customerData.address} onChange={handleChange} />
        
//         <Button mt={4} colorScheme="teal" type="submit">Create Customer</Button>
//       </FormControl>
//     </Box>
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
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
// } from '@chakra-ui/react';

// const CreateCustomer = ({ isOpen, onClose }) => {
//   const [customerData, setCustomerData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerData({ ...customerData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Ustomer to be created...."+customerData)
//     await axios.post( "http://localhost:8080/customers/saveInformation", customerData); // Adjust the endpoint as needed
//     // Reset form
//     setCustomerData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       address: '',
//     });
//     onClose(); // Close modal after successful submission
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Create Customer</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Box as="form" onSubmit={handleSubmit}>
//             <FormControl>
//               <FormLabel>First Name</FormLabel>
//               <Input name="firstName" value={customerData.firstName} onChange={handleChange} />
              
//               <FormLabel>Last Name</FormLabel>
//               <Input name="lastName" value={customerData.lastName} onChange={handleChange} />
              
//               <FormLabel>Email</FormLabel>
//               <Input name="email" type="email" value={customerData.email} onChange={handleChange} />
              
//               <FormLabel>Phone</FormLabel>
//               <Input name="phone" value={customerData.phone} onChange={handleChange} />
              
//               <FormLabel>Address</FormLabel>
//               <Input name="address" value={customerData.address} onChange={handleChange} />
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





import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';

const CreateCustomer = ({ isOpen, onClose,onCustomerData  }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare customer data with null values for unspecified fields
    const payload = {
      firstName: customerData.firstName || null,
      lastName: customerData.lastName || null,
      email: customerData.email || null,
      phone: customerData.phone || null,
      address: customerData.address || null,
      invoiceDTOS: null, // Set to null as per your requirement
      paymentDTO: null, // Set to null as per your requirement
    };
    onCustomerData(customerData); 
    try {

      console.log("Payload being sent to backend:", payload);
      await axios.post("http://localhost:8080/customers/saveInformation", payload); // Adjust the endpoint as needed
      toast({
        title: "Customer created.",
        description: "The customer has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

     
      // Reset form
      setCustomerData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      });
      onClose(); // Close modal after successful submission
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Customer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input 
                name="firstName" 
                value={customerData.firstName} 
                onChange={handleChange} 
                placeholder="Enter first name"
              />
              
              <FormLabel>Last Name</FormLabel>
              <Input 
                name="lastName" 
                value={customerData.lastName} 
                onChange={handleChange} 
                placeholder="Enter last name"
              />
              
              <FormLabel>Email</FormLabel>
              <Input 
                name="email" 
                type="email" 
                value={customerData.email} 
                onChange={handleChange} 
                placeholder="Enter email"
              />
              
              <FormLabel>Phone</FormLabel>
              <Input 
                name="phone" 
                value={customerData.phone} 
                onChange={handleChange} 
                placeholder="Enter phone number"
              />
              
              <FormLabel>Address</FormLabel>
              <Input 
                name="address" 
                value={customerData.address} 
                onChange={handleChange} 
                placeholder="Enter address"
              />
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Create Customer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCustomer;
