// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

// const CustomerList = ({ onSelect }) => {
//   const [customers, setCustomers] = useState([]);

//         //   useEffect(() => {
//         //     const fetchCustomers = async () => {
//         //       const response = await axios.get('/api/customers'); // Adjust the endpoint as needed
//         //       setCustomers(response.data);
//         //     };
//         //     fetchCustomers();
//         //   }, []);

//   return (
//     <Box>
//       <Table>
//         <Thead>
//           <Tr>
//             <Th>Customer ID</Th>
//             <Th>First Name</Th>
//             <Th>Last Name</Th>
//             <Th>Email</Th>
//             <Th>Phone</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {customers.map((customer) => (
//             <Tr key={customer.customerID}>
//               <Td>{customer.customerID}</Td>
//               <Td>{customer.firstName}</Td>
//               <Td>{customer.lastName}</Td>
//               <Td>{customer.email}</Td>
//               <Td>{customer.phone}</Td>
//               <Td>
//                 <Button onClick={() => onSelect(customer)}>Select</Button>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// };

// export default CustomerList;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import CreateCustomer from './CreateCustomer';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     const response = await axios.get('/api/customers'); // Adjust the endpoint as needed
  //     setCustomers(response.data);
  //   };
  //   fetchCustomers();
  // }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleOpenModal} colorScheme="teal" mb={4}>
        Add Customer
      </Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Customer ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => (
            <Tr key={customer.customerID}>
              <Td>{customer.customerID}</Td>
              <Td>{customer.firstName}</Td>
              <Td>{customer.lastName}</Td>
              <Td>{customer.email}</Td>
              <Td>{customer.phone}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <CreateCustomer isOpen={isOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default CustomerList;
