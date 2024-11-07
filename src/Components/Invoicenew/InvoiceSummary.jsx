// // InvoiceSummary.jsx
// import React from 'react';
// import { Box, Text, VStack } from '@chakra-ui/react';

// const InvoiceSummary = ({ customer, products, total }) => {
//     return (
//         <Box p={4} border="1px solid gray" borderRadius="md">
//             <Text fontSize="lg" fontWeight="bold">Invoice Summary</Text>

//             {customer && (
//                 <Box mt={4}>
//                     <Text fontWeight="bold">Customer Details:</Text>
//                     <Text>Name: {customer.firstName} {customer.lastName}</Text>
//                     <Text>Email: {customer.email}</Text>
//                     <Text>Phone: {customer.phone}</Text>
//                     <Text>Address: {customer.address}</Text>
//                 </Box>  
//             )}

//             <VStack mt={4} spacing={2} align="start">
//                 <Text fontWeight="bold">Selected Products:</Text>
//                 {products.map((product, index) => (
//                     <Text key={index}>
//                         {product.productName} - ${product.price} x {product.quantity}
//                     </Text>
//                 ))}
//             </VStack>

//             <Text mt={4} fontWeight="bold">Total Amount: ${total}</Text>
//         </Box>
//     );
// };

// export default InvoiceSummary;






// InvoiceSummary.jsx
import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const InvoiceSummary = ({ customer, products, total }) => {
    return (
        <Box p={4} border="1px solid gray" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">Invoice Summary</Text>

            {customer && (
                <Box mt={4}>
                    <Text fontWeight="bold">Customer Details:</Text>
                    <Text>Name: {customer.firstName} {customer.lastName}</Text>
                    <Text>Email: {customer.email}</Text>
                    <Text>Phone: {customer.phone}</Text>
                    <Text>Address: {customer.address}</Text>
                </Box>  
            )}

            <VStack mt={4} spacing={2} align="start">
                <Text fontWeight="bold">Selected Products:</Text>
                {/* {products.map((product, index) => (
                    <Text key={index}>
                        {product.productName} - ${product.sellingPrice} x {product.quantity}
                    </Text>
                ))} */}

                {products.map((product, index) => {
                const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100);
                return (
                    <Text key={index}>
                        {product.productName} - ${finalPrice.toFixed(2)} x {product.quantity}
                    </Text>
                );
            })}

            </VStack>

            <Text mt={4} fontWeight="bold">Total Amount: ${total}</Text>
        </Box>
    );
};

export default InvoiceSummary;
