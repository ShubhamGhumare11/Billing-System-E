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
//                 {/* {products.map((product, index) => (
//                     <Text key={index}>
//                         {product.productName} - ${product.sellingPrice} x {product.quantity}
//                     </Text>
//                 ))} */}

//                 {products.map((product, index) => {
//                 const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100);
//                 return (
//                     <Text key={index}>
//                         {product.productName} - ${finalPrice.toFixed(2)} x {product.quantity}
//                     </Text>
//                 );
//             })}

//             </VStack>

//             <Text mt={4} fontWeight="bold">Total Amount: ${total}</Text>
//         </Box>
//     );
// };

// export default InvoiceSummary;







// InvoiceSummary.jsx
import React from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const InvoiceSummary = ({ customer, products, total }) => {
    const generatePdf = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.text("Invoice Summary", 10, 10);

        // Customer Details
        doc.setFontSize(12);
        if (customer) {
            doc.text("Customer Details:", 10, 20);
            doc.text(`Name: ${customer.firstName} ${customer.lastName}`, 10, 30);
            doc.text(`Email: ${customer.email}`, 10, 40);
            doc.text(`Phone: ${customer.phone}`, 10, 50);
            doc.text(`Address: ${customer.address}`, 10, 60);
        }

        // Product Details
        const productData = products.map((product, index) => {
            const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100).toFixed(2);
            return [
                product.productName,
                `$${finalPrice}`,
                product.quantity,
                `$${(finalPrice * product.quantity).toFixed(2)}`
            ];
        });

        doc.autoTable({
            head: [['Product', 'Price', 'Quantity', 'Subtotal']],
            body: productData,
            startY: 70,  // Table position
        });

        // Total Amount
        doc.text(`Total Amount: $${total.toFixed(2)}`, 10, doc.previousAutoTable.finalY + 10);

        // Save the PDF
        doc.save('Invoice.pdf');
    };

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
                {products.map((product, index) => {
                    const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100);
                    return (
                        <Text key={index}>
                            {product.productName} - ${finalPrice.toFixed(2)} x {product.quantity}
                        </Text>
                    );
                })}
            </VStack>

            <Text mt={4} fontWeight="bold">Total Amount: ${total.toFixed(2)}</Text>

            <Button mt={4} colorScheme="blue" onClick={generatePdf}>
                Download PDF
            </Button>
        </Box>
    );
};

export default InvoiceSummary;
