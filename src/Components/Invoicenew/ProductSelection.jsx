// // ProductSelection.jsx
// import React, { useState } from 'react';
// import { Box, Input, Button, Text, VStack, HStack } from '@chakra-ui/react';
// import axios from 'axios';

// const ProductSelection = ({ onProductSelect }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [productList, setProductList] = useState([]);
//     const [quantity, setQuantity] = useState(1);

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8080/products/search?query=${searchTerm}`);
//             setProductList(response.data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             alert("Error fetching products. Please try again.");
//         }
//     };

//     const handleAddProduct = (product) => {
//         onProductSelect(product, quantity);
//         setQuantity(1);
//     };

//     return (
//         <Box p={4} border="1px solid gray" borderRadius="md">
//             <VStack spacing={3}>
//                 <Input
//                     placeholder="Search for a product"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <Button onClick={handleSearch} colorScheme="teal">Search</Button>

//                 {productList.map((product) => (
//                     <Box key={product.productID} border="1px solid gray" p={2} borderRadius="md" w="100%">
//                         <Text>{product.productName} - ${product.price}</Text>
//                         <HStack spacing={2}>
//                             <Input
//                                 type="number"
//                                 min="1"
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(parseInt(e.target.value))}
//                             />
//                             <Button colorScheme="green" onClick={() => handleAddProduct(product)}>
//                                 Add to Invoice
//                             </Button>
//                         </HStack>
//                     </Box>
//                 ))}
//             </VStack>
//         </Box>
//     );
// };

// export default ProductSelection;










// // ProductSelection.jsx
// import React, { useState } from 'react';
// import { Box, Text, VStack, HStack, Input, Button } from '@chakra-ui/react';
// import SearchComponent from './SearchProductsInInvoice';

// const ProductSelection = ({ onProductSelect }) => {
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [quantity, setQuantity] = useState(1);

// //     const handleProductSelect = (product) => {
// //         // Prepare the product with quantity to be added
// //         const productWithQuantity = { ...product, quantity };
// //  // Notify the parent component about the selected product
// //  onProductSelect(productWithQuantity);
// //         // Add the selected product with the quantity to the list
// //         setSelectedProducts((prev) => [...prev, productWithQuantity]);

// //         // Reset quantity for the next selection
// //         setQuantity(1);

       
// //     };

//   const handleProductSelect = (product) => {
//         // Prepare the product with the dynamically set quantity
//         const productWithQuantity = { ...product, quantity }; // Use the quantity from input

//         // Add or update the selected product with the quantity to the list
//         setSelectedProducts((prev) => {
//             const existingProduct = prev.find(p => p.productID === product.productID);
//             if (existingProduct) {
//                 // If the product is already selected, update its quantity
//                 return prev.map(p =>
//                     p.productID === product.productID
//                         ? { ...p, quantity: p.quantity + quantity } // Add to existing quantity
//                         : p
//                 );
//             }
//             // If it's a new selection, add it to the list
//             return [...prev, productWithQuantity];
//         });

//         // Notify the parent component about the selected product
//         onProductSelect(productWithQuantity);

//         // Reset quantity for the next selection if you want to allow immediate new input
//         setQuantity(1);
//     };


//     return (
//         <Box p={4} border="1px solid gray" borderRadius="md">
//             <VStack spacing={3} align="stretch">
//                 {/* Integrate SearchComponent and handle product selection */}
//                 <SearchComponent onProductSelect={handleProductSelect} />

//                 {/* Quantity Input */}
//                 <HStack spacing={2} mt={4}>
//                     <Text>Quantity:</Text>
//                     <Input
//                         type="number"
//                         min="1"
//                         value={quantity}
//                         onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
//                     />
//                 </HStack>

//                 {/* Display Selected Products */}
//                 {selectedProducts.map((product) => (
//                     <Box key={product.productID} border="1px solid gray" p={2} borderRadius="md" w="100%">
//                         <Text>{product.productName} - ${product.price}</Text>
//                         <Text>Quantity: {product.quantity}</Text>
//                     </Box>
//                 ))}
//             </VStack>
//         </Box>
//     );
// };

// export default ProductSelection;









// import React, { useState ,useEffect } from 'react';
// import { Box, Text, VStack, HStack, Input, Button } from '@chakra-ui/react';
// import SearchComponent from './SearchProductsInInvoice';

// const ProductSelection = ({ onProductSelect }) => {
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [quantity, setQuantity] = useState(); // Initial quantity for new selections

//     const handleProductSelect = (product) => {
//         const productWithQuantity = { ...product, quantity };

//         setSelectedProducts((prev) => {
//             const existingProduct = prev.find(p => p.productID === product.productID);
//             if (existingProduct) {
//                 return prev.map(p =>
//                     p.productID === product.productID
//                         ? { ...p, quantity: p.quantity + quantity } // Update quantity
//                         : p
//                 );
//             }
//             return [...prev, productWithQuantity]; // Add new product
//         });

//         // // Reset quantity input after selection
//         // setQuantity(1);
//         onProductSelect(productWithQuantity);
//     };

//     // Handle quantity change for a selected product
//     const handleQuantityChange = (productID, newQuantity) => {
//         setSelectedProducts((prev) =>
//             prev.map(p =>
//                 p.productID === productID ? { ...p, quantity: Math.max(1, newQuantity) } : p // Ensure quantity is at least 1
//             )
//         );
//     };


//     useEffect(() => {
//         // onProductSelect(selectedProducts);   
//        handleQuantityChange()   
//     }, [product.quantity]); // Run when selectedProducts change

//     return (
//         <Box p={4} border="1px solid gray" borderRadius="md">
//             <VStack spacing={3} align="stretch">
//                 {/* Integrate SearchComponent */}
//                 <SearchComponent onProductSelect={handleProductSelect} />

//                 {/* Quantity Input for new selections */}
//                 <HStack spacing={2} mt={4}>
//                     <Text>Quantity for new selection:</Text>
//                     <Input
//                         type="number"
//                         min="1"
//                         value={quantity}
//                         onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} // Ensure it's at least 1
//                     />
//                 </HStack>

//                 {/* Display Selected Products */}
//                 {selectedProducts.map((product) => (
//                     <Box key={product.productID} border="1px solid gray" p={2} borderRadius="md" w="100%">
//                         <Text>{product.productName} - ${product.price}</Text>
//                         <HStack spacing={2}>
//                             <Text>Quantity:</Text>
//                             <Input
//                                 type="number"
//                                 min="1"
//                                 value={product.quantity}
//                                 onChange={(e) => handleQuantityChange(product.productID, parseInt(e.target.value) || 1)}
//                             />
//                         </HStack>
//                     </Box>
//                 ))}
//             </VStack>
//         </Box>
//     );
// };

// export default ProductSelection;










// ProductSelection.jsx
import React, { useState } from 'react';
import { Box, Text, VStack, HStack, Input, NumberInput, 
    NumberInputField, 
    NumberInputStepper, 
    NumberIncrementStepper, 
    NumberDecrementStepper  } from '@chakra-ui/react';
import SearchComponent from './SearchProductsInInvoice';

const ProductSelection = ({ onProductSelect }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1); // Default quantity for new selections

    const handleProductSelect = (product) => {
        const productWithQuantity = { ...product, quantity };
        const existingProduct = selectedProducts.find((p) => p.productID === product.productID);

        if (existingProduct) {
            // If product exists, update the quantity
            const updatedProducts = selectedProducts.map((p) =>
                p.productID === product.productID
                    ? { ...p, quantity: p.quantity + quantity }
                    : p
            );
            setSelectedProducts(updatedProducts);
            onProductSelect(updatedProducts); // Pass updated products to parent
        } else {
            // Add new product
            const updatedProducts = [...selectedProducts, productWithQuantity];
            setSelectedProducts(updatedProducts);
            onProductSelect(updatedProducts); // Pass updated products to parent
        }
    };

    const handleQuantityChange = (productID, newQuantity) => {
        const updatedProducts = selectedProducts.map((p) =>
            p.productID === productID ? { ...p, quantity: Math.max(1, newQuantity) } : p
        );
        setSelectedProducts(updatedProducts);
        onProductSelect(updatedProducts); // Update parent with the new quantity
    };

    return (
        <Box p={4} border="1px solid gray" borderRadius="md">
            <VStack spacing={3} align="stretch">
                <SearchComponent onProductSelect={handleProductSelect} />

                <HStack spacing={2} mt={4}>
                    <Text>Quantity for new selection:</Text>
                    <Input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                </HStack>
{/* 
                {selectedProducts.map((product) => (
                    <Box key={product.productID} border="1px solid gray" p={2} borderRadius="md" w="100%">
                        <Text>{product.productName} - ${product.price}</Text>
                        <HStack spacing={2}>
                            <Text>Quantity:</Text>
                            <Input
                                type="number"
                                min="1"
                                value={product.quantity}
                                onChange={(e) => handleQuantityChange(product.productID, parseInt(e.target.value) || 1)}
                            />
                        </HStack>
                    </Box>
                ))} */}



                {selectedProducts.map((product) => (
    <Box key={product.productID} border="1px solid gray" p={2} borderRadius="md" w="100%">
        <Text>{product.productName} - ${product.price}</Text>
        <HStack spacing={2}>
            <Text>Quantity:</Text>
            <NumberInput
                min={1}
                value={product.quantity}
                onChange={(valueString) => handleQuantityChange(product.productID, parseInt(valueString) || 1)}
                w="100px"
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </HStack>
    </Box>
))}

            </VStack>
        </Box>
    );
};

export default ProductSelection;
