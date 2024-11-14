// SearchComponent.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Spinner, Box, List, ListItem, Text, FormLabel, FormControl } from '@chakra-ui/react';
import { debounce } from 'lodash';
import axios from 'axios';

const SearchComponent = ({ onProductSelect }) => { // Accept onProductSelect prop
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
        <Box ref={searchContainerRef} w="full" maxW="500px" mx="auto" mt={6} position="relative" mr={4}>
            <FormControl>
                <FormLabel htmlFor='search'>Search Product</FormLabel>
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
                                    onProductSelect(product); // Use the passed function to select product
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
// shivam