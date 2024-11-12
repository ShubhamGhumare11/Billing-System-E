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
  IconButton,
  Tooltip,
  Tag,Text,
} from "@chakra-ui/react";
import axios from "axios";
import SearchComponent from "./SearchComponent";
import { FaPlus, FaList } from "react-icons/fa";
import { HiSave, HiPencilAlt, HiTrash } from "react-icons/hi";

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [isProductListVisible, setIsProductListVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editableProductID, setEditableProductID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [loading, setLoading] = useState(true);

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
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/products/getAll"
        );

        console.log("GetAll products......" + response.data.object);

        const data = await response.data.object;
        setProducts(data);
        setIsProductListVisible(true);
        console.log("GetAll products......" + data.Object);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  // Helper function for stock status tag color and responsive size
  const getStockTag = (stockQuantities) => {
    const responsiveSize = {
      // fontSize: ["sm", "sm", "sm"], // Responsive font sizes
      // padding: ["0.2rem", "0.3rem", "0.5rem"], // Responsive padding

      fontSize: ["xs", "sm", "xs"], // Small font sizes for responsiveness
      paddingX: ["0.2rem", "0.4rem", "0.9rem"], // Horizontal padding for compact styling
      paddingY: ["0.1rem", "0.2rem", "0.2rem"], // Vertical padding for compact styling
      whiteSpace: "nowrap",
    };

    if (stockQuantities <= 0) {
      return (
        <Tag colorScheme="red" {...responsiveSize}>
          Out of Stock
        </Tag>
      );
    }
    if (stockQuantities < 50) {
      return (
        <Tag colorScheme="yellow" {...responsiveSize}>
          Low Stock
        </Tag>
      );
    }
    return (
      <Tag colorScheme="green" {...responsiveSize}>
        In Stock
      </Tag>
    );
  };

  return (
    <VStack spacing={4} mt={4} w="full" align="stretch">
      <Heading
        as="h2"
        size="lg" // Make it larger than "lg"
        textAlign="center"
        fontWeight="extrabold"
        color="teal.600" // Use a color that stands out
        background="gray.100" // Light background to highlight
        p={2} // Padding for the background effect
        borderRadius="md" // Round the corners slightly
        textTransform="uppercase" // Make text uppercase for formality
        letterSpacing="widest" // Add letter spacing
        boxShadow="sm" // Subtle shadow for a pop effect
      >
        Stock Management
      </Heading>

      {/* geAll productLIst */}
      {isProductListVisible && (
        <Flex direction="column" height="100%">
          {loading ? (
            <Flex justifyContent="center" alignItems="center" height="60vh">
              <Spinner size="xl" label="Loading products..." />
            </Flex>
          ) : (
            <Box flex="1" overflowY="auto">
              <Table variant="striped" colorScheme="gray" size="xs" mt={4}>
                <Thead bg="teal.200">
                  <Tr   >
                    {/* <Th>Product ID</Th> */}
                    <Th p="2" fontSize="sm">Product Name</Th>
                    <Th p="2" fontSize="sm">Product Type</Th>
                    <Th p="2" fontSize="sm">Description</Th>
                    <Th p="2" fontSize="sm">Selling Price</Th>
                    <Th p="2" fontSize="sm"> In Stock </Th>
                    <Th p="2" fontSize="sm"> Status </Th>
                    <Th p="2" fontSize="sm">Actions</Th>
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

                      <Td  p="2" fontSize="xs">
                        {editableProductID === product.productID ? (
                          <Input
                           size="xs"
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

                      <Td  p="2" fontSize="xs">
                        {editableProductID === product.productID ? (
                          <VStack spacing={4}>
                            <Checkbox
                              isChecked={product.clothingType === "READYMADE"}
                              size="sm"
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
                              size="sm"
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
                          <Text fontSize="xs">{product.clothingType}</Text>
                        )}
                      </Td>

                      <Td  p="2" fontSize="xs">
                        {editableProductID === product.productID ? (
                          <Input
                            size="xs"
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
                          <Text fontSize="xs">{ product.description}</Text>
                         
                        )}
                      </Td>

                      <Td  p="2" fontSize="xs">
                        {editableProductID === product.productID ? (
                          <Input  size="xs"
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
                          <Text fontSize="xs">{  product.sellingPrice}</Text>
                        
                        )}
                      </Td>

                      <Td  p="2" fontSize="xs">
                        {editableProductID === product.productID ? (
                          <Input  size="xs"
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

                      <Td  p="2" fontSize="xs">{getStockTag(product.stockQuantities)}</Td>

                      <Td  p="2" fontSize="xs">
                        <HStack spacing={2}>
                          <Tooltip
                            label="Save changes"
                            aria-label="Save Tooltip"
                          >
                            <IconButton
                              aria-label="Save"
                              icon={<HiSave />}
                                size="xs"
                              colorScheme="green"
                              onClick={() => handleSaveEdit(product.productID)}
                            />
                          </Tooltip>

                          <Tooltip
                            label="Edit product"
                            aria-label="Edit Tooltip"
                          >
                            <IconButton
                              aria-label="Edit"
                                size="xs"
                              icon={<HiPencilAlt />}
                              colorScheme="yellow"
                              onClick={() =>
                                handleEditProduct(product.productID)
                              }
                            />
                          </Tooltip>

                          <Tooltip
                            label="Delete product"
                            aria-label="Delete Tooltip"
                          >
                            <IconButton
                              aria-label="Delete"
                                size="xs"
                              icon={<HiTrash />}
                              colorScheme="red"
                              onClick={() =>
                                handleDeleteProduct(product.productID)
                              }
                            />
                          </Tooltip>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
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
                  size="sm"
              >
                Prev
              </Button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                    size="sm"
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                  size="sm"
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

export default StockManagement;
