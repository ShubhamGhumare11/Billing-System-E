// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Text,
//   List,
//   ListItem,
//   HStack,
//   Icon,
//   useColorModeValue,
//   VStack,
// } from "@chakra-ui/react";
// import { FaArrowUp, FaArrowDown, FaClock } from "react-icons/fa";
// import { motion } from "framer-motion";

// const MotionListItem = motion(ListItem);

// const RecentTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const bg = useColorModeValue("white", "gray.800");
//   const textColor = useColorModeValue("black", "white");
//   const positiveColor = useColorModeValue("green.500", "green.300");
//   const negativeColor = useColorModeValue("red.500", "red.300");
//   const hoverBg = useColorModeValue("gray.200", "gray.600");
//   const hoverTextColor = useColorModeValue("blue.600", "blue.300");

//   useEffect(() => {
//     const fetchLocalTransactions = async () => {
//       try {
//         const response = await fetch("/recenttransaction.json");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const localData = await response.json();
//         return localData;
//       } catch (error) {
//         console.error("Error fetching local transactions:", error);
//         return [];
//       }
//     };

//     const fetchData = async () => {
//       const localTransactions = await fetchLocalTransactions();
//       setTransactions(localTransactions);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   return (
//     <Box
//       p={4}
//       bg={bg}
//       borderRadius="md"
//       border="px solid"
//       borderColor="blackAlpha.300"
//       boxShadow="xl"
//       color={textColor}
//     >
//       <Text fontSize="2xl" mb={4} fontWeight="bold" fontFamily="Poppins, sans-serif" color="blue.600" textAlign="center">
//         Recent Transactions
//       </Text>
//       {loading ? (
//         <Text>Loading transactions...</Text>
//       ) : (
//         <List spacing={3}>
//           {transactions.map((transaction) => (
//             <MotionListItem
//               key={transaction.id}
//               py={2}
//               px={3}
//               borderRadius="md"
//               bg={useColorModeValue("gray.50", "gray.700")}
//               border="1px solid"
//               borderColor="blackAlpha.300"
//               whileHover={{ scale: 1.05, backgroundColor: hoverBg, color: hoverTextColor }}
//               transition={{ duration: 0.2 }}
//             >
//               <HStack justify="space-between">
//                 <VStack align="flex-start" spacing={0}>
//                   <Text fontSize="md" fontWeight="medium">
//                     {transaction.customer}
//                   </Text>
//                   <HStack spacing={1} color="gray.500">
//                     <Icon as={FaClock} />
//                     <Text fontSize="sm">{transaction.date}</Text>
//                   </HStack>
//                 </VStack>
//                 <HStack spacing={2}>
//                   <Icon
//                     as={transaction.amount > 0 ? FaArrowUp : FaArrowDown}
//                     color={transaction.amount > 0 ? positiveColor : negativeColor}
//                   />
//                   <Text
//                     fontSize="lg"
//                     fontWeight="bold"
//                     color={transaction.amount > 0 ? positiveColor : negativeColor}
//                   >
//                     {/* Check if amount is defined before calling toFixed() */}
//                     ${transaction.amount != null ? transaction.amount.toFixed(2) : "N/A"}
//                   </Text>
//                 </HStack>
//               </HStack>
//             </MotionListItem>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// };

// export default RecentTransactions;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Text,
//   Input,
//   Table,
//   Tbody,
//   Tr,
//   Td,
//   Th,
//   Thead,
//   useColorModeValue,
//   VStack,
//   HStack,
// } from "@chakra-ui/react";
// import { parseISO } from "date-fns";

// const RecentTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [loading, setLoading] = useState(true);

//   const bg = useColorModeValue("white", "gray.800");
//   const textColor = useColorModeValue("black", "white");

//   const CGST_PERCENT = 18;
//   const SGST_PERCENT = 10;

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await axios.get("/recenttransaction.json");
//         setTransactions(response.data);
//         setFilteredTransactions(response.data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   useEffect(() => {
//     if (startDate && endDate) {
//       const filtered = transactions.filter((transaction) => {
//         const transactionDate = parseISO(transaction.date);
//         return (
//           transactionDate >= parseISO(startDate) && transactionDate <= parseISO(endDate)
//         );
//       });
//       setFilteredTransactions(filtered);
//     } else {
//       setFilteredTransactions(transactions);
//     }
//   }, [startDate, endDate, transactions]);

//   // Calculate total amounts for different categories
//   const totalAmount = filteredTransactions.reduce(
//     (acc, transaction) => acc + transaction.amount,
//     0
//   );

//   const paymentMethodTotals = {
//     online: filteredTransactions
//       .filter((t) =>
//         ["Bank Transfer", "Credit Card", "Debit Card", "UPI"].includes(t.paymentMethod)
//       )
//       .reduce((acc, t) => acc + t.amount, 0),
//     cash: filteredTransactions
//       .filter((t) => t.paymentMethod === "Cash")
//       .reduce((acc, t) => acc + t.amount, 0),
//   };

//   // Calculate CGST and SGST totals based on the default percentages
//   const cgstTotal = filteredTransactions.reduce(
//     (acc, t) => acc + (t.amount * CGST_PERCENT) / 100,
//     0
//   );

//   const sgstTotal = filteredTransactions.reduce(
//     (acc, t) => acc + (t.amount * SGST_PERCENT) / 100,
//     0
//   );

//   return (
//     <Box p={[2, 4, 6]} bg={bg} borderRadius="lg" boxShadow="2xl" color={textColor}>
//       <Text
//         fontSize={["lg", "xl", "2xl"]}
//         mb={6}
//         fontWeight="bold"
//         textAlign="center"
//         borderBottom="3px solid"
//         borderColor="blue.600"
//         pb={2}
//         color="blue.600"
//       >
//         Transactions
//       </Text>

//       <VStack spacing={4} align="stretch">
//         {/* Date Range Inputs */}
//         <HStack spacing={4} justify="center">
//           <Input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//           <Input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </HStack>

//         {/* Transactions Table */}
//         <Table variant="simple" mt={4}>
//           <Thead>
//             <Tr>
//               <Th>Invoice ID</Th>
//               <Th>Customer</Th>
//               <Th>Date</Th>
//               <Th>Amount</Th>
//               <Th>Payment Method</Th>
//               <Th>CGST (18%)</Th>
//               <Th>SGST (10%)</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {filteredTransactions.map((transaction) => (
//               <Tr key={transaction.invoiceId}>
//                 <Td>{transaction.invoiceId}</Td>
//                 <Td>{transaction.customer}</Td>
//                 <Td>{transaction.date}</Td>
//                 <Td>{transaction.amount.toFixed(2)}</Td>
//                 <Td>{transaction.paymentMethod}</Td>
//                 <Td>{((transaction.amount * CGST_PERCENT) / 100).toFixed(2)}</Td>
//                 <Td>{((transaction.amount * SGST_PERCENT) / 100).toFixed(2)}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>

//         {/* Summary Table */}
//         <Table variant="simple" mt={4}>
//           <Thead>
//             <Tr>
//               <Th>Total Amount</Th>
//               <Th>Online Transactions Total</Th>
//               <Th>Cash Transactions Total</Th>
//               <Th>Total CGST Amount</Th>
//               <Th>Total SGST Amount</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             <Tr>
//               <Td>{totalAmount.toFixed(2)}</Td>
//               <Td>{paymentMethodTotals.online.toFixed(2)}</Td>
//               <Td>{paymentMethodTotals.cash.toFixed(2)}</Td>
//               <Td>{cgstTotal.toFixed(2)}</Td>
//               <Td>{sgstTotal.toFixed(2)}</Td>
//             </Tr>
//           </Tbody>
//         </Table>
//       </VStack>
//     </Box>
//   );
// };

// export default RecentTransactions;







import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Input,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState("2024-11-13");
  const [endDate, setEndDate] = useState("2024-11-13");
  const [loading, setLoading] = useState(true);

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

<<<<<<< HEAD
=======
  const CGST_PERCENT = 2.5;
  const SGST_PERCENT = 2.5;

>>>>>>> 46bba553580702b479f952fe2d568c100a3cd7d1
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Replace this URL with dynamic query parameters
        const response = await axios.get(
          `http://localhost:8080/Invoice1/invoices?startDate=${startDate}&endDate=${endDate}`
        );


        console.log("API Response:", response.data);
        // Map the response to match the data structure expected by your component
        const mappedTransactions = response.data.map((invoice) => ({
          invoiceId: invoice.invoice1ID,
          invoiceNumber: invoice.invoiceNumber,
          date: invoice.invoice1Date,
          customer: invoice.customerName,
          amount: invoice.grandTotal,
          paymentMethod: invoice.paymentMethod,
          cgstAmount: invoice.cgstInRs,
          sgstAmount: invoice.sgstInRs,
          cgstPercent: invoice.cgstInPercent,
          sgstPercent: invoice.sgstInPercent,
        }));
        setTransactions(mappedTransactions);
        setFilteredTransactions(mappedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch transactions whenever date range is set
    if (startDate && endDate) fetchTransactions();
  }, [startDate, endDate]);

  // Calculate total amounts for different categories
  const totalAmount = filteredTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const paymentMethodTotals = {
    online: filteredTransactions
      // .filter((t) =>
      //   ["Bank Transfer", "Credit Card", "Debit Card", "UPI"].includes(t.paymentMethod)
      // ) 
       .filter((t) => t.paymentMethod === "Online")
      .reduce((acc, t) => acc + t.amount, 0),
    cash: filteredTransactions
      .filter((t) => t.paymentMethod === "Cash")
      .reduce((acc, t) => acc + t.amount, 0),
  };

<<<<<<< HEAD
  const cgstTotal = filteredTransactions.reduce(
    (acc, t) => acc + t.cgstAmount,
=======
  // Calculate CGST RS and SGST RS totals based Amount
  const cgstTotal = filteredTransactions.reduce(
    (acc, t) => acc + parseFloat(t.cgstIdRs), // Sum CGST Rs values
>>>>>>> 46bba553580702b479f952fe2d568c100a3cd7d1
    0
  );
  
  // Calculate total SGST Rs amount
  const sgstTotal = filteredTransactions.reduce(
<<<<<<< HEAD
    (acc, t) => acc + t.sgstAmount,
=======
    (acc, t) => acc + parseFloat(t.sgstIdRs), // Sum SGST Rs values
>>>>>>> 46bba553580702b479f952fe2d568c100a3cd7d1
    0
  );

  return (
    <Box p={[2, 4, 6]} bg={bg} borderRadius="lg" boxShadow="2xl" color={textColor}>
      <Text
        fontSize={["lg", "xl", "2xl"]}
        mb={6}
        fontWeight="bold"
        textAlign="center"
        borderBottom="3px solid"
        borderColor="blue.600"
        pb={2}
        color="blue.600"
      >
        Transactions
      </Text>

      <VStack spacing={4} align="stretch">
        {/* Date Range Inputs */}
        <HStack spacing={4} justify="center">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </HStack>

        {/* Transactions Table */}
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
           
<<<<<<< HEAD
              <Th>Invoice Number</Th>
=======
              <Th>Invoice NO </Th>
>>>>>>> 46bba553580702b479f952fe2d568c100a3cd7d1
              <Th>Customer</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Payment Method</Th>
<<<<<<< HEAD
              <Th>CGST(Rs)</Th>
              <Th>SGST(Rs)</Th>
              <Th>CGST(%)</Th>
              <Th>SGST(%)</Th>
=======
              <Th>CGST (RS)</Th>
              <Th>SGST (RS)</Th>
              <Th>CGST (%)</Th>
              <Th>SGST (%)</Th>

>>>>>>> 46bba553580702b479f952fe2d568c100a3cd7d1
            </Tr>
          </Thead>
          <Tbody>
            {filteredTransactions.map((transaction) => (
              <Tr key={transaction.invoiceId}>
<<<<<<< HEAD
               
                <Td>{transaction.invoiceNumber}</Td>
=======
                <Td>{transaction.invoiceNo}</Td>
>>>>>>> 46bba553580702b479f952fe2d568c100a3cd7d1
                <Td>{transaction.customer}</Td>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount.toFixed(2)}</Td>
                <Td>{transaction.paymentMethod}</Td>
<<<<<<< HEAD
                <Td>{transaction.cgstAmount.toFixed(2)}</Td>
                <Td>{transaction.sgstAmount.toFixed(2)}</Td>
                <Td>{transaction.cgstPercent}</Td>
                <Td>{transaction.sgstPercent}</Td>
=======
                <Td>{transaction.cgstIdRs}</Td>
                <Td>{transaction.sgstIdRs}</Td>
                <Td>{transaction.cgstIdper}</Td>
                <Td>{transaction.sgstIdper}</Td>
                <Td></Td>
>>>>>>> 46bba553580702b479f952fe2d568c100a3cd7d1
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Summary Table */}
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Total Amount</Th>
              <Th>Online Transactions Total</Th>
              <Th>Cash Transactions Total</Th>
              <Th>Total CGST Amount</Th>
              <Th>Total SGST Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{totalAmount.toFixed(2)}</Td>
              <Td>{paymentMethodTotals.online.toFixed(2)}</Td>
              <Td>{paymentMethodTotals.cash.toFixed(2)}</Td>
              <Td>{cgstTotal}</Td>
              <Td>{sgstTotal}</Td>
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default RecentTransactions;
