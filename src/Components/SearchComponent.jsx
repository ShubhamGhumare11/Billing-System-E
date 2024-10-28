// import React, { useState } from 'react';
// import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton, HStack,VStack } from '@chakra-ui/react';
// import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

// const SearchComponent = ({ onSearch }) => {
//   const [query, setQuery] = useState('');

//   const handleSearch = () => {
//     onSearch(query);
//   };

//   const handleClear = () => {
//     setQuery('');
//     onSearch(''); // Optionally trigger a clear search
//   };

//   return (
//     <HStack spacing="1rem" align="start" w="full" px="1rem">
//       <InputGroup size="lg">
//         <InputLeftElement pointerEvents="none">
//           <SearchIcon color="gray.500" fontSize="1.2rem" />
//         </InputLeftElement>
//         <Input
//           placeholder="Search products..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           fontSize="1rem"
//           px="1rem"
//           pr="2.5rem"
//           borderRadius="0.5rem"
//           _placeholder={{ color: 'gray.400' }}
//         />
//         {query && (
//           <InputRightElement width="2.5rem">
//             <IconButton
//               aria-label="Clear search"
//               icon={<CloseIcon />}
//               size="sm"
//               colorScheme="red"
//               variant="ghost"
//               fontSize="1rem"
//               onClick={handleClear}
//             />
//           </InputRightElement>
//         )}
//       </InputGroup>
//       <IconButton
//         onClick={handleSearch}
//         icon={<SearchIcon />}
//         colorScheme="teal"
//         size="lg"
//         alignSelf="end"
//         fontSize="1.2rem"
//         p="0.5rem"
//       />
//     </HStack>
//   );
// };

// export default SearchComponent;




import React, { useState, useEffect, useMemo } from 'react';
import { Input, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { debounce } from 'lodash';
import axios from 'axios';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced function to fetch products based on search term
  const fetchProducts = useMemo(
    () =>
      debounce(async (term) => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(`/api/products/search`, {
            params: { query: term },
          });
          setFilteredProducts(response.data); // Assumes the API returns an array of products
        } catch (err) {
          setError('Error fetching products. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 300),
    []
  );

  // Trigger search on term change
  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, fetchProducts]);

  return (
    <Box>
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />

      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : filteredProducts.length > 0 ? (
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Product ID</Th>
              <Th>Product Name</Th>
              <Th>Product Type</Th>
              <Th>Description</Th>
              <Th>Selling Price</Th>
              <Th>Stock Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredProducts.map((product) => (
              <Tr key={product.productID}>
                <Td>{product.productID}</Td>
                <Td>{product.productName}</Td>
                <Td>{product.productType}</Td>
                <Td>{product.description}</Td>
                <Td>{product.sellingPrice}</Td>
                <Td>{product.stockQuantity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        searchTerm && <Text>No results found.</Text>
      )}
    </Box>
  );
};

export default SearchComponent;
