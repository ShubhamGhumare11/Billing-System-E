// // ProductSelection.jsx
// import React, { useState } from 'react';
// import { Box, Text, VStack, HStack, Input, NumberInput, 
//     NumberInputField, 
//     NumberInputStepper, 
//     NumberIncrementStepper, 
//     NumberDecrementStepper  } from '@chakra-ui/react';
// import SearchComponent from './SearchProductsInInvoice';

// const ProductSelection = ({ onProductSelect }) => {
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [quantity, setQuantity] = useState(1); // Default quantity for new selections

//     const handleProductSelect = (product) => {
//         const productWithQuantity = { ...product, quantity };
//         const existingProduct = selectedProducts.find((p) => p.productID === product.productID);

//         if (existingProduct) {
//             // If product exists, update the quantity
//             const updatedProducts = selectedProducts.map((p) =>
//                 p.productID === product.productID
//                     ? { ...p, quantity: p.quantity + quantity }
//                     : p
//             );
//             setSelectedProducts(updatedProducts);
//             onProductSelect(updatedProducts); // Pass updated products to parent
//         } else {
//             // Add new product
//             const updatedProducts = [...selectedProducts, productWithQuantity];
//             setSelectedProducts(updatedProducts);
//             onProductSelect(updatedProducts); // Pass updated products to parent
//         }
//     };

//     const handleQuantityChange = (productID, newQuantity) => {
//         const updatedProducts = selectedProducts.map((p) =>
//             p.productID === productID ? { ...p, quantity: Math.max(1, newQuantity) } : p
//         );
//         setSelectedProducts(updatedProducts);
//         onProductSelect(updatedProducts); // Update parent with the new quantity
//     };

//     return (
//         <Box p={4} border="1px solid gray" borderRadius="md">
//             <VStack spacing={3} align="stretch">
//                 <SearchComponent onProductSelect={handleProductSelect} />
// {/* 
//                 <HStack spacing={2} mt={4}>
//                     <Text>Quantity for new selection:</Text>
//                     <Input
//                         type="number"
//                         min="1"
//                         value={quantity}
//                         onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
//                     />
//                 </HStack> */}
// {/* 
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
//                 ))} */}



//                 {selectedProducts.map((product) => (
//     <Box key={product.productID} border="1px solid gray" p={2} borderRadius="md" w="100%">
//         <Text>{product.productName} - ${product.price}</Text>
//         <HStack spacing={2}>
//             <Text>Quantity:</Text>
//             <NumberInput
//                 min={1}
//                 value={product.quantity}
//                 onChange={(valueString) => handleQuantityChange(product.productID, parseInt(valueString) || 1)}
//                 w="100px"
//             >
//                 <NumberInputField />
//                 <NumberInputStepper>
//                     <NumberIncrementStepper />
//                     <NumberDecrementStepper />
//                 </NumberInputStepper>
//             </NumberInput>
//         </HStack>
//     </Box>
// ))}

//             </VStack>
//         </Box>
//     );
// };

// export default ProductSelection;









import React, { useState } from 'react';
import { 
    Box, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, Input,
    IconButton, NumberInput, NumberInputField, NumberInputStepper, 
    NumberIncrementStepper, NumberDecrementStepper, Tooltip, Text 
} from '@chakra-ui/react';
import { HiTrash } from 'react-icons/hi';
import SearchComponent from './SearchProductsInInvoice';

const ProductSelection = ({ onProductSelect }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const handleProductSelect = (product) => {
        const productWithQuantity = { ...product, quantity };
        const existingProduct = selectedProducts.find((p) => p.productID === product.productID);

        if (existingProduct) {
            const updatedProducts = selectedProducts.map((p) =>
                p.productID === product.productID
                    ? { ...p, quantity: p.quantity + quantity }
                    : p
            );
            setSelectedProducts(updatedProducts);
            onProductSelect(updatedProducts);
        } else {
            const updatedProducts = [...selectedProducts, productWithQuantity];
            setSelectedProducts(updatedProducts);
            onProductSelect(updatedProducts);
        }
    };

    const handleQuantityChange = (productID, newQuantity) => {
        const updatedProducts = selectedProducts.map((p) =>
            p.productID === productID ? { ...p, quantity: Math.max(1, newQuantity) } : p
        );
        setSelectedProducts(updatedProducts);
        onProductSelect(updatedProducts);
    };

    const handleDeleteProduct = (productID) => {
        const updatedProducts = selectedProducts.filter((p) => p.productID !== productID);
        setSelectedProducts(updatedProducts);
        onProductSelect(updatedProducts);
    };






    // const handleDiscountChange = (index, discount) => {
    //     const newProducts = [...products];
    //     newProducts[index].discount = parseFloat(discount);
    //     setSelectedProducts(newProducts);
    //     onProductSelect(newProducts);
    // };

    
    const handleDiscountChange = (productID, newDiscount) => {
        const updatedProducts = selectedProducts.map((p) =>
            p.productID === productID ? { ...p, discount: Math.max(1, newDiscount) } : p
        );
        setSelectedProducts(updatedProducts);
        onProductSelect(updatedProducts);
    };

    const getFinalPrice = (product) => {
        const discountAmount = (product.sellingPrice * product.discount) / 100;
        return product.sellingPrice - discountAmount;
    };


    return (
        <Box p={4} border="1px solid gray" borderRadius="md">
            <VStack spacing={3} align="stretch">
                <SearchComponent onProductSelect={handleProductSelect} />

                {/* Display selected products in a table */}
                <Table variant="simple" mt={4}>
                {selectedProducts.length > 0 && (
        <Thead>
            <Tr>
                {/* <Th>Product ID</Th> */}
                <Th>Product Name</Th>
                <Th>Actual Price</Th>
                <Th>Selling Price</Th>
                <Th>Discount</Th>
                <Th>Final Price</Th>
                <Th>Quantity</Th>
                <Th>Actions</Th>
            </Tr>
        </Thead>
    )}
                    <Tbody>
                        {selectedProducts.map((product) => (
                            <Tr key={product.productID}>
                                {/* <Td>{product.productID}</Td> */}
                                <Td>{product.productName} </Td>
                                <Td>{product.actualPrice} </Td>

                                <Td>{product.sellingPrice}</Td>

                                {/* <Input
                        type="number"
                        value={product.discount}
                        placeholder="Discount (%)"
                        onChange={(e) => handleDiscountChange(index, e.target.value)}
                    /> */}

                                    <Td>
                                    <NumberInput
                                        min={1}
                                        value={product.discount}
                                        onChange={(valueString) => 
                                            handleDiscountChange(product.productID, parseInt(valueString) || 1)
                                        }
                                        w="100px"
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Td>


                                <Td>    
                                {getFinalPrice(product).toFixed(2)} </Td>
                                <Td>
                                    <NumberInput
                                        min={1}
                                        value={product.quantity}
                                        onChange={(valueString) => 
                                            handleQuantityChange(product.productID, parseInt(valueString) || 1)
                                        }
                                        w="100px"
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Td>
                                <Td>
                                    <Tooltip label="Delete product" aria-label="Delete Tooltip">
                                        <IconButton
                                            aria-label="Delete"
                                            icon={<HiTrash />}
                                            colorScheme="red"
                                            onClick={() => handleDeleteProduct(product.productID)}
                                        />
                                    </Tooltip>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </VStack>
        </Box>
    );
};

export default ProductSelection;
