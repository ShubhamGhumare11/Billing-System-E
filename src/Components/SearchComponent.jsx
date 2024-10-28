import React, { useState } from 'react';
import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton, VStack } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

const SearchComponent = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch(''); // Optionally trigger a clear search
  };

  return (
    <VStack spacing="1rem" align="start" w="full" px="1rem">
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" fontSize="1.2rem" />
        </InputLeftElement>
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fontSize="1rem"
          px="1rem"
          pr="2.5rem"
          borderRadius="0.5rem"
          _placeholder={{ color: 'gray.400' }}
        />
        {query && (
          <InputRightElement width="2.5rem">
            <IconButton
              aria-label="Clear search"
              icon={<CloseIcon />}
              size="sm"
              colorScheme="red"
              variant="ghost"
              fontSize="1rem"
              onClick={handleClear}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <IconButton
        onClick={handleSearch}
        icon={<SearchIcon />}
        colorScheme="teal"
        size="lg"
        alignSelf="end"
        fontSize="1.2rem"
        p="0.5rem"
      />
    </VStack>
  );
};

export default SearchComponent;
