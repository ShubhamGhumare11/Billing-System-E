

// import React, { useState, useEffect, useMemo } from 'react';
// import { Input, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
// import { debounce } from 'lodash';
// import axios from 'axios';

// const SearchComponent = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Debounced function to fetch products based on search term
//   const fetchProducts = useMemo(
//     () =>
//       debounce(async (term) => {
//         setLoading(true);
//         setError(null);

//         try {
//           const response = await axios.get(`http://localhost:8080/products/search`, {
//             params: { searchCharacter: term },
//           });
//           setFilteredProducts(response.data); // Assumes the API returns an array of products
//         } catch (err) {
//           setError('Error fetching products. Please try again.');
//         } finally {
//           setLoading(false);
//         }
//       }, 300),
//     []
//   );

//   // Trigger search on term change
//   useEffect(() => {
//     if (searchTerm) {
//       fetchProducts(searchTerm);
//     } else {
//       setFilteredProducts([]);
//     }
//   }, [searchTerm, fetchProducts]);

//   return (
//     <Box
//       w={{ base: '90%', md: '80%', lg: '70%' }} // Responsive width
//       maxW="800px"
//       minH="400px"
     
    
//       p={{ base: 2, md: 4 }} // Responsive padding
      
//       mx="auto" // Center align on smaller screens
//       mt={4}
//     >
//       <Input
//         placeholder="Search products..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         mb={4}
//         size="lg" // Larger input for better accessibility
//       />

//       {loading ? (
//         <Spinner size="lg" />
//       ) : error ? (
//         <Text color="red.500">{error}</Text>
//       ) : filteredProducts.length > 0 ? (
//         <Table variant="simple" mt={4} fontSize={{ base: 'sm', md: 'md' }}> {/* Adjust font size */}
//           <Thead>
//             <Tr>
//               <Th>Product ID</Th>
//               <Th>Product Name</Th>
//               <Th>Product Type</Th>
//               <Th>Description</Th>
//               <Th>Selling Price</Th>
//               <Th>Stock Quantity</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {filteredProducts.map((product) => (
//               <Tr key={product.productID}>
//                 <Td>{product.productID}</Td>
//                 <Td>{product.productName}</Td>
//                 <Td>{product.productType}</Td>
//                 <Td>{product.description}</Td>
//                 <Td>{product.sellingPrice}</Td>
//                 <Td>{product.stockQuantity}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       ) : (
//         searchTerm && <Text>No results found.</Text>
//       )}
//     </Box>
//   );
// };

// export default SearchComponent;




// import React, { useState, useEffect, useMemo } from 'react';
// import { Input, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
// import { debounce } from 'lodash';
// import axios from 'axios';

// const SearchComponent = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Debounced function to fetch products based on search term
//   const fetchProducts = useMemo(
//     () =>
//       debounce(async (term) => {
//         setLoading(true);
//         setError(null);

//         try {
//           const response = await axios.get(`http://localhost:8080/products/search`, {
//             params: { searchCharacter: term },
//           });
//           setFilteredProducts(response.data); // Assumes the API returns an array of products
//         } catch (err) {
//           setError('Error fetching products. Please try again.');
//         } finally {
//           setLoading(false);
//         }
//       }, 300),
//     []
//   );

//   // Trigger search on term change
//   useEffect(() => {
//     if (searchTerm) {
//       fetchProducts(searchTerm);
//     } else {
//       setFilteredProducts([]);
//     }
//   }, [searchTerm, fetchProducts]);

//   return (
//     <Box
//       w={{ base: '90%', md: '80%', lg: '70%' }}
//       maxW="800px"
//       minH="400px"
//       maxH="500px" // Fixed height for consistency
//       overflowY="auto" // Enable scrolling if content exceeds max height
//       borderWidth="1px"
//       borderRadius="md"
//       boxShadow="md"
//       p={{ base: 4, md: 6 }}
//       // bg={useColorModeValue('white', 'gray.800')}
//       mx="auto" // Center align on the page
//       mt={6}
//     >
//       <Input
//         placeholder="Search products..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         mb={4}
//         size="lg"
//         variant="outline"
//         borderColor="gray.300"
//       />

//       {loading ? (
//         <Spinner size="lg" />
//       ) : error ? (
//         <Text color="red.500">{error}</Text>
//       ) : filteredProducts.length > 0 ? (
//         <Table variant="simple" mt={4} fontSize={{ base: 'sm', md: 'md' }} size="sm">
//           <Thead position="sticky" top={0} bg="gray.100" zIndex="1">
//             <Tr>
//               <Th>Product ID</Th>
//               <Th>Product Name</Th>
//               <Th>Product Type</Th>
//               <Th>Description</Th>
//               <Th>Selling Price</Th>
//               <Th>Stock Quantity</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {filteredProducts.map((product) => (
//               <Tr key={product.productID}>
//                 <Td>{product.productID}</Td>
//                 <Td>{product.productName}</Td>
//                 <Td>{product.productType}</Td>
//                 <Td>{product.description}</Td>
//                 <Td>{product.sellingPrice}</Td>
//                 <Td>{product.stockQuantity}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       ) : (
//         searchTerm && <Text>No results found.</Text>
//       )}
//     </Box>
//   );
// };

// export default SearchComponent;







import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Spinner, Box, List, ListItem, Text,FormLabel,FormControl  } from '@chakra-ui/react';
import { debounce } from 'lodash';
import axios from 'axios';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchContainerRef = useRef(null);

  // Debounced function to fetch products based on search term
  const fetchProducts = useMemo(
    () =>
      debounce(async (term) => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(`http://localhost:8080/products/search`, {
            params: { searchCharacter: term },
          });
          setFilteredProducts(response.data);
          setShowDropdown(true); // Show dropdown on successful search
        } catch (err) {
          setError('Error fetching products. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 300),
    []
  );

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Trigger search on term change
  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false); // Hide dropdown if search term is cleared
    }
  }, [searchTerm, fetchProducts]);

  return (
    <Box ref={searchContainerRef} w="full" maxW="500px" mx="auto" mt={6} position="relative"      mr={4}   >
     
  



<FormControl>
<FormLabel htmlFor='email'>Search Product</FormLabel>
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={2}
        size="lg"
        variant="outline"
        borderColor="gray.300"
      />
</FormControl>

      {loading && <Spinner size="sm" color="blue.500" position="absolute" right={4} top={3} />}

      {showDropdown && filteredProducts.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          maxH="200px"
          overflowY="auto"
          zIndex={10}
        >
          <List spacing={2}>
            {filteredProducts.map((product) => (
              <ListItem
                key={product.productID}
                p={2}
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                onClick={() => {
                  setSearchTerm(product.productName);
                  setShowDropdown(false); // Hide dropdown after selection
                }}
              >
                <Text fontWeight="medium">{product.productName}</Text>
                <Text fontSize="sm" color="gray.600">
                  {product.description}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {error && <Text color="red.500" mt={2}>{error}</Text>}
    </Box>
  );
};

export default SearchComponent;
