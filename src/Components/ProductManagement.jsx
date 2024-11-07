
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
    price: "",
    actualPrice: "",
    sellingPrice: "",
    discount: "",
    stockQuantities: [],
    clothingType: "",
  });


// pagination Logic
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Adjust this value to set items per page

  // Calculate slice for current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);







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
        stockQuantities: [0],
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
      <Heading as="h2" size="lg" textAlign="center">
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
          <Button colorScheme="blue" leftIcon={<FaList/>} onClick={handleGetAllProducts}>
              Products List
          </Button>
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
