import React from "react";
import { Box, Text, List, ListItem, Flex, useColorModeValue } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Import icons for up and down
import { topSellingItems } from "../data";
import { motion } from "framer-motion"; // Import motion for animations

// Create a motion component for ListItem
const MotionListItem = motion(ListItem);

const TopSellingItems = () => {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700"); // Background color on hover
  const hoverColor = useColorModeValue("black", "white"); // Text color on hover

  return (
    <Box p={4} bg="lightgray" margin="20px" padding="5"border="px solid black" boxShadow="md" borderRadius="md" color={textColor}>
      <Text fontSize="xl" mb={4} fontWeight="bold">Top Selling Items</Text>
      <List spacing={2}>
        {topSellingItems.map((item) => (
          <MotionListItem
            key={item.id}
            display="flex"
            alignItems="center"
            p={2}
            border={`1px solid lightblack `} // Apply custom border color

            borderRadius="md"
            transition="background-color 0.2s, color 0.2s" // Smooth transition for hover effects
            _hover={{
              bg:"lightgreen",
              color: hoverColor,
            }}
          >
            <Box display="flex" alignItems="center">
              {/* Conditional icon rendering based on sales */}
              {item.sales > 0 ? (
                <FaArrowUp style={{ marginRight: "8px", color: "green" }} />
              ) : (
                <FaArrowDown style={{ marginRight: "8px", color: "red" }} />
              )}
              <Text fontWeight="medium">{item.name}</Text>
            </Box>
            <Text 
              ml="auto" 
              color={item.sales > 0 ? "green.500" : "red.500"}
              fontWeight="bold"
            >
              {`$${item.sales}`} sold {/* Added $ sign for sales */}
            </Text>
            <Text ml={2} fontSize="sm" color="gray.500">
              {new Date(item.timestamp).toLocaleString()} {/* Format the timestamp */}
            </Text>
          </MotionListItem>
        ))}
      </List>
    </Box>
  );
};

export default TopSellingItems;
