// import React, { useState } from 'react';
// import { Button, HStack, VStack, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, Input, Box } from '@chakra-ui/react';
// const dummyProducts = [
//   {
//     productID: 1,
//     productName: 'Formal Trousers',
//     description: 'A readymade item with a higher price and stock of 15 units.',
//     price: 700,
//     actualPrice: 800,
//     sellingPrice: 750,
//     discount: 50,
//     stockQuantity: 15,
//     productType: 'READYMADE',
//   },
//   {
//     productID: 2,
//     productName: 'Silk Saree',
//     description: 'A premium readymade item, expensive but with a lower stock of 10 units.',
//     price: 1500,
//     actualPrice: 1800,
//     sellingPrice: 1600,
//     discount: 200,
//     stockQuantity: 10,
//     productType: 'READYMADE',
//   },
//   {
//     productID: 3,
//     productName: 'Cotton Fabric',
//     description: 'A meter-based unstitched item with a stock of 200 meters.',
//     price: 100,
//     actualPrice: 120,
//     sellingPrice: 110,
//     discount: 10,
//     stockQuantity: 200,
//     productType: 'UNSTITCHED',
//   },
//   {
//     productID: 4,
//     productName: 'Jeans',
//     description: 'Another readymade clothing item with a reasonable stock of 25.',
//     price: 1200,
//     actualPrice: 1500,
//     sellingPrice: 1300,
//     discount: 200,
//     stockQuantity: 25,
//     productType: 'READYMADE',
//   },
//   {
//     productID: 5,
//     productName: 'Linen Fabric',
//     description: 'A breathable unstitched fabric available in 150 meters.',
//     price: 150,
//     actualPrice: 180,
//     sellingPrice: 160,
//     discount: 20,
//     stockQuantity: 150,
//     productType: 'UNSTITCHED',
//   },
//   {
//     productID: 6,
//     productName: 'T-Shirt',
//     description: 'A casual wear readymade item with a stock of 30.',
//     price: 300,
//     actualPrice: 400,
//     sellingPrice: 350,
//     discount: 50,
//     stockQuantity: 30,
//     productType: 'READYMADE',
//   },
//   {
//     productID: 7,
//     productName: 'Georgette Fabric',
//     description: 'A soft fabric sold by the meter, with 80 meters in stock.',
//     price: 200,
//     actualPrice: 250,
//     sellingPrice: 220,
//     discount: 30,
//     stockQuantity: 80,
//     productType: 'UNSTITCHED',
//   },
//   {
//     productID: 8,
//     productName: 'Kurtas',
//     description: 'Traditional wear, a popular readymade item.',
//     price: 800,
//     actualPrice: 1000,
//     sellingPrice: 900,
//     discount: 100,
//     stockQuantity: 20,
//     productType: 'READYMADE',
//   },
//   // Additional dummy products can be added here
// ];

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [isProductListVisible, setIsProductListVisible] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false); // New state to control form visibility
//   const [editableProductID, setEditableProductID] = useState(null); // New state for editable product

//   const [newProduct, setNewProduct] = useState({
//     productName: '',
//     description: '',
//     price: '',
//     actualPrice: '',
//     sellingPrice: '',
//     discount: '',
//     stockQuantity: '',
//     productType: '' // default value
//   });

//   const handleGetAllProducts = () => {
//     setProducts(dummyProducts);
//     setIsProductListVisible(true);
//     setIsFormVisible(false)
//   };

//   const handleDeleteProduct = (productID) => {
//     const updatedProducts = products.filter(product => product.productID !== productID);
//     setProducts(updatedProducts);
//   };

//   const handleEditProduct = (productID) => {
//     setEditableProductID(productID);
//     alert(`Edit product with ID: ${productID}`);
//   };

//   const handleAddProduct = () => {
//     setIsFormVisible(true); 
// setIsProductListVisible(false)
//     const newProductData = {
//       ...newProduct,
//       productID: products.length + 1, // Increment product ID
//       stockQuantity: Number(newProduct.stockQuantity), // Convert to number
//     };

//     setProducts([...products, newProductData]);
//     setNewProduct({ productName: '', description: '', price: '', actualPrice: '', sellingPrice: '', discount: '', stockQuantity: '', productType: '' });

//   };

//   return (
//     <VStack spacing={4} mt={4}>
//       <HStack spacing={4}>
//         <Button colorScheme="teal" onClick={handleAddProduct}>Add Product</Button>
//         <Button colorScheme="blue" onClick={handleGetAllProducts}>Get All Products</Button>
       
//       </HStack>

//       {/* Add Product Form */}
//       {isFormVisible &&  (
//       <Box mt={4} p={4} borderWidth={1} borderRadius="md" width="100%">
//         <FormControl>
//           <FormLabel>Product Name</FormLabel>
//           <Input value={newProduct.productName} onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })} placeholder="Enter product name" />
          
//           <FormLabel mt={4}>Description</FormLabel>
//           <Input value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Enter product description" />
          
//           <FormLabel mt={4}>Price</FormLabel>
//           <Input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Enter product price" />
          
//           <FormLabel mt={4}>Actual Price</FormLabel>
//           <Input type="number" value={newProduct.actualPrice} onChange={(e) => setNewProduct({ ...newProduct, actualPrice: e.target.value })} placeholder="Enter actual price" />
          
//           <FormLabel mt={4}>Selling Price</FormLabel>
//           <Input type="number" value={newProduct.sellingPrice} onChange={(e) => setNewProduct({ ...newProduct, sellingPrice: e.target.value })} placeholder="Enter selling price" />
          
//           <FormLabel mt={4}>Discount</FormLabel>
//           <Input type="number" value={newProduct.discount} onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })} placeholder="Enter discount" />
          
//           <FormLabel mt={4}>Stock Quantity</FormLabel>
//           <Input type="number" value={newProduct.stockQuantity} onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })} placeholder="Enter stock quantity" />
          
//           <FormLabel mt={4}>Product Type</FormLabel>
//           <select value={newProduct.productType} onChange={(e) => setNewProduct({ ...newProduct, productType: e.target.value })}>
//             <option value="READMADE">Readymade</option>
//             <option value="UNSTITCHED">Unstitched</option>
//           </select>
//         </FormControl>

//         <Button colorScheme="teal" mt={4} onClick={handleAddProduct}>Add Product</Button>
//       </Box>
//       )}

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
//             {products.map(product => (
//               <Tr key={product.productID}>
//                 <Td>{product.productID}</Td>
//                 <Td>{product.productName}</Td>
//                 <Td>{product.productType}</Td>

//                 <Td>{product.description}</Td>
//                 <Td>{product.sellingPrice}</Td>
//                 <Td>{product.stockQuantity}</Td>
//                 <Td>
//                   <Button colorScheme="yellow" onClick={() => handleEditProduct(product.productID)}>Edit</Button>
//                   <Button colorScheme="red" onClick={() => handleDeleteProduct(product.productID)}>Delete</Button>
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


import React, { useState } from 'react';
import { Button, HStack, VStack, Table, Thead, Tbody, Tr, Th, Td, Checkbox,FormControl, FormLabel, Input, Box } from '@chakra-ui/react';
import SearchComponent from './SearchComponent';
const dummyProducts = [
  {
    productID: 1,
    productName: 'Formal Trousers',
    description: 'A readymade item with a higher price and stock of 15 units.',
    price: 700,
    actualPrice: 800,
    sellingPrice: 750,
    discount: 50,
    stockQuantity: 15,
    productType: 'READYMADE',
  },
  {
    productID: 2,
    productName: 'Silk Saree',
    description: 'A premium readymade item, expensive but with a lower stock of 10 units.',
    price: 1500,
    actualPrice: 1800,
    sellingPrice: 1600,
    discount: 200,
    stockQuantity: 10,
    productType: 'READYMADE',
  },
  {
    productID: 3,
    productName: 'Cotton Fabric',
    description: 'A meter-based unstitched item with a stock of 200 meters.',
    price: 100,
    actualPrice: 120,
    sellingPrice: 110,
    discount: 10,
    stockQuantity: 200,
    productType: 'UNSTITCHED',
  },
  {
    productID: 4,
    productName: 'Jeans',
    description: 'Another readymade clothing item with a reasonable stock of 25.',
    price: 1200,
    actualPrice: 1500,
    sellingPrice: 1300,
    discount: 200,
    stockQuantity: 25,
    productType: 'READYMADE',
  },
  {
    productID: 5,
    productName: 'Linen Fabric',
    description: 'A breathable unstitched fabric available in 150 meters.',
    price: 150,
    actualPrice: 180,
    sellingPrice: 160,
    discount: 20,
    stockQuantity: 150,
    productType: 'UNSTITCHED',
  },
  {
    productID: 6,
    productName: 'T-Shirt',
    description: 'A casual wear readymade item with a stock of 30.',
    price: 300,
    actualPrice: 400,
    sellingPrice: 350,
    discount: 50,
    stockQuantity: 30,
    productType: 'READYMADE',
  },
  {
    productID: 7,
    productName: 'Georgette Fabric',
    description: 'A soft fabric sold by the meter, with 80 meters in stock.',
    price: 200,
    actualPrice: 250,
    sellingPrice: 220,
    discount: 30,
    stockQuantity: 80,
    productType: 'UNSTITCHED',
  },
  {
    productID: 8,
    productName: 'Kurtas',
    description: 'Traditional wear, a popular readymade item.',
    price: 800,
    actualPrice: 1000,
    sellingPrice: 900,
    discount: 100,
    stockQuantity: 20,
    productType: 'READYMADE',
  },
  // Additional dummy products can be added here
];

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isProductListVisible, setIsProductListVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // New state to control form visibility
  const [editableProductID, setEditableProductID] = useState(null); // New state for editable product
  const [searchdedProducts, setSearchedProducts] = useState([]); // New state for editable product

  const [newProduct, setNewProduct] = useState({
    productName: '',
    description: '',
    price: '',
    actualPrice: '',
    sellingPrice: '',
    discount: '',
    stockQuantity: '',
    productType: '' // default value
  });

  const handleGetAllProducts = () => {
    setProducts(dummyProducts);
    setIsProductListVisible(true);
    setIsFormVisible(false)
  };

  const handleDeleteProduct = (productID) => {
    const updatedProducts = products.filter(product => product.productID !== productID);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (productID) => {
    setEditableProductID(productID);
    // alert(`Edit product with ID: ${productID}`);
  };

  const handleAddProduct = () => {
    setIsFormVisible(true); 
setIsProductListVisible(false)
    const newProductData = {
      ...newProduct,
      productID: products.length + 1, // Increment product ID
      stockQuantity: Number(newProduct.stockQuantity), // Convert to number
    };

    setProducts([...products, newProductData]);
    setNewProduct({ productName: '', description: '', price: '', actualPrice: '', sellingPrice: '', discount: '', stockQuantity: '', productType: '' });

  };


    



  return (
    <VStack spacing={4} mt={4}>
      <HStack spacing={4}>
        <Button colorScheme="teal" onClick={handleAddProduct}>Add Product</Button>
        <Button colorScheme="blue" onClick={handleGetAllProducts}>Get All Products</Button>
        <SearchComponent  />
      </HStack>

      {/* Add Product Form */}
      {isFormVisible &&  (
      <Box mt={4} p={4} borderWidth={1} borderRadius="md" width="100%">
        <FormControl>
        <HStack spacing={4}>
  <FormControl>
    <Checkbox 
      isChecked={newProduct.productType === 'READMADE'} 
      onChange={(e) => {
        const isChecked = e.target.checked;
        setNewProduct((prev) => ({
          ...prev,
          productType: isChecked ? 'READMADE' : prev.productType === 'READMADE' ? '' : prev.productType,
          stockQuantity: isChecked ? prev.stockQuantity : '', // Reset stock quantity when unchecked
        }));
      }}
    >
      Readymade
    </Checkbox>
  </FormControl>
  
  <FormControl>
    <Checkbox 
      isChecked={newProduct.productType === 'UNSTITCHED'} 
      onChange={(e) => {
        const isChecked = e.target.checked;
        setNewProduct((prev) => ({
          ...prev,
          productType: isChecked ? 'UNSTITCHED' : prev.productType === 'UNSTITCHED' ? '' : prev.productType,
          stockQuantity: isChecked ? prev.stockQuantity : '', // Reset stock quantity when unchecked
        }));
      }}
    >
      Unstitched
    </Checkbox>
  </FormControl>
</HStack>
          <FormLabel>Product Name</FormLabel>
          <Input value={newProduct.productName} onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })} placeholder="Enter product name" />
          
          <FormLabel mt={4}>Description</FormLabel>
          <Input value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Enter product description" />
          
          <FormLabel mt={4}>Price</FormLabel>
          <Input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Enter product price" />
          
          <FormLabel mt={4}>Actual Price</FormLabel>
          <Input type="number" value={newProduct.actualPrice} onChange={(e) => setNewProduct({ ...newProduct, actualPrice: e.target.value })} placeholder="Enter actual price" />
          
          <FormLabel mt={4}>Selling Price</FormLabel>
          <Input type="number" value={newProduct.sellingPrice} onChange={(e) => setNewProduct({ ...newProduct, sellingPrice: e.target.value })} placeholder="Enter selling price" />
          
          <FormLabel mt={4}>Discount</FormLabel>
          <Input type="number" value={newProduct.discount} onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })} placeholder="Enter discount" />
          
          {newProduct.productType && (
  <>
    <FormLabel mt={4}>
      {newProduct.productType === 'UNSTITCHED' ? 'Stock Quantity (In meters)' : 'Stock Quantity'}
    </FormLabel>
    <Input
      type="number"
      value={newProduct.stockQuantity}
      onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
      placeholder={`Enter stock quantity (${newProduct.productType === 'UNSTITCHED' ? 'meters' : 'units'})`}
    />
  </>
)}


          {/* <FormLabel mt={4}>Stock Quantity</FormLabel>
          <Input type="number" value={newProduct.stockQuantity} onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })} placeholder="Enter stock quantity" /> */}
          
          {/* <FormLabel mt={4}>Product Type</FormLabel>
          <select value={newProduct.productType} onChange={(e) => setNewProduct({ ...newProduct, productType: e.target.value })}>
            <option value="READMADE">Readymade</option>
            <option value="UNSTITCHED">Unstitched</option>
          </select> */}
        </FormControl>

        <Button colorScheme="teal" mt={4} onClick={handleAddProduct}>Add Product</Button>
      </Box>
      )}

      {isProductListVisible && (
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
              <Tr key={product.productID} onClick={() => handleEditProduct(product.productID)}>
                <Td>{product.productID}</Td>
                <Td>
                  {editableProductID === product.productID ? (
                    <Input
                      value={product.productName}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.productID === product.productID ? { ...p, productName: e.target.value } : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  ) : (
                    product.productName
                  )}
                </Td>
                <Td>{product.productType}</Td>
                <Td>
                  {editableProductID === product.productID ? (
                    <Input
                      value={product.description}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.productID === product.productID ? { ...p, description: e.target.value } : p
                        );
                        setProducts(updatedProducts);
                      }}
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
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.productID === product.productID ? { ...p, sellingPrice: Number(e.target.value) } : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  ) : (
                    product.sellingPrice
                  )}
                </Td>
                <Td>
                  {editableProductID === product.productID ? (
                    <Input
                      type="number"
                      value={product.stockQuantity}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.productID === product.productID ? { ...p, stockQuantity: Number(e.target.value) } : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  ) : (
                    product.stockQuantity
                  )}
                </Td>
                <Td>
                  {editableProductID === product.productID ? (
                    <Button colorScheme="green" onClick={() => handleSaveEdit(product.productID)}>Save</Button>
                  ) : (
                    <>
                      <Button colorScheme="yellow" onClick={() => handleEditProduct(product.productID)}>Edit</Button>
                      <Button colorScheme="red" onClick={() => handleDeleteProduct(product.productID)}>Delete</Button>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </VStack>
  );
};

export default ProductManagement;
