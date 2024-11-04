import React, { useState } from "react";
import { Box, useColorModeValue, Text, VStack, HStack } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { salesData } from "../data";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Importing icons
import "@fontsource/poppins/400.css"; // Import Poppins font style

const SalesChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const tooltipBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const hoverBoxBg = useColorModeValue("gray.200", "gray.600");

  const handleMouseEnter = (data) => {
    setHoveredPoint(data);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <Box
      p={6}
      bg={bg}
      borderRadius="lg"
      boxShadow="md"
      fontFamily="Poppins, sans-serif"
      color={textColor}
      bgColor="lightgray"
      position="relative" // Set position relative for pop-up positioning
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid stroke={borderColor} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fontFamily: "Poppins, sans-serif" }}
          />
          <YAxis
            tick={{ fontSize: 12, fontFamily: "Poppins, sans-serif" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderRadius: "10px",
              fontFamily: "Poppins, sans-serif",
            }}
            cursor={{ fill: "rgba(0,0,0,0.1)" }}
            formatter={(value, name) => [`Sales: $${value}`, "Sales"]} // Custom tooltip formatter
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="darkblue"
            strokeWidth={3}
            dot={{
              fill: "lightblue",
              r: 5,
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
            }}
            activeDot={{
              fill: "darkblue",
              r: 7,
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Pop-up Box on Hover */}
      {hoveredPoint && (
        <Box
          position="absolute"
          bg={hoverBoxBg}
          p={4}
          borderRadius="md"
          boxShadow="md"
          top="10%" // Adjust this as necessary
          left="50%"
          transform="translateX(-50%)"
          zIndex="10"
        >
          <VStack align="start">
            <Text fontWeight="bold">Sales on {hoveredPoint.date}:</Text>
            <HStack>
              {hoveredPoint.sales > 0 ? (
                <FaArrowUp color="green" />
              ) : (
                <FaArrowDown color="red" />
              )}
              <Text fontSize="lg">${hoveredPoint.sales.toFixed(2)}</Text>
            </HStack>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default SalesChart;
