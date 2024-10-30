import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const CreateInvoice = ({ selectedCustomer }) => {
  const [invoiceData, setInvoiceData] = useState({
    customerID: selectedCustomer ? selectedCustomer.customerID : '',
    total: '',
    invoiceDate: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/invoices', invoiceData); // Adjust the endpoint as needed
    // Reset form or navigate to another page after successful submission
  };

  if (!selectedCustomer) {
    return <div>Please select a customer first.</div>;
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Customer ID</FormLabel>
        <Input value={invoiceData.customerID} isReadOnly />
        
        <FormLabel>Total</FormLabel>
        <Input name="total" type="number" value={invoiceData.total} onChange={handleChange} />
        
        <FormLabel>Invoice Date</FormLabel>
        <Input name="invoiceDate" type="date" value={invoiceData.invoiceDate} onChange={handleChange} />
        
        <FormLabel>Due Date</FormLabel>
        <Input name="dueDate" type="date" value={invoiceData.dueDate} onChange={handleChange} />
        
        <Button mt={4} colorScheme="teal" type="submit">Create Invoice</Button>
      </FormControl>
    </Box>
  );
};

export default CreateInvoice;
