// ProductSelection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Input, List, ListItem } from '@chakra-ui/react';

const ProductSelection = ({ onSelect }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        // Fetch products from your backend API
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:8080/products'); // Update the endpoint as needed
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectProduct = (product) => {
        setSelectedProducts([...selectedProducts, product]);
    };

    const handleGenerateInvoice = () => {
        onSelect(selectedProducts); // Pass selected products to parent component
    };

    return (
        <Box>
            <Input placeholder="Search Products" value={searchTerm} onChange={handleSearch} />
            <List>
                {products
                    .filter((product) => product.name.includes(searchTerm)) // Assuming each product has a 'name' property
                    .map((product) => (
                        <ListItem key={product.id} onClick={() => handleSelectProduct(product)}>
                            {product.name} - ${product.price}
                        </ListItem>
                    ))}
            </List>
            <Button onClick={handleGenerateInvoice}>Generate Invoice</Button>
        </Box>
    );
};

export default ProductSelection;

