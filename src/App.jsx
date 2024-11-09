import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';

import ProductManagement from './Components/ProductManagement';
import InvoiceManager from './Components/Invoicenew/InvoiceManager';
import SalesDashboard from './Components/SalesDashboard';
import Inventory from './Components/Inventory'; // Import the Inventory component
import { Box } from '@chakra-ui/react';
import StockManagement from './Components/StockManagement';

function App() {
  return (
    <Router>
      <Box display="flex" height="100vh">
        <Sidebar /> {/* This renders the sidebar */}
        <Box flex="1" p={4} ml={{ base: '0', md: '0' }}>
        <Navbar/>
          <Routes>
            <Route path="/ProductManagement" element={<ProductManagement />} /> {/* Product Management route */}
            <Route path="/invoicemanager" element={<InvoiceManager />} />  {/* Invoice Manager route */}
            <Route path="/stockmanagement" element={<StockManagement />} />  {/* Invoice Manager route */}
            <Route path="/SalesDashboard" element={<SalesDashboard />} /> 
            <Route path="/Inventory" element={<Inventory />} /> Inventory route
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
