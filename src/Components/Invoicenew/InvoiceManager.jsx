// // InvoiceManager.jsx
// import React, { useState } from 'react';
// import CustomerForm from './CreateCustomer';
// import ProductSelection from './ProductSelection';
// import InvoiceSummary from './InvoiceSummary';
// import { Button, Box, Text } from '@chakra-ui/react';
// import axios from 'axios';
// import CreateCustomer from './CreateCustomer';

// const InvoiceManager = () => {
//     const [customerData, setCustomerData] = useState(null);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     // const [totalAmount, setTotalAmount] = useState(0);

//     const handleCustomerData = (data) => setCustomerData(data);

//     // const handleProductSelect = (product, quantity) => {
//     //     const updatedProducts = [...selectedProducts, { ...product, quantity }];
//     //     setSelectedProducts(updatedProducts);
//     //     calculateTotal(updatedProducts);
//     // };

//     // const calculateTotal = (products) => {
//     //     const total = products.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
//     //     setTotalAmount(total);
//     // };


//     const handleProductSelect = (product) => {
//         setSelectedProducts((prev) => {
//             // Check if the product is already selected
//             const existingProduct = prev.find(p => p.productID === product.productID);
//             if (existingProduct) {
//                 // Update the quantity if the product is already selected
//                 return prev.map(p => 
//                     p.productID === product.productID 
//                         ? { ...p, quantity: p.quantity + product.quantity } 
//                         : p
//                 );
//             } else {
//                 return [...prev, product]; // Add new product
//             }
//         });
//     };


//     console.log(selectedProducts);
//     // Calculate total amount
//     const totalAmount = selectedProducts.reduce((acc, product) => {
//         return acc + (product.price * product.quantity); // Sum price * quantity for each product
//     }, 0);

//     const handleGenerateInvoice = async () => {
//         const invoiceData = {
//             customer: customerData,
//             products: selectedProducts,
//             total: totalAmount,
//         };

//         try {
//             const response = await axios.post('http://localhost:8080/invoices/create', invoiceData);
//             alert("Invoice generated successfully!");
//             resetInvoice();
//         } catch (error) {
//             console.error("Error generating invoice:", error);
//             alert("Error generating invoice. Please try again.");
//         }
//     };

//     const resetInvoice = () => {
//         setCustomerData(null);
//         setSelectedProducts([]);
//         // setTotalAmount(0);
//     };

//     return (
//         <Box>
//             <CreateCustomer onCustomerData={handleCustomerData} />
//             <ProductSelection onProductSelect={handleProductSelect} />
//             <InvoiceSummary customer={customerData} products={selectedProducts} total={totalAmount} />
//             <Text fontWeight="bold">Total Amount: ${totalAmount}</Text>
//             <Button onClick={handleGenerateInvoice} mt={4} colorScheme="teal">Generate Invoice</Button>
//         </Box>
//     );
// };

// export default InvoiceManager;







// InvoiceManager.jsx
import React, { useState } from 'react';
import CreateCustomer from './CreateCustomer';
import ProductSelection from './ProductSelection';
import InvoiceSummary from './InvoiceSummary';
import CustomerList from './CustomerList';

import { Button, Box, Text,Heading, Center,Flex } from '@chakra-ui/react';
import axios from 'axios';

const InvoiceManager = () => {
    const [customerData, setCustomerData] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal open/close state

    const handleCustomerData = (data) => {
        console.log("Customer Data Received in Invoice Manager:", data); // Log to confirm the data
        setCustomerData(data);
    };



    const handleCustomerSelect = (customer) => {
        setCustomerData(customer); // This will set the selected customer data
    };

    const handleProductSelect = (products) => {
        setSelectedProducts(products);
    };

    // const totalAmount = selectedProducts.reduce((acc, product) => acc + product.sellingPrice * product.quantity, 0);
    const calculateTotalAmount = () => {
        return selectedProducts.reduce((acc, product) => {
            const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100);
            return acc + finalPrice * product.quantity;
        }, 0);
    };
    const totalAmount = calculateTotalAmount();


    const handleGenerateInvoice = async () => {
         // Constructing the CustomersDTO
         const customersDTO = {
            // customerID: customerData?.customerID || '', // Handle optional customerID
            firstName: customerData?.firstName || '', // Default to empty string if not provided
            lastName: customerData?.lastName || '', // Default to empty string if not provided
            email: customerData?.email || '', // Default to empty string if not provided
            phone: customerData?.phone || '', // Default to empty string if not provided
            address: customerData?.address || '', // Default to empty string if not provided
            // invoiceDTOS: customerData?.invoiceDTOS || [], // Default to empty array if not provided
            // paymentDTO: customerData?.paymentDTO || null // Set to null if not provided
        };





      


        const invoiceData = {
            invoice1Date: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD'
            invoice1DueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Due date set to 30 days later
            grandTotal:totalAmount,
            // ...productDetails,
            // submit: true, // Set to true as per your example
            
            // Constructing the customer object to match backend format
            customer: {
                firstName: customerData?.firstName || '',
                lastName: customerData?.lastName || '',
                email: customerData?.email || '',
                phone: customerData?.phone || '',
                address: customerData?.address || '',
            }
        };


    // Constructing the URL with multiple instances of productNames and sellQuantity parameters
    const productParams = selectedProducts.map(
        (product, index) => `productNames=${encodeURIComponent(product.productName)}&sellQuantity=${product.quantity || 1}`
    ).join('&');

        console.log("Invoice data is post to backend api..."+JSON.stringify(invoiceData))
        try {
            // const response = await axios.post(  `http://localhost:8080/invoice/saveInformation?id=${customerData.customerID}`, invoiceData);
            const response = await axios.post(`http://localhost:8080/Invoice1/saveInvoice?${productParams}`, invoiceData);

            alert("Invoice generated successfully!");
            resetInvoice();
        } catch (error) {
            console.error("Error generating invoice:", error);
            alert("Error generating invoice. Please try again.");
        }
    };

    
    const resetInvoice = () => {
        setCustomerData(null);
        setSelectedProducts([]);
    };

    return (
        <Box>
    <Heading
    as="h2"
    size="xl" // Make it larger than "lg"
    textAlign="center"
    fontWeight="extrabold"
    color="teal.600" // Use a color that stands out
    background="gray.100" // Light background to highlight
    p={2} // Padding for the background effect
    borderRadius="md" // Round the corners slightly
    textTransform="uppercase" // Make text uppercase for formality
    letterSpacing="widest" // Add letter spacing
    boxShadow="md" // Subtle shadow for a pop effect
>
    Billing
</Heading>

                <CreateCustomer  onCustomerData={handleCustomerData} 
            />   
            {/* <CustomerList onSelect={handleCustomerSelect} /> */}

            <ProductSelection onProductSelect={handleProductSelect} />
            <InvoiceSummary customer={customerData} products={selectedProducts} total={totalAmount} />
            {/* <Text fontWeight="bold">Total Amount: ${totalAmount}</Text> */}
            {/* <Button onClick={handleGenerateInvoice} mt={4} colorScheme="teal" alignItems={Center}>Save Details</Button> */}
            <Flex
      direction="column"
      justify="center"
      align="center"
    //   h="100vh" // Full height of the viewport
      p={4}
      textAlign="center"
    >
      <Button
        onClick={handleGenerateInvoice}
        mt={4}
        // colorScheme="teal.400"
        bg="teal.400"   
        alignItems="center"
        size={['sm', 'md', 'lg']} // Adjust size for different screen sizes
        w={['80%', '60%', '40%']} // Adjust width for different screen sizes
      >
        Save Details
      </Button>
    </Flex>

        </Box>
    );
};

export default InvoiceManager;












