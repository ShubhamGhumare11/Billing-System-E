import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  SimpleGrid,
  HStack,
  useColorModeValue
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { FaChartLine } from "react-icons/fa";
import "@fontsource/poppins/400.css";

const dataFetchUrl = "/salesData.json"; // Local JSON file path

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("sales");
  const [loading, setLoading] = useState(true);

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const tooltipBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");

  useEffect(() => {
    // Fetch data from the local JSON file
    axios.get(dataFetchUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const metrics = [
    { label: "Sales", key: "sales", color: "blue" },
    { label: "Profit", key: "profit", color: "green" },
    { label: "Loss", key: "loss", color: "red" },
    { label: "All", key: "allTime", color: "purple" }
  ];

  const renderChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid stroke={borderColor} strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fontFamily: "Poppins, sans-serif" }} />
          <YAxis tick={{ fontSize: 12, fontFamily: "Poppins, sans-serif" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderRadius: "10px",
              fontFamily: "Poppins, sans-serif"
            }}
            cursor={{ fill: "rgba(0,0,0,0.1)" }}
          />
          <Line
            type="monotone"
            dataKey={selectedMetric}
            stroke={metrics.find((m) => m.key === selectedMetric)?.color}
            strokeWidth={3}
            dot={{ fill: "white", r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Box p={6} color={textColor} fontFamily="Poppins, sans-serif">
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Graph DashBoard
      </Text>
      <SimpleGrid columns={4} spacing={4}>
        {metrics.map((metric) => (
          <Box
            key={metric.key}
            p={5}
            bg={bg}
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
            _hover={{ bg: "blue.100", cursor: "pointer" }}
            onClick={() => setSelectedMetric(metric.key)}
          >
            <HStack spacing={3} justifyContent="center">
              <FaChartLine style={{ color: metric.color, fontSize: "20px" }} />
              <Text fontSize="lg" fontWeight="bold">{metric.label}</Text>
            </HStack>
            <Text mt={2}> {metric.label} Graph</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box mt={10}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          {metrics.find((m) => m.key === selectedMetric)?.label} Graph
        </Text>
        {loading ? (
          <Text>Loading data...</Text>
        ) : (
          renderChart()
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
