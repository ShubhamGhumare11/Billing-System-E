// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Box, Text, SimpleGrid, color } from "@chakra-ui/react";
// import { FaChartLine, FaCalendarAlt, FaShoppingCart, FaMoneyBillWave, FaArrowUp, FaArrowDown } from "react-icons/fa";
// import { motion } from "framer-motion"; // Import motion from framer-motion

// // Create a Motion Box for zoom effect
// const MotionBox = motion(Box);

// // SummaryBox Component with zoom and color effects on hover
// const SummaryBox = ({ icon: Icon, value, label, bgColor, borderColor }) => (
//   <MotionBox
//     bg={bgColor}
//     color="blue.900"
//     p={6}
//     borderRadius="md"
//     boxShadow="lg"
//     border={`2px solid ${borderColor}`}
//     _hover={{ bg: "yellow.100", color: "blue.700" }}
//     display="flex"
//     alignItems="center"
//     justifyContent="space-between"
//     whileHover={{ scale: 1.05 }} // Zoom effect on hover
//     transition={{ duration: 0.2 }}
//   >
//     <Icon style={{ fontSize: "24px", marginRight: "10px",color:"blue" }} />
//     <Box textAlign="right">
//       <Text fontSize="2xl" fontWeight="bold">{value}</Text>
//       <Text>{label}</Text>
//     </Box>
//   </MotionBox>
// );

// const SalesSummary = () => {
//   const [data, setData] = useState({
//     dailySales: 0,
//     monthlySales: 0,
//     yearlySales: 0,
//     totalSales: 0,
//     dailyProfit: 0,
//     monthlyProfit: 0,
//     yearlyProfit: 0,
//     totalProfit: 0,
//     dailyLoss: 0,
//     monthlyLoss: 0,
//     yearlyLoss: 0,
//     totalLoss:0
//   });

//   // Fetching data from the backend JSON API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/salesData"); // Change the URL to your actual endpoint
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching sales data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <SimpleGrid columns={[1, 2, 4]} spacing={4}>
//       <SummaryBox 
//         icon={FaChartLine} 
//         value={`$${data.dailySales}`} 
//         label="Daily Sales" 
//         bgColor="green.200" 
//         borderColor="green.600"
//       />
//       <SummaryBox 
//         icon={FaCalendarAlt} 
//         value={`$${data.monthlySales}`} 
//         label="Monthly Sales" 
//         bgColor="blue.200" 
//         borderColor="blue.600"
//       />
//       <SummaryBox 
//         icon={FaChartLine} 
//         value={`$${data.yearlySales}`} 
//         label="Yearly Sales" 
//         bgColor="purple.200" 
//         borderColor="purple.600"
//       />
//       <SummaryBox 
//         icon={FaMoneyBillWave} 
//         value={`$${data.totalSales}`} 
//         label="Total Sales" 
//         bgColor="orange.200" 
//         borderColor="orange.600"
//       />
//       <SummaryBox 
//         icon={FaMoneyBillWave} 
//         value={`$${data.dailyProfit}`} 
//         label="Daily Profit" 
//         bgColor="teal.200" 
//         borderColor="teal.600"
//       />
//       <SummaryBox 
//         icon={FaMoneyBillWave} 
//         value={`$${data.monthlyProfit}`} 
//         label="Monthly Profit" 
//         bgColor="yellow.200" 
//         borderColor="yellow.600"
//       />
//       <SummaryBox 
//         icon={FaMoneyBillWave} 
//         value={`$${data.yearlyProfit}`} 
//         label="Yearly Profit" 
//         bgColor="pink.200" 
//         borderColor="pink.600"
//       />
//       <SummaryBox 
//         icon={FaMoneyBillWave} 
//         value={`$${data.totalProfit}`} 
//         label="Total Profit" 
//         bgColor="cyan.200" 
//         borderColor="cyan.600"
//       />
//       <SummaryBox 
//         icon={FaArrowDown} 
//         value={`$${data.dailyLoss}`} 
//         label="Daily Loss" 
//         bgColor="red.200" 
//         borderColor="red.600"
//       />
//       <SummaryBox 
//         icon={FaArrowDown} 
//         value={`$${data.monthlyLoss}`} 
//         label="Monthly Loss" 
//         bgColor="orange.100" 
//         borderColor="red.700"
//       />
//       <SummaryBox 
//         icon={FaArrowDown} 
//         value={`$${data.yearlyLoss}`} 
//         label="Yearly Loss" 
//         bgColor="red.400" 
//         borderColor="red.800"
//       />
//         <SummaryBox 
//         icon={FaArrowDown} 
//         value={`$${data.totalLoss}`} 
//         label="Yearly Loss" 
//         bgColor="pink.200" 
//         borderColor="red.800"
//       />
//     </SimpleGrid>
//   );
// };

// export default SalesSummary;








import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import {
  FaChartLine,
  FaCalendarAlt,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from framer-motion

// Create a Motion Box for zoom effect
const MotionBox = motion(Box);

// SummaryBox Component with zoom and color effects on hover
const SummaryBox = ({ icon: Icon, value, label, bgColor, borderColor }) => (
  <MotionBox
    bg={bgColor}
    color="blue.900"
    p={6}
    borderRadius="md"
    boxShadow="lg"
    border={`2px solid ${borderColor}`}
    _hover={{ bg: "yellow.100", color: "blue.700" }}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    whileHover={{ scale: 1.05 }} // Zoom effect on hover
    transition={{ duration: 0.2 }}
  >
    <Icon style={{ fontSize: "24px", marginRight: "10px", color: "blue" }} />
    <Box textAlign="right">
      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
      <Text>{label}</Text>
    </Box>
  </MotionBox>
);

const SalesSummary = () => {
  const [data, setData] = useState({
    dailySales: 0,
    monthlySales: 0,
    yearlySales: 0,
    totalSales: 0,
    // dailyProfit: 0,
    // monthlyProfit: 0,
    // yearlyProfit: 0,
    // totalProfit: 0,
    // dailyLoss: 0,
    // monthlyLoss: 0,
    // yearlyLoss: 0,
    // totalLoss: 0,
  });

  // Fetching data from the backend JSON API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/salesData"); // Change the URL to your actual endpoint
        setData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <SimpleGrid columns={[1, 2, 2, 4]} spacing={4} mt={4}>
      <SummaryBox
        icon={FaChartLine}
        value={`$${data.dailySales}`}
        label="Daily Sales"
        bgColor="green.200"
        borderColor="green.600"
      />
      <SummaryBox
        icon={FaCalendarAlt}
        value={`$${data.monthlySales}`}
        label="Monthly Sales"
        bgColor="blue.200"
        borderColor="blue.600"
      />
      <SummaryBox
        icon={FaShoppingCart}
        value={`$${data.yearlySales}`}
        label="Yearly Sales"
        bgColor="purple.200"
        borderColor="purple.600"
      />
      <SummaryBox
        icon={FaMoneyBillWave}
        value={`$${data.totalSales}`}
        label="Total Sales"
        bgColor="orange.200"
        borderColor="orange.600"
      />
      {/* <SummaryBox 
        icon={FaMoneyBillWave} 
        value={`$${data.dailyProfit}`} 
        label="Daily Profit" 
        bgColor="teal.200" 
        borderColor="teal.600"
      />
      <SummaryBox 
        icon={FaMoneyBillWave} 
        value={`$${data.monthlyProfit}`} 
        label="Monthly Profit" 
        bgColor="yellow.200" 
        borderColor="yellow.600"
      />
      <SummaryBox 
        icon={FaMoneyBillWave} 
        value={`$${data.yearlyProfit}`} 
        label="Yearly Profit" 
        bgColor="pink.200" 
        borderColor="pink.600"
      />
      <SummaryBox 
        icon={FaMoneyBillWave} 
        value={`$${data.totalProfit}`} 
        label="Total Profit" 
        bgColor="cyan.200" 
        borderColor="cyan.600"
      />
      <SummaryBox 
        icon={FaArrowDown} 
        value={`$${data.dailyLoss}`} 
        label="Daily Loss" 
        bgColor="red.200" 
        borderColor="red.600"
      />
      <SummaryBox 
        icon={FaArrowDown} 
        value={`$${data.monthlyLoss}`} 
        label="Monthly Loss" 
        bgColor="orange.100" 
        borderColor="red.700"
      />
      <SummaryBox 
        icon={FaArrowDown} 
        value={`$${data.yearlyLoss}`} 
        label="Yearly Loss" 
        bgColor="red.400" 
        borderColor="red.800"
      />
        <SummaryBox 
        icon={FaArrowDown} 
        value={`$${data.totalLoss}`} 
        label="Total Loss" 
        bgColor="pink.200" 
        borderColor="red.800"
      /> */}
    </SimpleGrid>
  );
};

export default SalesSummary;