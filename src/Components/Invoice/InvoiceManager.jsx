// // InvoiceManager.jsx
// import React, { useState } from 'react';
// import { Box, Button, Text } from '@chakra-ui/react';
// import SearchProductInInvoice from './SearchProductsInInvoice'; // Import your SearchComponent

// const InvoiceManager = () => {
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [totalAmount, setTotalAmount] = useState(0);

//     // Function to handle the product selection from SearchComponent
//     const handleProductSelect = (product) => {
//         // Check if the product is already selected
//         const isProductSelected = selectedProducts.find((p) => p.productID === product.productID);
//         if (!isProductSelected) {
//             // Add selected product to the list
//             setSelectedProducts([...selectedProducts, product]);
//             calculateTotal([...selectedProducts, product]); // Recalculate total with new product
//         }
//     };

//     const calculateTotal = (products) => {
//         const total = products.reduce((sum, product) => sum + product.price, 0);
//         setTotalAmount(total);
//     };

//     const handleGenerateInvoice = async () => {
//         const invoiceData = {
//             totalAmount: totalAmount,
//             productDetails: selectedProducts.map((p) => p.productID), // Adjust based on your needs
//         };

//         try {
//             await axios.post('http://localhost:8080/invoices/create', invoiceData); // Update the endpoint
//             alert("Invoice generated successfully!");
//             // Reset selected products and total amount if needed
//             setSelectedProducts([]);
//             setTotalAmount(0);
//         } catch (error) {
//             console.error("Error generating invoice:", error);
//             alert("Error generating invoice. Please try again.");
//         }
//     };

//     return (
//         <Box>
//             <SearchProductInInvoice onProductSelect={handleProductSelect} /> {/* Pass product selection handler */}
//             <Text fontWeight="bold" mt={4}>Selected Products:</Text>
//             {selectedProducts.map((product) => (
//                 <Text key={product.productID}>
//                     {product.productName} - ${product.price}
//                 </Text>
//             ))}
//             <Text fontWeight="bold" mt={4}>Total Amount: ${totalAmount}</Text>
//             <Button onClick={handleGenerateInvoice} mt={4} colorScheme="teal">
//                 Generate Invoice
//             </Button>
//         </Box>
//     );
// };

// export default InvoiceManager;
import React, { useState } from 'react';
import { Box, Button, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import SearchProductInInvoice from './SearchProductsInInvoice'; // Import your SearchComponent

const InvoiceManager = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        email: '',
        phone: '',
        // Add more fields as necessary
    });

    // Function to handle the product selection from SearchComponent
    const handleProductSelect = (product) => {
        // Check if the product is already selected
        const isProductSelected = selectedProducts.find((p) => p.productID === product.productID);
        if (!isProductSelected) {
            // Add selected product to the list
            const updatedProducts = [...selectedProducts, product];
            setSelectedProducts(updatedProducts);
            calculateTotal(updatedProducts); // Recalculate total with new product
        }
    };

    const calculateTotal = (products) => {
        const total = products.reduce((sum, product) => sum + product.price, 0);
        setTotalAmount(total);
    };

    const handleGenerateInvoice = async () => {
        const invoiceData = {

            

            total: totalAmount,
            invoicesDetails: selectedProducts.map((p) => ({
                productID: p.productID,
                productName: p.productName,
                price: p.price,
                description:p.description,

                // Add any other product fields required in invoice details
            })),
            customers: {
                name: customerDetails.name,
                email: customerDetails.email,
                phone: customerDetails.phone,
            },

            // Optionally add shipping details if required
            // shippingDetails: [{ /* shipping info */ }]
        };

        try {
            await axios.post('http://localhost:8080/invoices/createInvoice', invoiceData); // Update the endpoint
            alert("Invoice generated successfully!");
            // Reset selected products and total amount if needed
            setSelectedProducts([]);
            setTotalAmount(0);
            setCustomerDetails({ name: '', email: '', phone: '' }); // Reset customer details
        } catch (error) {
            console.error("Error generating invoice:", error);
            alert("Error generating invoice. Please try again.");
        }
    };

    return (
        <Box>
            <SearchProductInInvoice onProductSelect={handleProductSelect} /> {/* Pass product selection handler */}
            <Text fontWeight="bold" mt={4}>Selected Products:</Text>
            {selectedProducts.map((product) => (
                <Text key={product.productID}>
                    {product.productName} - ${product.price}-{product.description}
                </Text>
            ))}
            <Text fontWeight="bold" mt={4}>Total Amount: ${totalAmount}</Text>

            {/* Customer Details Form */}
            <FormControl mt={4}>
                <FormLabel htmlFor='customerName'>Customer Name</FormLabel>
                <Input
                    id='customerName'
                    placeholder='Enter customer name'
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                />
                <FormLabel htmlFor='customerEmail' mt={2}>Customer Email</FormLabel>
                <Input
                    id='customerEmail'
                    placeholder='Enter customer email'
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                />
                <FormLabel htmlFor='customerPhone' mt={2}>Customer Phone</FormLabel>
                <Input
                    id='customerPhone'
                    placeholder='Enter customer phone number'
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                />
            </FormControl>

            <Button onClick={handleGenerateInvoice} mt={4} mx={5} colorScheme="teal">
                Generate Invoice
            </Button>

            <Button  mt={4} colorScheme="green">
               SUBMIT
            </Button>
        </Box>
    );
};

export default InvoiceManager;
