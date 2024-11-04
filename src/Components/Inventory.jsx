import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, VStack, Heading, Flex, Badge, Text, Button, Icon, useToast, 
  SimpleGrid, HStack, Menu, MenuButton, MenuList, MenuItem, ButtonGroup
} from '@chakra-ui/react';
import { FaExclamationTriangle, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const InventorySystem = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const toast = useToast();

  useEffect(() => {
    // Fetch data from JSON
    axios.get('../../products.json')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setFilteredProducts(res.data);
        } else {
          console.error("Fetched data is not an array");
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Function to filter products based on selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  // Function to display stock status based on quantity
  const getStockStatus = (quantity) => {
    if (quantity === 0) {
      return { status: 'Out of Stock', colorScheme: 'red', icon: FaExclamationTriangle };
    } else if (quantity < 15) {
      return { status: 'Low Stock', colorScheme: 'orange', icon: FaExclamationTriangle };
    }
    return { status: 'In Stock', colorScheme: 'green', icon: FaShoppingCart };
  };

  // Extract unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <Box p={6} bg="gray.100" minH="100vh">
      <Heading textAlign="center" color="blue.700" mb={8} fontFamily="Arial, sans-serif">
        POS Inventory Management
      </Heading>

      {/* Categories Navbar */}
      <Flex justify="center" mb={8}>
        <ButtonGroup variant="outline" spacing="6">
          <Button onClick={() => handleCategoryChange('')}>All</Button>
          {categories.map((category, index) => (
            <Button key={index} onClick={() => handleCategoryChange(category)}>
              {category}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>

      {/* Products Grid */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredProducts.map((product) => {
          const { status, colorScheme, icon } = getStockStatus(product.quantity);

          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={product.id}
            >
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg="white"
                shadow="md"
                color="gray.800"
                transition="0.2s"
              >
                <VStack align="stretch" spacing={3}>
                  <Flex justify="space-between" align="center">
                    <Heading size="md" color="blue.700">{product.name}</Heading>
                    <Badge colorScheme={colorScheme}>
                      <Icon as={icon} mr={1} /> {status}
                    </Badge>
                  </Flex>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Category:</strong> {product.category}
                  </Text>
                  <Text><strong>Description:</strong> {product.description}</Text>
                  <Text color="blue.800"><strong>Price:</strong> ${product.price}</Text>
                  <Text color="gray.700"><strong>Quantity:</strong> {product.quantity}</Text>

                  {/* Actions */}
                  <HStack spacing={3} pt={2}>
                    <Button colorScheme="teal" size="sm" leftIcon={<FaShoppingCart />}>
                      Add to Cart
                    </Button>
                    <Button colorScheme="yellow" size="sm" onClick={() => toast({
                      title: 'Warning',
                      description: `${product.name} is low on stock!`,
                      status: 'warning',
                      duration: 2000,
                      isClosable: true,
                    })}>
                      Restock
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </motion.div>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default InventorySystem;
