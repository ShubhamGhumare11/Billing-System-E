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
import React, { useState } from "react";
import CreateCustomer from "./CreateCustomer";
import ProductSelection from "./ProductSelection";
import InvoiceSummary from "./InvoiceSummary";
import CustomerList from "./CustomerList";

import { Button, Box, Text, Heading, Center, Flex } from "@chakra-ui/react";
import axios from "axios";

const InvoiceManager = () => {
  const [customerData, setCustomerData] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal open/close state
  const [gstEnabled, setGstEnabled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);

  const [resetKey, setResetKey] = useState(0);

  const handleCustomerData = (data) => {
    console.log("Customer Data Received in Invoice Manager:", data); // Log to confirm the data
    setCustomerData(data);
  };

  const handleCustomerSelect = (customer) => {
    setCustomerData(customer); // This will set the selected customer data
  };

  const handleProductSelect = (products) => {
    setSelectedProducts(products);

    console.log("Product DETAILS in InvoiceManager.."+ JSON.stringify(products))
  };

  const handleGstToggle = (isEnabled) => {
    setGstEnabled(isEnabled); // Update the gstEnabled state based on ProductSelection's checkbox
  };

  // // const totalAmount = selectedProducts.reduce((acc, product) => acc + product.sellingPrice * product.quantity, 0);
  // const calculateTotalAmount = () => {
  //     return selectedProducts.reduce((acc, product) => {
  //         const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100);
  //         return acc + finalPrice * product.quantity;
  //     }, 0);
  // };
  // const totalAmount = calculateTotalAmount();

  // const calculateTotalAmount = () => {
  //   return selectedProducts.reduce((acc, product) => {
  //     const discountAmount = (product.sellingPrice * product.discount) / 100;
  //     const priceAfterDiscount = product.sellingPrice - discountAmount;
  //     const gstAmount = gstEnabled
  //       ? (priceAfterDiscount * product.gst) / 100
  //       : (priceAfterDiscount * 1) / 100;
  //     console.log("product gst in Invoicemanager" + product.gst);
  //     console.log(gstAmount);
  //     const finalPriceWithGst = priceAfterDiscount + gstAmount;
  //     return acc + finalPriceWithGst * product.quantity;
  //   }, 0);
  // };
  // const totalAmount = calculateTotalAmount();



 // Function to handle payment method change
 const handlePaymentMethodChange = (method) => {
  setPaymentMethod(method);
};

const handleTaxChange = (taxType, value) => {
if (taxType === 'sgst') {
    setSgst(value);
} else if (taxType === 'cgst') {
    setCgst(value);
}
};

console.log("sgst.."+sgst)
console.log("cgst.."+cgst)

console.log("slectedproduct....."+JSON.stringify(selectedProducts))




  const calculateTotalAmount = () => {
    return selectedProducts.reduce((acc, product) => {
        const discountAmount = (product.sellingPrice * product.discount) / 100;
        const priceAfterDiscount = product.sellingPrice - discountAmount;

        // Directly use SGST and CGST
        const sgstAmount = (priceAfterDiscount * sgst) / 100;
        const cgstAmount = (priceAfterDiscount * cgst) / 100;

        // Calculate the final price with SGST and CGST
        const finalPriceWithTaxes = priceAfterDiscount + sgstAmount + cgstAmount;

        // Final total amount considering quantity
        return acc + finalPriceWithTaxes * product.quantity;
    }, 0);
};

// Calculate the total amount
const totalAmount = calculateTotalAmount();
console.log("Total Amount (with SGST, CGST):", totalAmount);



  // const handlePaymentMethodChange = (method) => {
  //   console.log("InvoiceManager........handlePaymentMethodChange"+paymentMethod)
  //   console.log("Current products before update:", selectedProducts); // Log before update

  //   setPaymentMethod(method); // This should update the paymentMethod state

  //   // Also update each selected product's paymentMethod if needed
  //   setSelectedProducts(prevProducts =>
  //     prevProducts.map(product => ({
  //       ...product,
  //       paymentMethod: method, // Update each product's paymentMethod
  //     }))
  //   );

  //   console.log("Updated products with payment method:", selectedProducts); // Log after update

  // };
  


   



  const handleGenerateInvoice = async () => {
    // Constructing the CustomersDTO
    const customersDTO = {
      // customerID: customerData?.customerID || '', // Handle optional customerID
      fullName: customerData?.fullName || "", // Default to empty string if not provided
      lastName: customerData?.lastName || "", // Default to empty string if not provided
      email: customerData?.email || "", // Default to empty string if not provided
      phone: customerData?.phone || "", // Default to empty string if not provided
      address: customerData?.address || "", // Default to empty string if not provided
      // invoiceDTOS: customerData?.invoiceDTOS || [], // Default to empty array if not provided
      // paymentDTO: customerData?.paymentDTO || null // Set to null if not provided
    };
    const invoiceNumber = `INV-${Math.floor(Math.random() * 1000000)}`; // Generate the invoice number

    const invoiceData = {
      invoiceNumber: invoiceNumber, 
      invoice1Date: new Date().toISOString().split("T")[0], // Current date in 'YYYY-MM-DD'
      invoice1DueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // Due date set to 30 days later
      grandTotal: totalAmount,
      paymentMethod:paymentMethod,
      cgstInRs:cgst,
      sgstInRs:sgst,
      // ...productDetails,
      // submit: true, // Set to true as per your example

      // Constructing the customer object to match backend format
      customer: {
        fullName: customerData?.fullName || "",
        lastName: customerData?.lastName || "",
        email: customerData?.email || "",
        phone: customerData?.phone || "",
        address: customerData?.address || "",
      },
    };


 
    // // Constructing the URL with multiple instances of productNames and sellQuantity parameters
    // const productParams = selectedProducts
    //   .map(
    //     (product, index) =>
    //       `productNames=${encodeURIComponent(
    //         product.productName
    //       )}&sellQuantity=${product.quantity || 1}`
    //   )
    //   .join("&");
  
// Constructing the URL with multiple instances of productNames, sellQuantity, and sellingPrice parameters
const productParams = selectedProducts
  .map(
    (product) =>
      `productNames=${encodeURIComponent(product.productName)}&sellQuantity=${
        product.quantity || 1
      }&sellingPrice=${product.sellingPrice || 0}`
  )
  .join("&");

    console.log(
      "Invoice data is post to backend api..." + JSON.stringify(invoiceData)
    );
    try {
      // const response = await axios.post(  `http://localhost:8080/invoice/saveInformation?id=${customerData.customerID}`, invoiceData);
      const response = await axios.post(
        `http://localhost:8080/Invoice1/saveInvoice?${productParams}`,
        invoiceData
      );

      console.log("Invoice data to backend:", invoiceData);

      alert("Invoice generated successfully!");
      resetInvoice();
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Error generating invoice. Please try again.");
    }
  };

  const resetInvoice = () => {
  

        console.log("In InvoiceManager ,resetInvoice ()");
        setCustomerData(null);
        setSelectedProducts([]);
        setPaymentMethod(""); // Reset payment method to default
        setSgst(0); // Reset SGST value
        setCgst(0); // Reset CGST value
        setResetKey((prevKey) => prevKey + 1);

  };

  return (
    <Box  key={resetKey}>
      <Heading
        as="h2"
        size="xl" // Make it larger than "lg"
        textAlign="center"
        fontWeight="extrabold"
        color="teal.600" // Use a color that stands out
        background="gray.100" // Light background to highlight
        my={5}
        p={2} // Padding for the background effect
        borderRadius="md" // Round the corners slightly
        textTransform="uppercase" // Make text uppercase for formality
        letterSpacing="widest" // Add letter spacing
        boxShadow="md" // Subtle shadow for a pop effect
      >
        Billing
      </Heading>

      <CreateCustomer onCustomerData={handleCustomerData} />
      {/* <CustomerList onSelect={handleCustomerSelect} /> */}

      <ProductSelection
        onProductSelect={handleProductSelect}
        onGstToggle={handleGstToggle}
        onPaymentMethodChange={handlePaymentMethodChange}
        onTaxChange={handleTaxChange} 
      />
      <InvoiceSummary
        customer={customerData}
        products={selectedProducts}
        total={totalAmount}
        sgst={sgst}
        cgst={cgst}
      />
      {/* <Text fontWeight="bold">Total Amount: ${totalAmount}</Text> */}
      {/* <Button onClick={handleGenerateInvoice} mt={4} colorScheme="teal" alignItems={Center}>Save Details</Button> */}
      <Flex
        direction="column"
        justify="center"
        align="center"
        p={4}
        textAlign="center"
      >
        <Button
          onClick={handleGenerateInvoice}
          mt={4}
          // colorScheme="teal.400"
          bg="teal.400"
          alignItems="center"
          size={["sm", "md", "lg"]} // Adjust size for different screen sizes
          w={["80%", "60%", "40%"]} // Adjust width for different screen sizes
        >
          Save Invoice
        </Button>
      </Flex>
    </Box>
  );
};

export default InvoiceManager;
