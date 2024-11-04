import React from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { FaChartLine, FaCalendarAlt, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import salesData from "../data";
import { motion } from "framer-motion"; // Import motion from framer-motion

// Create a Motion Box for zoom effect
const MotionBox = motion(Box);

const SummaryBox = ({ icon: Icon, value, label, bgColor, borderColor }) => (
  <MotionBox
    bg={bgColor}
    color="black"
    p={6}
    borderRadius="md"
    boxShadow="md"
    border={`2px solid ${borderColor}`} // Apply custom border color
    _hover={{ bg: "green.100", color: "blue.700" }} // Adjust hover effect
    display="flex"
    alignItems="center"
    whileHover={{ scale: 1.05 }} // Zoom effect on hover
    transition={{ duration: 0.2 }} // Transition duration for the zoom effect
  >
    <Icon style={{ marginRight: "8px", fontSize: "24px", color: "blue" }} />
    <Box>
      <Text fontSize="xl">{value}</Text>
      <Text>{label}</Text>
    </Box>
  </MotionBox>
);

const SalesSummary = () => {
  const {
    dailySales,
    monthlySales,
    totalTransactions,
    yearlySales,
    profitInYear,
    totalProfit, // Add totalProfit from salesData
  } = salesData;

  return (
    <SimpleGrid columns={3} spacing={4}>
      <SummaryBox 
        icon={FaChartLine} 
        value={`$${dailySales}`} 
        label="Daily Sales" 
        bgColor="green.200" 
        borderColor="green.600"
      />
      <SummaryBox 
        icon={FaCalendarAlt} 
        value={`$${monthlySales}`} 
        label="Monthly Sales" 
        bgColor="blue.200" 
        borderColor="blue.600"
      />
      <SummaryBox 
        icon={FaShoppingCart} 
        value={totalTransactions} 
        label="Total Transactions" 
        bgColor="orange.200" 
        borderColor="orange.600"
      />
      <SummaryBox 
        icon={FaChartLine} 
        value={`$${yearlySales}`} 
        label="Yearly Sales" 
        bgColor="purple.200" 
        borderColor="purple.600"
      />
      <SummaryBox 
        icon={FaMoneyBillWave} 
        value={`$${profitInYear}`} 
        label="Profit in Year" 
        bgColor="red.200" 
        borderColor="red.600"
      />
      <SummaryBox 
        icon={FaMoneyBillWave} 
        value={`$${totalProfit}`} 
        label="Total Profit" 
        bgColor="teal.200" 
        borderColor="teal.600"
      /> {/* New SummaryBox for Total Profit */}
    </SimpleGrid>
  );
};

export default SalesSummary;
