
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Box, Text, SimpleGrid } from "@chakra-ui/react";
// import {
//   FaChartLine,
//   FaCalendarAlt,
//   FaShoppingCart,
//   FaMoneyBillWave,
// } from "react-icons/fa";
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
//     <Icon style={{ fontSize: "24px", marginRight: "10px", color: "blue" }} />
//     <Box textAlign="right">
//       <Text fontSize="2xl" fontWeight="bold">
//         {value}
//       </Text>
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
//     <SimpleGrid columns={[1, 2, 2, 4]} spacing={4} mt={4}>
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
//         icon={FaShoppingCart}
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
     
//     </SimpleGrid>
//   );
// };

// export default SalesSummary;






import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { FaChartLine, FaCalendarAlt, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

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
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <Icon style={{ fontSize: "24px", marginRight: "10px", color: "blue" }} />
    <Box textAlign="right">
      <Text fontSize="2xl" fontWeight="bold">
        {value !== undefined ? `$${value}` : "Loading..."}
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
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const [dailyResponse, monthlyResponse, yearlyResponse, totalResponse] = await Promise.all([
          axios.get("http://localhost:8080/sell/AllSubtotals", { params: { period: "daily" } }),
          axios.get("http://localhost:8080/sell/AllSubtotals", { params: { period: "monthly" } }),
          axios.get("http://localhost:8080/sell/AllSubtotals", { params: { period: "yearly" } }),
          axios.get("http://localhost:8080/sell/AllSubtotals", { params: { period: "all" } }),
        ]);

        console.log("Responses:", {
          daily: dailyResponse.data,
          monthly: monthlyResponse.data,
          yearly: yearlyResponse.data,
          total: totalResponse.data,
        });

        setData({
          dailySales: dailyResponse.data.object[0],
          monthlySales: monthlyResponse.data.object[0],
          yearlySales: yearlyResponse.data.object,
          totalSales: totalResponse.data.object[0],
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <SimpleGrid columns={[1, 2, 2, 4]} spacing={4} mt={4}>
      <SummaryBox
        icon={FaChartLine}
        value={data.dailySales}
        label="Daily Sales"
        bgColor="green.200"
        borderColor="green.600"
      />
      <SummaryBox
        icon={FaCalendarAlt}
        value={data.monthlySales}
        label="Monthly Sales"
        bgColor="blue.200"
        borderColor="blue.600"
      />
      <SummaryBox
        icon={FaShoppingCart}
        value={data.yearlySales}
        label="Yearly Sales"
        bgColor="purple.200"
        borderColor="purple.600"
      />
      <SummaryBox
        icon={FaMoneyBillWave}
        value={data.totalSales}
        label="Total Sales"
        bgColor="orange.200"
        borderColor="orange.600"
      />
    </SimpleGrid>
  );
};

export default SalesSummary;
