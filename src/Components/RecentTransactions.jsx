import React, { useEffect, useState } from "react";
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
import { motion } from "framer-motion";

const MotionListItem = motion(ListItem);

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const positiveColor = useColorModeValue("green.500", "green.300");
  const negativeColor = useColorModeValue("red.500", "red.300");
  const hoverBg = useColorModeValue("gray.200", "gray.600");
  const hoverTextColor = useColorModeValue("blue.600", "blue.300");

  useEffect(() => {
    const fetchLocalTransactions = async () => {
      try {
        const response = await fetch("/recenttransaction.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const localData = await response.json();
        return localData;
      } catch (error) {
        console.error("Error fetching local transactions:", error);
        return [];
      }
    };

    const fetchData = async () => {
      const localTransactions = await fetchLocalTransactions();
      setTransactions(localTransactions);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Box
      p={4}
      bg={bg}
      borderRadius="md"
      border="px solid"
      borderColor="blackAlpha.300"
      boxShadow="xl"
      color={textColor}
    >
      <Text fontSize="2xl" mb={4} fontWeight="bold" fontFamily="Poppins, sans-serif" color="blue.600" textAlign="center">
        Recent Transactions
      </Text>
      {loading ? (
        <Text>Loading transactions...</Text>
      ) : (
        <List spacing={3}>
          {transactions.map((transaction) => (
            <MotionListItem
              key={transaction.id}
              py={2}
              px={3}
              borderRadius="md"
              bg={useColorModeValue("gray.50", "gray.700")}
              border="1px solid"
              borderColor="blackAlpha.300"
              whileHover={{ scale: 1.05, backgroundColor: hoverBg, color: hoverTextColor }}
              transition={{ duration: 0.2 }}
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
                    {/* Check if amount is defined before calling toFixed() */}
                    ${transaction.amount != null ? transaction.amount.toFixed(2) : "N/A"}
                  </Text>
                </HStack>
              </HStack>
            </MotionListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RecentTransactions;
