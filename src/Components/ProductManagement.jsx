// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   HStack,
//   VStack,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Checkbox,
//   FormControl,
//   FormLabel,
//   Input,
//   Box,
//   Heading,
//   useToast,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Flex,
// } from "@chakra-ui/react";
// import axios from "axios";
// import SearchComponent from "./SearchComponent";

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [isProductListVisible, setIsProductListVisible] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editableProductID, setEditableProductID] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

//   const [newProduct, setNewProduct] = useState({
//     productName: "",
//     description: "",
//     price: "",
//     actualPrice: "",
//     sellingPrice: "",
//     discount: "",
//     stockQuantities: [0],
//     clothingType: "",
//   });

//   // Fetch all products from API
//   const handleGetAllProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/products/getAll");

//       console.log("GetAll products......" + response.data.object);

//       const data = await response.data.object;
//       setProducts(data);
//       console.log("GetAll products......" + data.Object);

//       // setProducts(response.data.Object);
//       setIsFormVisible(false);
//       setIsProductListVisible(true);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // Delete a product using API
//   const handleDeleteProduct = async (productID) => {
//     try {
//       // `/api/products/${productID}`
//       await axios.delete(
//         `http://localhost:8080/products/deleteByID?id=${productID}`
//       );
//       setProducts(
//         products.filter((product) => product.productID !== productID)
//       );
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   // Toggle editable mode for a product row
//   const handleEditProduct = (productID) => {
//     setEditableProductID(productID);
//   };

//   // Save edited product changes to the API and update the state
//   const handleSaveEdit = async (productID) => {
//     const updatedProduct = products.find(
//       (product) => product.productID === productID
//     );

//     console.log("updatedProduct........." + updatedProduct);
//     console.log(
//       "updatedProduct.........",
//       JSON.stringify(updatedProduct, null, 2)
//     );

//     try {
//       await axios.patch(
//         `http://localhost:8080/products/updateAny?id=${productID}`,
//         updatedProduct
//       );
//       setEditableProductID(null);
//       handleGetAllProducts(); // Refresh product list
//     } catch (error) {
//       console.error("Error saving product changes:", error);
//     }
//   };

//   const handleProductChange = (productID, field, value) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.productID === productID
//           ? {
//               ...product,
//               [field]:
//                 field === "stockQuantities"
//                   ? value.split(",").map(Number)
//                   : value,
//             }
//           : product
//       )
//     );
//   };

//   // Add a new product using API
//   const handleAddProduct = async () => {
//     try {
//       console.log(newProduct);
//       const response = await axios.post(
//         "http://localhost:8080/products/saveInformation",
//         newProduct
//       );
//       setProducts([...products, response.data]);

//       console.log(products);
//       console.log(newProduct);

//       setNewProduct({
//         productName: "",
//         description: "",
//         price: "",
//         actualPrice: "",
//         sellingPrice: "",
//         discount: "",
//         stockQuantities: [0],
//         clothingType: "",
//       });
//       // setIsProductListVisible(true);

//       setIsModalOpen(false);
//       setIsFormVisible(false);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <VStack spacing={4} mt={4}>
//       <Heading as="h2" size="lg">
//         Product Management
//       </Heading>
//       <HStack spacing={100}>
//         <SearchComponent />
//         <HStack spacing={5}>
//           {/* <Button colorScheme="teal" onClick={() => setIsFormVisible(true)}> */}
//           <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
//             Add Product
//           </Button>
//           <Button colorScheme="blue" onClick={handleGetAllProducts}>
//             Get All Products
//           </Button>
//         </HStack>
//       </HStack>

//       <Flex
//         justify="space-between" // Distribute space between children
//         align="center"
//         // align="flex-start"
//         // Align items vertically centered
//         p={4} // Add padding
//         border="1px" // Border around the container
//         borderColor="gray.300" // Border color
//         borderRadius="md" // Rounded corners
//         bg="gray.50" // Background color
//       >
//         <Box flex="1" maxW="500px">
//           <SearchComponent />
//         </Box>

//         <Box display="flex" gap={2}>
//           <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
//             Add Product
//           </Button>
//           <Button colorScheme="blue" onClick={handleGetAllProducts}>
//             Get All Products
//           </Button>
//         </Box>
//       </Flex>

//       {/* Add Product Modal */}

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add New Product</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <VStack spacing={4}>
//               <HStack spacing={4}>
//                 <FormControl>
//                   <Checkbox
//                     isChecked={newProduct.clothingType === "READYMADE"}
//                     onChange={(e) =>
//                       setNewProduct({
//                         ...newProduct,
//                         clothingType: e.target.checked ? "READYMADE" : "",
//                       })
//                     }
//                   >
//                     Readymade
//                   </Checkbox>
//                 </FormControl>
//                 <FormControl>
//                   <Checkbox
//                     isChecked={newProduct.clothingType === "UNSTITCHED"}
//                     onChange={(e) =>
//                       setNewProduct({
//                         ...newProduct,
//                         clothingType: e.target.checked ? "UNSTITCHED" : "",
//                       })
//                     }
//                   >
//                     Unstitched
//                   </Checkbox>
//                 </FormControl>
//               </HStack>
//               <Input
//                 placeholder="Product Name"
//                 value={newProduct.productName}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, productName: e.target.value })
//                 }
//               />
//               <Input
//                 placeholder="Description"
//                 value={newProduct.description}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, description: e.target.value })
//                 }
//               />
//               <Input
//                 placeholder="Price"
//                 type="number"
//                 value={newProduct.price}
//                 onChange={(e) =>
//                   setNewProduct({
//                     ...newProduct,
//                     price: parseFloat(e.target.value),
//                   })
//                 }
//               />
//               <Input
//                 placeholder="Actual Price"
//                 type="number"
//                 value={newProduct.actualPrice}
//                 onChange={(e) =>
//                   setNewProduct({
//                     ...newProduct,
//                     actualPrice: parseFloat(e.target.value),
//                   })
//                 }
//               />
//               <Input
//                 placeholder="Selling Price"
//                 type="number"
//                 value={newProduct.sellingPrice}
//                 onChange={(e) =>
//                   setNewProduct({
//                     ...newProduct,
//                     sellingPrice: parseFloat(e.target.value),
//                   })
//                 }
//               />
//               <Input
//                 placeholder="Discount"
//                 type="number"
//                 value={newProduct.discount}
//                 onChange={(e) =>
//                   setNewProduct({
//                     ...newProduct,
//                     discount: parseFloat(e.target.value),
//                   })
//                 }
//               />
//               <Input
//                 type="number"
//                 value={newProduct.stockQuantities}
//                 onChange={(e) =>
//                   setNewProduct({
//                     ...newProduct,
//                     stockQuantities: e.target.value.split(",").map(Number),
//                   })
//                 }
//                 placeholder="Enter stock quantity"
//               />
//             </VStack>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" onClick={handleAddProduct}>
//               Add Product
//             </Button>
//             <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       {/* geAll productLIst */}
//       {isProductListVisible && (
//         <Table variant="simple" mt={4}>
//           <Thead>
//             <Tr>
//               <Th>Product ID</Th>
//               <Th>Product Name</Th>
//               <Th>Product Type</Th>
//               <Th>Description</Th>
//               <Th>Selling Price</Th>
//               <Th>Stock Quantity</Th>
//               <Th>Actions</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {products.map((product) => (
//               <Tr
//                 key={product.productID}
//                 onClick={() => handleEditProduct(product.productID)}
//               >
//                 <Td>{product.productID}</Td>

//                 <Td>
//                   {editableProductID === product.productID ? (
//                     <Input
//                       value={product.productName}
//                       onChange={(e) =>
//                         handleProductChange(
//                           product.productID,
//                           "productName",
//                           e.target.value
//                         )
//                       }
//                     />
//                   ) : (
//                     product.productName
//                   )}
//                 </Td>

//                 {/* <Td>
//                 {editableProductID === product.productID ? (
//                   <Checkbox
//                     isChecked={product.clothingType === 'READYMADE'}
//                     onChange={(e) => handleProductChange(product.productID, 'clothingType', e.target.checked ? 'READYMADE' : 'UNSTITCHED')}
//                   >
//                     Readymade
//                   </Checkbox>
//                 ) : (
//                   product.clothingType
//                 )}
//               </Td> */}

//                 <Td>
//                   {editableProductID === product.productID ? (
//                     <VStack spacing={4}>
//                       <Checkbox
//                         isChecked={product.clothingType === "READYMADE"}
//                         onChange={(e) =>
//                           handleProductChange(
//                             product.productID,
//                             "clothingType",
//                             e.target.checked
//                               ? "READYMADE"
//                               : product.clothingType === "UNSTITCHED"
//                               ? ""
//                               : product.clothingType
//                           )
//                         }
//                       >
//                         READYMADE
//                       </Checkbox>

//                       <Checkbox
//                         isChecked={product.clothingType === "UNSTITCHED"}
//                         onChange={(e) =>
//                           handleProductChange(
//                             product.productID,
//                             "clothingType",
//                             e.target.checked
//                               ? "UNSTITCHED"
//                               : product.clothingType === "READYMADE"
//                               ? ""
//                               : product.clothingType
//                           )
//                         }
//                       >
//                         UNSTITCHED
//                       </Checkbox>
//                     </VStack>
//                   ) : (
//                     product.clothingType
//                   )}
//                 </Td>

//                 <Td>
//                   {editableProductID === product.productID ? (
//                     <Input
//                       value={product.description}
//                       onChange={(e) =>
//                         handleProductChange(
//                           product.productID,
//                           "description",
//                           e.target.value
//                         )
//                       }
//                     />
//                   ) : (
//                     product.description
//                   )}
//                 </Td>

//                 <Td>
//                   {editableProductID === product.productID ? (
//                     <Input
//                       type="number"
//                       value={product.sellingPrice}
//                       onChange={(e) =>
//                         handleProductChange(
//                           product.productID,
//                           "sellingPrice",
//                           parseFloat(e.target.value)
//                         )
//                       }
//                     />
//                   ) : (
//                     product.sellingPrice
//                   )}
//                 </Td>

//                 <Td>
//                   {editableProductID === product.productID ? (
//                     <Input
//                       value={product.stockQuantities}
//                       onChange={(e) =>
//                         handleProductChange(
//                           product.productID,
//                           "stockQuantities",
//                           e.target.value
//                         )
//                       }
//                       placeholder="Enter quantities separated by commas"
//                     />
//                   ) : (
//                     product.stockQuantities
//                   )}
//                 </Td>

//                 <Td>
//                   {editableProductID === product.productID ? (
//                     <Button
//                       colorScheme="green"
//                       onClick={() => handleSaveEdit(product.productID)}
//                     >
//                       Save
//                     </Button>
//                   ) : (
//                     <Button
//                       colorScheme="yellow"
//                       onClick={() => handleEditProduct(product.productID)}
//                     >
//                       Edit
//                     </Button>
//                   )}
//                   <Button
//                     colorScheme="red"
//                     onClick={() => handleDeleteProduct(product.productID)}
//                   >
//                     Delete
//                   </Button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       )}
//     </VStack>
//   );
// };

// export default ProductManagement;

// ************************************************************************************************************* */

import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  IconButton ,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import SearchComponent from "./SearchComponent";
import { FaPlus,FaList } from "react-icons/fa";
import { HiSave, HiPencilAlt, HiTrash } from "react-icons/hi";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isProductListVisible, setIsProductListVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editableProductID, setEditableProductID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const [newProduct, setNewProduct] = useState({
    productName: "",
    description: "",

    actualPrice: "0000",
    sellingPrice: "",
    discount: "0",
    stockQuantities: [],
    clothingType: "",
  });

// pagination Logic
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Adjust this value to set items per page

  // Calculate slice for current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
handleGetAllProducts()
  }, []);

  // Fetch all products from API
  const handleGetAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products/getAll");

      console.log("GetAll products......" + response.data.object);

      const data = await response.data.object;
      setProducts(data);
      console.log("GetAll products......" + data.Object);

      // setProducts(response.data.Object);
      setIsFormVisible(false);
      setIsProductListVisible(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete a product using API
  const handleDeleteProduct = async (productID) => {
    try {
      // `/api/products/${productID}`
      await axios.delete(
        `http://localhost:8080/products/deleteByID?id=${productID}`
      );
      setProducts(
        products.filter((product) => product.productID !== productID)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Toggle editable mode for a product row
  const handleEditProduct = (productID) => {
    setEditableProductID(productID);
  };

  // Save edited product changes to the API and update the state
  const handleSaveEdit = async (productID) => {
    const updatedProduct = products.find(
      (product) => product.productID === productID
    );

    console.log("updatedProduct........." + updatedProduct);
    console.log(
      "updatedProduct.........",
      JSON.stringify(updatedProduct, null, 2)
    );

    try {
      await axios.patch(
        `http://localhost:8080/products/updateAny?id=${productID}`,
        updatedProduct
      );
      setEditableProductID(null);
      handleGetAllProducts(); // Refresh product list
    } catch (error) {
      console.error("Error saving product changes:", error);
    }
  };

  const handleProductChange = (productID, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productID === productID
          ? {
              ...product,
              [field]:
                field === "stockQuantities"
                  ? value.split(",").map(Number)
                  : value,
            }
          : product
      )
    );
  };

  // Add a new product using API
  const handleAddProduct = async () => {
    try {
      console.log(newProduct);
      const response = await axios.post(
        "http://localhost:8080/products/saveInformation",
        newProduct
      );
      setProducts([...products, response.data]);

      console.log(products);
      console.log(newProduct);

      setNewProduct({
        productName: "",
        description: "",
        price: "",
        actualPrice: "",
        sellingPrice: "",
        discount: "",
        stockQuantities: [],
        clothingType: "",
      });

      handleGetAllProducts(); // Refresh product list
      setIsModalOpen(false);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <VStack spacing={4} mt={4} w="full" align="stretch">
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
    Product Management
</Heading>

      <Flex
        wrap="wrap"
        align="center"
        justify="space-between"
        direction={{ base: 'column', md: 'row' }}
        gap={4}
      >
        <Box flex="1" maxW={{ base: '100%', md: '500px' }} w="full">
          <SearchComponent />
        </Box>
        <HStack spacing={3} wrap="wrap" justifyContent="center">
          <Button colorScheme="green" leftIcon={<FaPlus/>} onClick={() => setIsModalOpen(true)}>
             Add Product
          </Button>
          {/* <Button colorScheme="blue" leftIcon={<FaList/>} onClick={handleGetAllProducts}>
              Products List
          </Button> */}
        </HStack>
      </Flex>

      {/* Add Product Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <HStack spacing={4}>
                <FormControl>
                  <Checkbox
                    isChecked={newProduct.clothingType === 'READYMADE'}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        clothingType: e.target.checked ? 'READYMADE' : '',
                      })
                    }
                  >
                    Readymade
                  </Checkbox>
                </FormControl>
                <FormControl>
                  <Checkbox
                    isChecked={newProduct.clothingType === 'UNSTITCHED'}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        clothingType: e.target.checked ? 'UNSTITCHED' : '',
                      })
                    }
                  >
                    Unstitched
                  </Checkbox>
                </FormControl>
              </HStack>
              <Input
                placeholder="Product Name"
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productName: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
              {/* <Input
                placeholder="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <Input
                placeholder="Actual Price"
                type="number"
                value={newProduct.actualPrice}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    actualPrice: parseFloat(e.target.value),
                  })
                }
              /> */}
              <Input
                placeholder="Selling Price"
                type="number"
                value={newProduct.sellingPrice}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    sellingPrice: parseFloat(e.target.value),
                  })
                }
              />
              {/* <Input
                placeholder="Discount"
                type="number"
                value={newProduct.discount}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    discount: parseFloat(e.target.value),
                  })
                }
              /> */}
              <Input
                type="number"
                value={newProduct.stockQuantities}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stockQuantities: e.target.value.split(',').map(Number),
                  })
                }
                placeholder="Enter stock quantity"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddProduct}>
              Add Product
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Product List */}
      {/* {isProductListVisible && (
        <Box overflowX="auto" w="full">
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Product ID</Th>
                <Th>Product Name</Th>
                <Th>Product Type</Th>
                <Th>Description</Th>
                <Th>Selling Price</Th>
                <Th>Stock Quantity</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.productID}>
                  <Td>{product.productID}</Td>
                  <Td>
                    {editableProductID === product.productID ? (
                      <Input
                        value={product.productName}
                        onChange={(e) =>
                          handleProductChange(
                            product.productID,
                            'productName',
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      product.productName
                    )}
                  </Td>
                  <Td>{product.clothingType}</Td>
                  <Td>{product.description}</Td>
                  <Td>{product.sellingPrice}</Td>
                  <Td>{product.stockQuantities}</Td>
                  <Td>
                    {editableProductID === product.productID ? (
                      <Button
                        colorScheme="green"
                        onClick={() => handleSaveEdit(product.productID)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        colorScheme="yellow"
                        onClick={() => handleEditProduct(product.productID)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteProduct(product.productID)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )} */}

  {/* geAll productLIst */}
         {isProductListVisible && (

          <Flex direction="column" height="100%">
          <Box flex="1" overflowY="auto">
         <Table variant="simple" mt={4}>
           <Thead>
             <Tr>
               {/* <Th>Product ID</Th> */}
               <Th>Product Name</Th>
               <Th>Product Type</Th>
               <Th>Description</Th>
               <Th>Selling Price</Th>
               <Th>Stock Quantity</Th>
               <Th>Actions</Th>
             </Tr>
           </Thead>
           <Tbody>
             {currentProducts.map((product) => (
               <Tr
                 key={product.productID}
                onClick={() => handleEditProduct(product.productID)}
                _hover={{ backgroundColor: "gray.100" }}
               >
                 {/* <Td>{product.productID}</Td> */}

                 <Td>
                   {editableProductID === product.productID ? (
                     <Input
                       value={product.productName}
                       onChange={(e) =>
                         handleProductChange(
                           product.productID,
                           "productName",
                           e.target.value
                         )
                       }
                     />
                   ) : (
                     product.productName
                   )}
                 </Td>

                 {/* <Td>
                 {editableProductID === product.productID ? (
                   <Checkbox
                     isChecked={product.clothingType === 'READYMADE'}
                     onChange={(e) => handleProductChange(product.productID, 'clothingType', e.target.checked ? 'READYMADE' : 'UNSTITCHED')}
                  >
                     Readymade
                   </Checkbox>
                 ) : (
                   product.clothingType
                 )}
               </Td> */}

                 <Td>
                   {editableProductID === product.productID ? (
                     <VStack spacing={4}>
                       <Checkbox
                         isChecked={product.clothingType === "READYMADE"}
                         onChange={(e) =>
                           handleProductChange(
                             product.productID,
                             "clothingType",
                             e.target.checked
                               ? "READYMADE"
                               : product.clothingType === "UNSTITCHED"
                               ? ""
                               : product.clothingType
                           )
                         }
                       >
                         READYMADE
                       </Checkbox>

                       <Checkbox
                         isChecked={product.clothingType === "UNSTITCHED"}
                         onChange={(e) =>
                           handleProductChange(
                             product.productID,
                             "clothingType",
                             e.target.checked
                               ? "UNSTITCHED"
                               : product.clothingType === "READYMADE"
                              ? ""
                               : product.clothingType
                           )
                         }
                       >
                         UNSTITCHED
                       </Checkbox>
                     </VStack>
                   ) : (
                     product.clothingType
                   )}
                 </Td>

                 <Td>
                   {editableProductID === product.productID ? (
                     <Input
                       value={product.description}
                       onChange={(e) =>
                         handleProductChange(
                           product.productID,
                           "description",
                           e.target.value
                         )
                       }
                     />
                   ) : (
                     product.description
                   )}
                 </Td>

                 <Td>
                   {editableProductID === product.productID ? (
                     <Input
                       type="number"
                       value={product.sellingPrice}
                       onChange={(e) =>
                         handleProductChange(
                           product.productID,
                           "sellingPrice",
                           parseFloat(e.target.value)
                         )
                       }
                     />
                   ) : (
                     product.sellingPrice
                   )}
                </Td>

                 <Td>
                   {editableProductID === product.productID ? (
                     <Input
                       value={product.stockQuantities}
                       onChange={(e) =>
                         handleProductChange(
                           product.productID,
                           "stockQuantities",
                           e.target.value
                         )
                       }
                       placeholder="Enter quantities separated by commas"
                     />
                   ) : (
                     product.stockQuantities
                   )}
                 </Td>

                 {/* <Td>
                   {editableProductID === product.productID ? (
                     <Button
                       colorScheme="green"
                       onClick={() => handleSaveEdit(product.productID)}
                     >
                       Save
                     </Button>
                   ) : (
                    <Button
                       colorScheme="yellow"
                       onClick={() => handleEditProduct(product.productID)}
                     >
                       Edit
                     </Button>
                   )}
                   <Button
                     colorScheme="red"
                     onClick={() => handleDeleteProduct(product.productID)}
                  >
                     Delete
                   </Button>
                 </Td> */}

                 <Td>
  <HStack spacing={4}>
    <Tooltip label="Save changes" aria-label="Save Tooltip">
      <IconButton
        aria-label="Save"
        icon={<HiSave />}
        colorScheme="green"
        onClick={() => handleSaveEdit(product.productID)}
      />
    </Tooltip>

    <Tooltip label="Edit product" aria-label="Edit Tooltip">
      <IconButton
        aria-label="Edit"
        icon={<HiPencilAlt />}
        colorScheme="yellow"
        onClick={() => handleEditProduct(product.productID)}
      />
    </Tooltip>

    <Tooltip label="Delete product" aria-label="Delete Tooltip">
      <IconButton
        aria-label="Delete"
        icon={<HiTrash />}
        colorScheme="red"
        onClick={() => handleDeleteProduct(product.productID)}
      />
    </Tooltip>
  </HStack>
</Td>

               </Tr>
             ))}
           </Tbody>
        </Table>
        </Box>
         {/* Pagination Controls */}
  <Flex
        mt="auto"
        bottom="0"
        width="100%"
        justify="center"
        py={4}
        bg="white"
        boxShadow="md"
      >
  <HStack spacing={4} mt={4}>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Prev
        </Button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            isActive={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
      </Flex>
      </Flex>
       )}

    </VStack>

  );
};

export default ProductManagement;

//************************************************** */











// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   HStack,
//   VStack,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   IconButton,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Checkbox,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   Box,
//   Heading,
//   Flex,
//   Spinner,
//   Alert,
//   AlertIcon,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { FaList, FaPlus } from "react-icons/fa";
// import { HiSave, HiPencilAlt, HiTrash } from "react-icons/hi";

// const API_URL = "http://localhost:8080/products";

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [isProductListVisible, setIsProductListVisible] = useState(false);
//   const [currentSort, setCurrentSort] = useState(null);
//   const [currentStockSort, setCurrentStockSort] = useState(null);
//   const [selectedType, setSelectedType] = useState("All");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedProduct, setEditedProduct] = useState(null);
//   const [newProduct, setNewProduct] = useState({
//     productName: "",
//     description: "",
//     actualPrice: "",
//     sellingPrice: "",
//     discount: "0",
//     stockQuantities: [],
//     clothingType: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     handleGetAllProducts();
//   }, []);

//   useEffect(() => {
//     let filtered = [...products];
//     if (selectedType !== "All") {
//       filtered = filtered.filter(
//         (product) => product.clothingType === selectedType
//       );
//     }

//     // Apply sorting
//     if (currentSort === "nameAsc") {
//       filtered.sort((a, b) => a.productName.localeCompare(b.productName));
//     } else if (currentSort === "nameDesc") {
//       filtered.sort((a, b) => b.productName.localeCompare(a.productName));
//     }

//     if (currentStockSort === "asc") {
//       filtered.sort((a, b) => a.stockQuantities[0] - b.stockQuantities[0]);
//     } else if (currentStockSort === "desc") {
//       filtered.sort((a, b) => b.stockQuantities[0] - a.stockQuantities[0]);
//     }

//     setFilteredProducts(filtered);
//   }, [products, currentSort, selectedType, currentStockSort]);

//   const handleGetAllProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_URL}/getAll`);
//       setProducts(response.data.object);
//       console.log(response.data.object);
//       setIsProductListVisible(true);
//     } catch (error) {
//       setError("Error fetching products. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditProduct = (product) => {
//     setEditedProduct({ ...product });
//     setIsEditing(true);
//   };

//   const handleSaveProduct = async () => {
//     if (!editedProduct?.productID) {
//       setError("Product ID is missing.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.patch(
//         `${API_URL}/updateAny?id=${editedProduct.productID}`,
//         editedProduct
//       );
//       setIsEditing(false);
//       setEditedProduct(null);
//       handleGetAllProducts();
//     } catch (error) {
//       setError("Error saving product. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteProduct = async (productID) => {
//     setLoading(true);
//     try {
//       await axios.delete(`${API_URL}/deleteByID?id=${productID}`);
//       handleGetAllProducts();
//     } catch (error) {
//       setError("Error deleting product. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddProduct = async () => {
//     if (!newProduct.productName || !newProduct.sellingPrice) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${API_URL}/saveInformation`,
//         newProduct
//       );
//       setProducts([...products, response.data]);
//       setNewProduct({
//         productName: "",
//         description: "",
//         actualPrice: "",
//         sellingPrice: "",
//         discount: "0",
//         stockQuantities: [],
//         clothingType: "",
//       });
//       handleGetAllProducts();
//       setIsModalOpen(false);
//     } catch (error) {
//       setError("Error adding product. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const currentProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <VStack spacing={4} mt={4} w="full" align="stretch">
//       <Heading
//         as="h2"
//         size="xl" // Make it larger than "lg"
//         textAlign="center"
//         fontWeight="extrabold"
//         color="teal.600" // Use a color that stands out
//         background="gray.100" // Light background to highlight
//         p={2} // Padding for the background effect
//         borderRadius="md" // Round the corners slightly
//         textTransform="uppercase" // Make text uppercase for formality
//         letterSpacing="widest" // Add letter spacing
//         boxShadow="md" // Subtle shadow for a pop effect
//       >
//         Product Management
//       </Heading>

//       {loading && <Spinner size="lg" />}
//       {error && (
//         <Alert status="error">
//           <AlertIcon />
//           {error}
//         </Alert>
//       )}

//       <Flex
//         wrap="wrap"
//         align="center"
//         justify="space-between"
//         direction={{ base: "column", md: "row" }}
//         gap={4}
//       >
//         {/* Filter and Sort Options */}
//         <HStack spacing={4}>
//           <FormControl>
//             <FormLabel>Product Type</FormLabel>
//             <Select
//               value={selectedType}
//               onChange={(e) => setSelectedType(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="READYMADE">READYMADE</option>
//               <option value="UNSTITCHED">UNSTITCHED</option>
//             </Select>
//           </FormControl>

//           <FormControl>
//             <FormLabel>Sort by Name</FormLabel>
//             <Select
//               value={currentSort}
//               onChange={(e) => setCurrentSort(e.target.value)}
//             >
//               <option value={null}>None</option>
//               <option value="nameAsc">A-Z</option>
//               <option value="nameDesc">Z-A</option>
//             </Select>
//           </FormControl>

//           <FormControl>
//             <FormLabel>Sort by Quantity</FormLabel>
//             <Select
//               value={currentStockSort}
//               onChange={(e) => setCurrentStockSort(e.target.value)}
//             >
//               <option value={null}>None</option>
//               <option value="asc">Ascending</option>
//               <option value="desc">Descending</option>
//             </Select>
//           </FormControl>
//         </HStack>

//         <HStack spacing={3} wrap="wrap" justifyContent="center">
//           <Button
//             colorScheme="green"
//             leftIcon={<FaPlus />}
//             onClick={() => setIsModalOpen(true)}
//           >
//             Add Product
//           </Button>
//         </HStack>
//       </Flex>

//       <Box overflowX="auto" w="full">
//         <Table variant="simple" mt={4}>
//           <Thead>
//             <Tr>
//               <Th>Product Name</Th>
//               <Th>Product Type</Th>
//               <Th>Description</Th>
//               <Th>Selling Price</Th>
//               <Th>Stock Quantity</Th>
//               <Th>Actions</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {currentProducts.map((product) => (
//               <Tr key={product.productID}>
//                 <Td>{product.productName}</Td>
//                 <Td>{product.clothingType}</Td>
//                 <Td>{product.description}</Td>
//                 <Td>{product.sellingPrice}</Td>
//                 <Td>{product.stockQuantities.join(", ")}</Td>
//                 <Td>
//                   <IconButton
//                     icon={<HiPencilAlt />}
//                     onClick={() => handleEditProduct(product)}
//                   />
//                   <IconButton
//                     icon={<HiTrash />}
//                     onClick={() => handleDeleteProduct(product.productID)}
//                   />
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Box>

//       {/* Pagination Controls */}
//       <HStack spacing={4} mt={4}>
//         <Button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           isDisabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <Button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           isDisabled={currentPage === totalPages}
//         >
//           Next
//         </Button>
//         <Box>
//           Page {currentPage} of {totalPages}
//         </Box>
//       </HStack>

//       {/* Add Product Modal */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add New Product</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <VStack spacing={4}>
//               <FormControl>
//                 <FormLabel>Product Name</FormLabel>
//                 <Input
//                   placeholder="Product Name"
//                   value={newProduct.productName}
//                   onChange={(e) =>
//                     setNewProduct({
//                       ...newProduct,
//                       productName: e.target.value,
//                     })
//                   }
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Description</FormLabel>
//                 <Input
//                   placeholder="Description"
//                   value={newProduct.description}
//                   onChange={(e) =>
//                     setNewProduct({
//                       ...newProduct,
//                       description: e.target.value,
//                     })
//                   }
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Selling Price</FormLabel>
//                 <Input
//                   type="number"
//                   placeholder="Selling Price"
//                   value={newProduct.sellingPrice}
//                   onChange={(e) =>
//                     setNewProduct({
//                       ...newProduct,
//                       sellingPrice: parseFloat(e.target.value),
//                     })
//                   }
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Stock Quantity</FormLabel>
//                 <Input
//                   type="number"
//                   placeholder="Enter stock quantity"
//                   value={newProduct.stockQuantities}
//                   onChange={(e) =>
//                     setNewProduct({
//                       ...newProduct,
//                       stockQuantities: e.target.value.split(",").map(Number),
//                     })
//                   }
//                 />
//               </FormControl>
//               <HStack spacing={4}>
//                 <FormControl>
//                   <Checkbox
//                     isChecked={newProduct.clothingType === "READYMADE"}
//                     onChange={(e) =>
//                       setNewProduct({
//                         ...newProduct,
//                         clothingType: e.target.checked ? "READYMADE" : "",
//                       })
//                     }
//                   >
//                     Readymade
//                   </Checkbox>
//                 </FormControl>
//                 <FormControl>
//                   <Checkbox
//                     isChecked={newProduct.clothingType === "UNSTITCHED"}
//                     onChange={(e) =>
//                       setNewProduct({
//                         ...newProduct,
//                         clothingType: e.target.checked ? "UNSTITCHED" : "",
//                       })
//                     }
//                   >
//                     Unstitched
//                   </Checkbox>
//                 </FormControl>
//               </HStack>
//             </VStack>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" onClick={handleAddProduct}>
//               Add Product
//             </Button>
//             <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       {/* Edit Product Modal */}
//       {isEditing && editedProduct && (
//         <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Edit Product</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <FormControl mb={4}>
//                 <FormLabel>Product Name</FormLabel>
//                 <Input
//                   value={editedProduct.productName || ""}
//                   onChange={(e) =>
//                     setEditedProduct({
//                       ...editedProduct,
//                       productName: e.target.value,
//                     })
//                   }
//                 />
//               </FormControl>
//               <FormControl mb={4}>
//                 <FormLabel>Description</FormLabel>
//                 <Input
//                   value={editedProduct.description || ""}
//                   onChange={(e) =>
//                     setEditedProduct({
//                       ...editedProduct,
//                       description: e.target.value,
//                     })
//                   }
//                 />
//               </FormControl>
//               <FormControl mb={4}>
//                 <FormLabel>Selling Price</FormLabel>
//                 <Input
//                   type="number"
//                   value={editedProduct.sellingPrice || ""}
//                   onChange={(e) =>
//                     setEditedProduct({
//                       ...editedProduct,
//                       sellingPrice: parseFloat(e.target.value),
//                     })
//                   }
//                 />
//               </FormControl>
//               <FormControl mb={4}>
//                 <FormLabel>Stock Quantity</FormLabel>
//                 <Input
//                   type="number"
//                   value={editedProduct.stockQuantities?.[0] || ""}
//                   onChange={(e) =>
//                     setEditedProduct({
//                       ...editedProduct,
//                       stockQuantities: [parseInt(e.target.value)],
//                     })
//                   }
//                 />
//               </FormControl>
//               <FormControl mb={4}>
//                 <FormLabel>Product Type</FormLabel>{" "}
//                 <FormLabel>Product Type</FormLabel>
//                 <HStack>
//                   <Checkbox
//                     isChecked={editedProduct.clothingType === "READYMADE"}
//                     onChange={() =>
//                       setEditedProduct({
//                         ...editedProduct,
//                         clothingType: "READYMADE",
//                       })
//                     }
//                   >
//                     READYMADE
//                   </Checkbox>
//                   <Checkbox
//                     isChecked={editedProduct.clothingType === "UNSTITCHED"}
//                     onChange={() =>
//                       setEditedProduct({
//                         ...editedProduct,
//                         clothingType: "UNSTITCHED",
//                       })
//                     }
//                   >
//                     UNSTITCHED
//                   </Checkbox>
//                 </HStack>
//               </FormControl>
//             </ModalBody>
//             <ModalFooter>
//               <Button colorScheme="blue" onClick={handleSaveProduct}>
//                 Save
//               </Button>
//               <Button ml={3} onClick={() => setIsEditing(false)}>
//                 Cancel
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       )}
//     </VStack>
//   );
// };

// export default ProductManagement;
