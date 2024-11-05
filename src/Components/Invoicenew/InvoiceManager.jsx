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

import { Button, Box, Text } from '@chakra-ui/react';
import axios from 'axios';

const InvoiceManager = () => {
    const [customerData, setCustomerData] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal open/close state

    const handleCustomerData = (data) => {
        console.log("Customer Data Received:", data); // Log to confirm the data
        setCustomerData(data);
    };



    const handleCustomerSelect = (customer) => {
        setCustomerData(customer); // This will set the selected customer data
    };

    const handleProductSelect = (products) => {
        setSelectedProducts(products);
    };

    const totalAmount = selectedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

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





        
        // const invoiceData = {
        //     // invoiceId: crypto.randomUUID(),
        //                 // invoiceId: null,

        //     invoiceDate: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD'
        //     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Due date set to 30 days later
           
        //     total: totalAmount,
        //     // payment: [], // You can add payment details here if required
            
            
        //     // invoicesDetails: selectedProducts.map(product => ({
        //     //     // invoiceDetailID: crypto.randomUUID(), // Generate UUID for each invoice detail
        //     //     Quantity: product.quantity,
        //     //     // invoice: { invoiceId: invoiceId }, // Reference to the invoice

        //     //     product: { productID: product.productID},
        //     //     // product: {
        //     //     //     productID: product.productID, // Assuming ProductsDTO has this field
        //     //     //     productName: product.productName,
        //     //     //     price: product.price,
        //     //     //     // add other relevant fields from ProductsDTO if needed
        //     //     // },


        //     // })),






        //     // invoicesDetails: selectedProducts.map(product => ({
        //     //     // invoiceDetailID: crypto.randomUUID(),
        //     //     // invoiceDetailID:null,
        //     //     Quantity: product.quantity || 1, // Use the expected casing for Quantity
        //     //     // invoice:invoiceId,
        //     //     product: {
        //     //         productID: product.productID, // Assuming this is the ID of the product
        //     //         productName: product.productName ,// Include if you need to show name as well
        //     //         description:product.description ,
        //     //         price: product.price ,
        //     //         actualPrice: product.actualPrice ,
        //     //         sellingPrice: product.sellingPrice ,
        //     //         discount: product.discount ,

        //     //         // clothingType: product.clothingType ,
        //     //         clothingType: "READYMADE" ,


        //     //         stockQuantities: product.stockQuantities ,

                   

        //     //     }, 
        //     //      invoice: { invoiceId: null } 
        //     // })),


        //     customers: customersDTO, // Ensure this object matches CustomersDTO structure
        //     // shippingDetails: [] // Optional: include shipping details if available
        // };








        const invoiceData = {
            invoice1Date: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD'
            invoice1DueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Due date set to 30 days later
            submit: true, // Set to true as per your example
            
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
            const response = await axios.post(`http://localhost:8080/Invoice1/saveInvoice2?${productParams}`, invoiceData);

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
               <Button onClick={() => setIsModalOpen(true)} colorScheme="teal" mb={4}>
                Create Customer
            </Button>

            <CreateCustomer 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onCustomerData={handleCustomerData} 
            />  
            <CustomerList onSelect={handleCustomerSelect} />

            <ProductSelection onProductSelect={handleProductSelect} />
            <InvoiceSummary customer={customerData} products={selectedProducts} total={totalAmount} />
            <Text fontWeight="bold">Total Amount: ${totalAmount}</Text>
            <Button onClick={handleGenerateInvoice} mt={4} colorScheme="teal">Generate Invoice</Button>
        </Box>
    );
};

export default InvoiceManager;












