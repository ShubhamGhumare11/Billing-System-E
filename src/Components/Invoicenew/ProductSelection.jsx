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



import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
  Text,
  Checkbox,
  Tag,Flex,Select,
} from "@chakra-ui/react";
import { HiTrash } from "react-icons/hi";
import SearchComponent from "./SearchProductsInInvoice";

const ProductSelection = ({ onProductSelect, onGstToggle }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isGstEnabled, setIsGstEnabled] = useState(false);
  const [gstEnabled, setGstEnabled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Online'); // Default payment method


  const handleProductSelect = (product) => {
    const productWithQuantity = { ...product, quantity };
    const existingProduct = selectedProducts.find(
      (p) => p.productID === product.productID
    );

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


  const handleDeleteProduct = (productID) => {
    const updatedProducts = selectedProducts.filter(
      (p) => p.productID !== productID
    );
    setSelectedProducts(updatedProducts);
    onProductSelect(updatedProducts);
  };



  const handleSellingPriceChange = (productID, newSellingPrice) => {
    const updatedProducts = selectedProducts.map((p) =>
      p.productID === productID
        ? { ...p, sellingPrice: Math.max(0, newSellingPrice) }
        : p
    );
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
      p.productID === productID
        ? { ...p, discount: Math.max(1, newDiscount) }
        : p
    );
    setSelectedProducts(updatedProducts);
    onProductSelect(updatedProducts);
  };




  const handleQuantityChange = (productID, newQuantity) => {
    const updatedProducts = selectedProducts.map((p) =>
        p.productID === productID ? { ...p, quantity: Math.max(1, newQuantity) } : p
    );
    setSelectedProducts(updatedProducts);
    onProductSelect(updatedProducts);
};



  const getFinalPrice = (product) => {
    const discountAmount = (product.sellingPrice * product.discount) / 100;
    return product.sellingPrice - discountAmount;
  };

  // const getSubTotalPrice = (product) => {
  //     const discountAmount = (product.sellingPrice * product.discount) / 100;
  //    const result=product.sellingPrice - discountAmount
  //     return result *product.quantity;
  // };

  const handleGstChange = (productID, newGst) => {
    const updatedProducts = selectedProducts.map((p) =>
      p.productID === productID ? { ...p, gst: Math.max(0, newGst) } : p
    );
    setSelectedProducts(updatedProducts);
    onProductSelect(updatedProducts);
  };

  const handleGstToggle = (e) => {
    const isEnabled = e.target.checked;
    setGstEnabled(isEnabled);
    onGstToggle(isEnabled); // Call the callback to pass the gstEnabled state up to InvoiceManager
  };

  const getSubTotalPrice = (product) => {
    const discountAmount = (product.sellingPrice * product.discount) / 100;
    const discountedPrice = product.sellingPrice - discountAmount;
    const gstAmount = gstEnabled ? (discountedPrice * product.gst) / 100 :  (discountedPrice *0) / 100;
    return (discountedPrice + gstAmount) * product.quantity;
  };

  // Helper function for stock status tag color
  const getStockTag = (stockQuantities) => {
    if (stockQuantities <= 0) return <Tag colorScheme="red">Out of Stock</Tag>;
    if (stockQuantities < 10) return <Tag colorScheme="yellow">Low Stock</Tag>;
    return <Tag colorScheme="green">{stockQuantities}</Tag>;
  };




  const handlePaymentMethodChange = (event) => {
    const method = event.target.value;
    setPaymentMethod(method);

    if (selectedProduct) {
      // Update selected product with the new payment method
      const updatedProduct = { ...selectedProduct, paymentMethod: method };
      setSelectedProducts(updatedProduct);
      onProductSelect(updatedProduct);
    }
  };







  // const finalPrice = (product.sellingPrice - (product.sellingPrice * product.discount) / 100);
  return (
    <Box p={4} border="1px solid gray" borderRadius="md">
      <VStack spacing={3} align="stretch">


      <Flex
        wrap="wrap"
        align="center"
        justify="space-between"
        direction={{ base: 'column', md: 'row' }}
        gap={4}
      >
        <Box flex="1" maxW={{ base: '100%', md: '500px' }} w="full">
        <SearchComponent onProductSelect={handleProductSelect} />
        </Box>
     
      </Flex>


        <HStack justify="flex-start">
          <Checkbox
            isChecked={gstEnabled}
            onChange={handleGstToggle}
            colorScheme="green"
          >
            Apply GST
          </Checkbox>

          <Select
        placeholder="Select Payment Method"
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      >
        <option value="Online">Online</option>
        <option value="Cash">Cash</option>
      </Select>
        </HStack>

        {/* Display selected products in a table */}
        <Table variant="simple" mt={4}>
          {selectedProducts.length > 0 && (
            <Thead>
              <Tr>
                {/* <Th>Product ID</Th> */}
                <Th>Product Name</Th>
                {/* <Th>Actual Price</Th> */}
                <Th>Selling Price</Th>
                <Th>Discount</Th>
                <Th>Final Price</Th>
                <Th>In Stock</Th>
                <Th>Quantity</Th>
                {gstEnabled && <Th>GST (%)</Th>}

                <Th>Subtotal</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
          )}
          <Tbody>
            {selectedProducts.map((product) => (
              <Tr key={product.productID}>
                {/* <Td>{product.productID}</Td> */}
                <Td>{product.productName} </Td>
                {/* <Td>{product.actualPrice} </Td> */}


<Td>             <Input
  type="number"
  min={0}
  value={product.sellingPrice}
  onChange={(e) =>
    handleSellingPriceChange(
      product.productID,
      parseInt(e.target.value) || 0
    )
  }
  w="100px"
/></Td>
   
                {/* <Td>
                <NumberInput
                    min={0}
                    value={product.sellingPrice}
                    onChange={(valueString) =>
                      handleSellingPriceChange(
                        product.productID,
                        parseInt(valueString) || 0
                      )
                    }
                    w="100px"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  </Td> */}

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
                      handleDiscountChange(
                        product.productID,
                        parseInt(valueString) || 1
                      )
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

                <Td>{getFinalPrice(product).toFixed(2)}</Td>

                <Td>{getStockTag(product.stockQuantities)}</Td>

                <Td>
                <NumberInput
                                        min={1}
                                        max={product.stockQuantities || 1}
                                        value={product.quantity}
                                        onChange={(valueString) => 
                                            handleQuantityChange(product.productID, parseInt(valueString) || 1)
                                        }
                                        w="100px"
                                        isInvalid={product.quantity > product.stockQuantities} 
                                    >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>

                {gstEnabled && (
                  <Td>
                    <NumberInput
                    
                      value={product.gst || 0}
                      onChange={(valueString) =>
                        handleGstChange(
                          product.productID,
                          parseInt(valueString) ||0
                        )
                      }
                      w="80px"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                )}

                <Td> {getSubTotalPrice(product).toFixed(2)}</Td>

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
