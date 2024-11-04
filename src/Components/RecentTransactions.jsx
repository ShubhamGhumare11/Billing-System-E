import React from "react";
import {
  Box,
  Text,
  List,
  ListItem,
  HStack,
  Icon,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown, FaClock } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { recentTransactions } from "../data";

// Create a Motion List Item
const MotionListItem = motion(ListItem);

const RecentTransactions = () => {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const positiveColor = useColorModeValue("green.500", "green.300");
  const negativeColor = useColorModeValue("red.500", "red.300");
  const hoverBg = useColorModeValue("gray.200", "gray.600"); // Background color on hover
  const hoverTextColor = useColorModeValue("blue.600", "blue.300"); // Text color on hover

  return (
    <Box
      p={4}
      bg={bg}
      borderRadius="md"
      border="px solid"
      borderColor="blackAlpha.300"
      boxShadow="xl"
      color={textColor}
      bgColor="red.100"
    >
      <Text fontSize="2xl" mb={4} fontWeight="bold" fontFamily="Poppins, sans-serif" color="blue.600" textAlign="center">
        Recent Transactions
      </Text>
      <List spacing={3}>
        {recentTransactions.map((transaction) => (
          <MotionListItem
            key={transaction.id}
            py={2}
            px={3}
            borderRadius="md"
            bg={useColorModeValue("gray.50", "gray.700")}
            border="1px solid"
            borderColor="blackAlpha.300"
            whileHover={{ scale: 1.05, backgroundColor: "lightgreen", color: hoverTextColor }} // Zoom effect and color change on hover
            transition={{ duration: 0.2 }} // Transition duration for the zoom effect
          >
            <HStack justify="space-between">
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="md" fontWeight="medium">
                  {transaction.customer}
                </Text>
                <HStack spacing={1} color="gray.500">
                  <Icon as={FaClock} />
                  <Text fontSize="sm">{transaction.date}</Text>
                </HStack>
              </VStack>
              <HStack spacing={2}>
                <Icon
                  as={transaction.amount > 0 ? FaArrowUp : FaArrowDown}
                  color={transaction.amount > 0 ? positiveColor : negativeColor}
                />
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color={transaction.amount > 0 ? positiveColor : negativeColor}
                >
                  ${transaction.amount.toFixed(2)}
                </Text>
              </HStack>
            </HStack>
          </MotionListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentTransactions;
