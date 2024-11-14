

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
  useToast, Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';

const CreateCustomer = ({ onCustomerData }) => {
  const [customerData, setCustomerData] = useState({
    fullName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Track if submission is in progress

  // Track the validity of each field
  const [isFullNameValid, setIsFullNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });

    // Validation logic for each field
    if (name === 'fullName') {
      setIsFullNameValid(value.trim() !== '');
    } else if (name === 'email') {
      setIsEmailValid(value.trim() !== '' && /\S+@\S+\.\S+/.test(value)); // Email validation regex
    } else if (name === 'phone') {
      setIsPhoneValid(value.trim() !== '' && /^\d{10}$/.test(value)); // Phone number validation (10 digits)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent additional submissions if one is already in progress
    if (isSubmitting) return;

    setIsSubmitting(true); // Set submission state to true to avoid duplicates

    const payload = {
      fullName: customerData.fullName || null,
      email: customerData.email || null,
      phone: customerData.phone || null,
      address: customerData.address || null,
      invoiceDTOS: null,
      paymentDTO: null,
    };

    try {
      // const response = await axios.post("http://localhost:8080/customers/saveInformation", payload);
      // const newCustomerData = response.data.object;

      onCustomerData(customerData); // Pass only the new customer data, not wrapped in another object

      toast({
        title: "Customer created.",
        description: "The customer has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form data
      setCustomerData({
        fullName: '',
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
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  const isFormValid = isFullNameValid && isEmailValid && isPhoneValid;

  return (
    <Box as="form" onSubmit={handleSubmit} p="1rem" maxW="40rem" mx="auto">
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <FormControl isRequired>
            <FormLabel fontSize="0.9rem">Name</FormLabel>
            <Input
              name="fullName"
              value={customerData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              fontSize="0.9rem"
              p="0.5rem"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <FormControl isRequired>
            <FormLabel fontSize="0.9rem">Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={customerData.email}
              onChange={handleChange}
              placeholder="Email"
              fontSize="0.9rem"
              p="0.5rem"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <FormControl isRequired>
            <FormLabel fontSize="0.9rem">Phone</FormLabel>
            <Input
              name="phone"
              value={customerData.phone}
              onChange={handleChange}
              placeholder="Phone"
              fontSize="0.9rem"
              p="0.5rem"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <FormControl>
            <FormLabel fontSize="0.9rem">Address</FormLabel>
            <Input
              name="address"
              value={customerData.address}
              onChange={handleChange}
              placeholder="Address"
              fontSize="0.9rem"
              p="0.5rem"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2} textAlign="center">
          <Button
            colorScheme="teal"
            type="submit"
            isDisabled={!isFormValid || isSubmitting}
            fontSize="0.9rem"
            px="1.5rem"
          >
            Create Customer
          </Button>
        </GridItem>
      </Grid>
    </Box>

  );
};

export default CreateCustomer;
