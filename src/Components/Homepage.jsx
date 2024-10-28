import React, { useState } from 'react';
import { Button, HStack } from '@chakra-ui/react';

// Import all components
import ProductManagement from './ProductManagement';
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

<>
<HStack spacing={4}>
        
         <Button onClick={() => handleButtonClick('ProductList')}>Product</Button>
         <Button onClick={() => handleButtonClick('BillingForm')}>Billing</Button>
         <Button onClick={() => handleButtonClick('Invoice')}> Invoice</Button>
         {/* <Button onClick={() => handleButtonClick('OrderHistory')}>Order History</Button> */}
         <Button onClick={() => handleButtonClick('Reports')}>Reports</Button>

       
        
      </HStack>
      <HStack>
      {activeComponent === 'ProductList' && <ProductManagement />}
         {activeComponent === 'BillingForm' && <BillingForm />}
         {activeComponent === 'Invoice' && <Invoice />}
         {/* {activeComponent === 'OrderHistory' && <OrderHistory />} */}
         {activeComponent === 'Reports' && <Reports />}
      </HStack>
      </>
   );
};

export default HomePage;
