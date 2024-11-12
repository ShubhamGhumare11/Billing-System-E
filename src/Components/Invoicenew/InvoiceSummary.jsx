

// // InvoiceSummary.jsx
// import React from 'react';
// import { Box, Text, VStack, Button } from '@chakra-ui/react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import logo from '../../assets/image.png';


// const InvoiceSummary = ({ customer, products, total ,gst }) => {
//     const generatePdf = () => {
//         const doc = new jsPDF();
    
//         // Shop Owner and Invoice Info
//         const shopOwner = {
//             name: "ABC Shop",
//             address: "123 Market Street, City",
//             phone: "+1 234 567 890",
//             email: "contact@abcshop.com"
//         };
    
//         const invoiceNumber = `INV-${Math.floor(Math.random() * 1000000)}`;
//         const invoiceDate = new Date().toISOString().split('T')[0];
//         const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
//         // Title and Border
//         doc.setFontSize(20);
//         doc.setFont("helvetica", "bold");
//         doc.text("Invoice", 105, 20, { align: 'center' });
    
//         // Draw border for the Shop Owner Details section
//         doc.rect(10, 30, 190, 40); // x, y, width, height
    
//         // Logo and Shop Owner Details
//         doc.setFontSize(12);
//         doc.setFont("helvetica", "bold");

//         // doc.addImage(logo, 'PNG', 12, 32, 30, 30);
//         let yPosition = 35;
//         doc.text(` ${shopOwner.name}`, 15, yPosition);
//         doc.setFont("helvetica", "normal");
//         yPosition += 10;
//         doc.text(` ${shopOwner.address}`, 15, yPosition);
//         yPosition += 10;
//         doc.text(` ${shopOwner.phone}`, 15, yPosition);
//         yPosition += 10;
//         doc.text(`${shopOwner.email}`, 15, yPosition);
    
//         // Invoice Number and Date (right-aligned)
//         doc.setFont("helvetica", "bold");
//         doc.setFontSize(12);
//         doc.text(`Invoice Number: ${invoiceNumber}`, 180, 40, { align: 'right' });
//         doc.text(`Invoice Date: ${invoiceDate}`, 180, 50, { align: 'right' });
//         doc.text(`Due Date: ${dueDate}`, 180, 60, { align: 'right' });
    
//         // Customer Details Border
//         yPosition += 15;
//         doc.rect(10, yPosition, 190, 40); // Border for Customer Details
    
//         // Customer Details
//         if (customer) {
//             doc.setFont("helvetica", "bold");
//             doc.setFontSize(12);
//             yPosition += 8;
//             doc.text("Bill To,", 12, yPosition);
//             doc.setFont("helvetica", "normal");

//             yPosition += 10;
//             doc.text(`${customer.firstName} ${customer.lastName}`, 12, yPosition);
//             yPosition += 10;
//             doc.text(` ${customer.email}`, 12, yPosition);
//             yPosition += 10;
//             doc.text(` ${customer.phone}`, 12, yPosition);
//             yPosition += 5;
//             // doc.text(`Address: ${customer.address}`, 12, yPosition);
//             // yPosition += 5;
//         }
    
//         // Product Details Table
//         const productData = products.map((product) => {
//             const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100).toFixed(2);
//             return [
//                 product.productName,
//                 `$${finalPrice}`,
//                 product.quantity,
//                 `$${(finalPrice * product.quantity).toFixed(2)}`
//             ];
//         });
    
//         doc.autoTable({
//             head: [['Product', 'Price', 'Quantity', 'Subtotal']],
//             body: productData,
//             startY: yPosition + 10,
//         });
    
//         // GST and Total Amount Calculation
//         const gst = (total * 0.18).toFixed(2); // 18% GST
//         const grandTotal = (parseFloat(total) + parseFloat(gst)).toFixed(2);
    
//         // Final Summary Table with GST and Total Amount
//         doc.autoTable({
//             head: [['Description', 'Amount']],
//             body: [
//                 ['Subtotal', `$${total.toFixed(2)}`],
//                 ['GST (18%)', `$${gst}`],
//                 [{ content: 'Total Amount', styles: { fontStyle: 'bold' } }, { content: `$${grandTotal}`, styles: { fontStyle: 'bold' } }]
//             ],
//             startY: doc.previousAutoTable.finalY + 10,
            
//         });
    
//         // Save the PDF
//         doc.save('Invoice.pdf');
//     };
    

//     return (
//         <Box p={4} border="1px solid gray" borderRadius="md">
//             {/* <Text fontSize="lg" fontWeight="bold">Invoice Summary</Text>

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
//                 {products.map((product, index) => {
//                     const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100);
//                     return (
//                         <Text key={index}>
//                             {product.productName} - ${finalPrice.toFixed(2)} x {product.quantity}
//                         </Text>
//                     );
//                 })}
//             </VStack> */}

//             <Text mt={4} fontWeight="bold">Total Amount: ${total.toFixed(2)}</Text>

//             <Button mt={4} colorScheme="blue" onClick={generatePdf}>
//                 Print Bill
//             </Button>
//         </Box>
//     );
// };

// export default InvoiceSummary;




import React from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const InvoiceSummary = ({ customer, products, total, sgst, cgst }) => {
    const generatePdf = () => {
        const doc = new jsPDF();
    
        // Shop Owner and Invoice Info
        const shopOwner = {
            name: "ABC Shop",
            address: "123 Market Street, City",
            phone: "+1 234 567 890",
            email: "contact@abcshop.com"
        };
    
        const invoiceNumber = `INV-${Math.floor(Math.random() * 1000000)}`;
        const invoiceDate = new Date().toISOString().split('T')[0];
        const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
        // Title and Border
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Invoice", 105, 20, { align: 'center' });
    
        // Draw border for the Shop Owner Details section
        doc.rect(10, 30, 190, 40); // x, y, width, height
    
        // Logo and Shop Owner Details
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");

        // doc.addImage(logo, 'PNG', 12, 32, 30, 30);
        let yPosition = 35;
        doc.text(` ${shopOwner.name}`, 15, yPosition);
        doc.setFont("helvetica", "normal");
        yPosition += 10;
        doc.text(` ${shopOwner.address}`, 15, yPosition);
        yPosition += 10;
        doc.text(` ${shopOwner.phone}`, 15, yPosition);
        yPosition += 10;
        doc.text(`${shopOwner.email}`, 15, yPosition);
    
        // Invoice Number and Date (right-aligned)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`Invoice Number: ${invoiceNumber}`, 180, 40, { align: 'right' });
        doc.text(`Invoice Date: ${invoiceDate}`, 180, 50, { align: 'right' });
        doc.text(`Due Date: ${dueDate}`, 180, 60, { align: 'right' });
    
        // Customer Details Border
        yPosition += 15;
        doc.rect(10, yPosition, 190, 40); // Border for Customer Details
    
        // Customer Details
        if (customer) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            yPosition += 8;
            doc.text("Bill To,", 12, yPosition);
            doc.setFont("helvetica", "normal");

            yPosition += 10;
            doc.text(`${customer.fullName} `, 12, yPosition);
            yPosition += 10;
            doc.text(` ${customer.email}`, 12, yPosition);
            yPosition += 10;
            doc.text(` ${customer.phone}`, 12, yPosition);
            yPosition += 5;
        }
    
        // Product Details Table
        const productData = products.map((product) => {
            const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100).toFixed(2);
            return [
                product.productName,
                product.sellingPrice,
                product.discount ? `${product.discount}%` : 'No Discount',
                product.quantity,
                `${finalPrice}`,
             
                `${(finalPrice * product.quantity).toFixed(2)}`
            ];
        });
    
        doc.autoTable({
            head: [['Product', 'Price', 'Discount','Quantity','Final Price', 'Subtotal']],
            body: productData,
            startY: yPosition + 10,
        });
    



       // Subtotal Calculation
       const subtotal = products.reduce((sum, product) => {
        const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100);
        return sum + finalPrice * product.quantity;
    }, 0);

    // SGST and CGST as 5% of Subtotal
    const totalsgst = (subtotal * 0.05).toFixed(2);
    const totalcgst = (subtotal * 0.05).toFixed(2);

    // Total Amount Calculation
    const totalAmount = (parseFloat(subtotal) + parseFloat(totalsgst) + parseFloat(totalcgst)).toFixed(2);

    
        // Final Summary Table with SGST, CGST, and Total Amount
        doc.autoTable({
            head: [['Description', 'Amount']],
            body: [
                // ['Subtotal', `$${total.toFixed(2)}`],
                // ['Subtotal', `$${roundedSubtotal}`],  
                ['Subtotal', `${subtotal.toFixed(2)}`],

                ['SGST', `${sgst.toFixed(2)}%`],
                ['CGST', `${cgst.toFixed(2)}%`],
                [{ content: 'Total Amount', styles: { fontStyle: 'bold' } }, { content: `${totalAmount}`, styles: { fontStyle: 'bold' } }]
            ],
            startY: doc.previousAutoTable.finalY + 10,
        });
    
        // Save the PDF
        doc.save('Invoice.pdf');
    };
    

    console.log("SGST in InvoiceSummary........"+sgst)
    console.log("SGST in InvoiceSummary........"+cgst)

    return (
        <Box p={4} border="1px solid gray" borderRadius="md">
            {/* Invoice Summary Section */}
            <Text mt={4} fontWeight="bold">Total Amount: ${total.toFixed(2)}</Text>

            <Button mt={4} colorScheme="blue" onClick={generatePdf}>
                Print Bill
            </Button>
        </Box>
    );
};

export default InvoiceSummary;
