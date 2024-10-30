import React, { useState } from 'react';
import CustomerList from '../Invoice/CustomerList';
import CreateInvoice from '../Invoice/CreateInvoice';
import { Box } from '@chakra-ui/react';
import CreateCustomer from './CreateCustomer';
import InvoiceManager from './InvoiceManager';

const InvoiceManagementPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <Box>
      <h1>Invoice Management</h1>

      <CreateCustomer/>
      <CustomerList onSelect={setSelectedCustomer} />

      <InvoiceManager/>
      {/* <CreateInvoice selectedCustomer={selectedCustomer} /> */}
    </Box>
  );
};

export default InvoiceManagementPage;
