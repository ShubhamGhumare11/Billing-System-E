// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import ProductManagement from './Components/ProductManagement';
import InvoiceManagementPage from './Components/Invoice/InvoiceManagementPage';
import InvoiceManager from './Components/Invoicenew/InvoiceManager';

import { Box } from '@chakra-ui/react';


function App() {
  return (
    <Router>
    <Box display="flex" height="100vh">
      <Sidebar /> {/* This renders the sidebar */}
      <Box flex="1" p={4}   ml={{ base: '0', md: '0' }}  >
        <Routes>
          <Route path="/ProductManagement" element={<ProductManagement />} /> {/* Home route */}
          <Route path="/invoicemanagement" element={<InvoiceManagementPage />} />
          <Route path="/invoicemanager" element={<InvoiceManager/>} />  
           
        </Routes>
      </Box>
    </Box>
  </Router>
  );
}

export default App;
