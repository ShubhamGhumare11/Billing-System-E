// import React, { useState } from 'react';
// import { Button, HStack } from '@chakra-ui/react';

// // Import all components
// import ProductManagement from './ProductManagement';
// // import BillingForm from './BillingForm';
// // import Invoice from './Invoice';
// // import OrderHistory from './OrderHistory';
// // import Reports from './Reports';

// const HomePage = () => {
//    const [activeComponent, setActiveComponent] = useState(null);

//    // Function to handle button clicks and set active component
//    const handleButtonClick = (component) => {
//       setActiveComponent(component);
//    };

//    return (

// <>



// <HStack spacing={4}>
        
//          <Button onClick={() => handleButtonClick('ProductList')}>Product</Button>
//          <Button onClick={() => handleButtonClick('BillingForm')}>Billing</Button>
//          <Button onClick={() => handleButtonClick('Invoice')}> Invoice</Button>
//          {/* <Button onClick={() => handleButtonClick('OrderHistory')}>Order History</Button> */}
//          <Button onClick={() => handleButtonClick('Reports')}>Reports</Button>

       
        
//       </HStack>
//       <HStack>
//       {activeComponent === 'ProductList' && <ProductManagement />}
//          {activeComponent === 'BillingForm' && <BillingForm />}
//          {activeComponent === 'Invoice' && <Invoice />}
//          {/* {activeComponent === 'OrderHistory' && <OrderHistory />} */}
//          {activeComponent === 'Reports' && <Reports />}
//       </HStack>
//       </>
//    );
// };

// export default HomePage;



























// import React, { useState } from 'react';
// import { Box, Button, VStack, Flex } from '@chakra-ui/react';

// // Import all components
// import ProductManagement from './ProductManagement';
// // import BillingForm from './BillingForm';
// // import Invoice from './Invoice';
// // import OrderHistory from './OrderHistory';
// // import Reports from './Reports';

// const HomePage = () => {
//    const [activeComponent, setActiveComponent] = useState(null);

//    // Function to handle button clicks and set active component
//    const handleButtonClick = (component) => {
//       setActiveComponent(component);
//    };

//    return (
//       <Flex h="100vh" overflow="hidden">
//          {/* Sidebar */}
//          <Box
//             w="200px"
//             bg="teal.600"
//             color="white"
//             p={4}
//             position="fixed"
//             h="100vh"
//          >
//             <VStack align="stretch" spacing={4}>
//                <Button variant="ghost" onClick={() => handleButtonClick('ProductList')}>
//                   Product
//                </Button>
//                <Button variant="ghost" onClick={() => handleButtonClick('BillingForm')}>
//                   Billing
//                </Button>
//                <Button variant="ghost" onClick={() => handleButtonClick('Invoice')}>
//                   Invoice
//                </Button>
//                {/* <Button variant="ghost" onClick={() => handleButtonClick('OrderHistory')}>
//                   Order History
//                </Button> */}
//                <Button variant="ghost" onClick={() => handleButtonClick('Reports')}>
//                   Reports
//                </Button>
//             </VStack>
//          </Box>

//          {/* Main Content Area */}
//          <Box
//             ml="200px" // Adjusts to the width of the sidebar
//             p={4}
//             w="full"
//             h="100vh"
//             overflowY="auto"
//             bg="gray.100"
//          >
//             {/* Render active component based on button click */}
//             {activeComponent === 'ProductList' && <ProductManagement />}
//             {activeComponent === 'BillingForm' && <BillingForm />}
//             {activeComponent === 'Invoice' && <Invoice />}
//             {/* {activeComponent === 'OrderHistory' && <OrderHistory />} */}
//             {activeComponent === 'Reports' && <Reports />}
//          </Box>
//       </Flex>
//    );
// };

// export default HomePage;




























import React, { useState } from 'react';
import { Button, VStack, Box, Flex, Heading } from '@chakra-ui/react';

// Import all components
import ProductManagement from '../Components/ProductManagement';
// import BillingForm from './BillingForm';
// import Invoice from './Invoice';
// import OrderHistory from './OrderHistory';
// import Reports from './Reports';

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  // Function to handle button clicks and set active component
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <Flex h="100vh" w="100vw" overflow="hidden">
      {/* Sticky Sidebar */}
      <Box
        w="15%"
        bg="teal.600"
        color="white"
        p={4}
        position="fixed"
        top="0"
        left="0"
        h="100vh"
        overflowY="auto"
      >
        <Heading size="md" mb={6} textAlign="center">Menu</Heading>
        <VStack align="start" spacing={4}>
          <Button variant="ghost" onClick={() => handleButtonClick('ProductList')}>Product</Button>
          <Button variant="ghost" onClick={() => handleButtonClick('BillingForm')}>Billing</Button>
          <Button variant="ghost" onClick={() => handleButtonClick('Invoice')}>Invoice</Button>
          {/* <Button variant="ghost" onClick={() => handleButtonClick('OrderHistory')}>Order History</Button> */}
          <Button variant="ghost" onClick={() => handleButtonClick('Reports')}>Reports</Button>
          {/* Additional Sidebar Links */}
          <Button variant="ghost" onClick={() => handleButtonClick('Dashboard')}>Dashboard</Button>
          <Button variant="ghost" onClick={() => handleButtonClick('Settings')}>Settings</Button>
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box
      flex="1"
        p={6}
        bg="gray.100"
        overflow="auto"
           w="75%"
        h="100%"
     
      >
        {activeComponent === 'ProductList' && <ProductManagement />}
        {activeComponent === 'BillingForm' && <BillingForm />}
        {activeComponent === 'Invoice' && <Invoice />}
        {/* {activeComponent === 'OrderHistory' && <OrderHistory />} */}
        {activeComponent === 'Reports' && <Reports />}
        {activeComponent === 'Dashboard' && <Box>Dashboard Content</Box>}
        {activeComponent === 'Settings' && <Box>Settings Content</Box>}
      </Box>
    </Flex>
  );
};

export default HomePage;
