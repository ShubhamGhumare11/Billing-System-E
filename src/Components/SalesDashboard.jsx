import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import Navbar from "../Components/Navbar"; // Import the Navbar component
import SalesSummary from "../Components/SalesSummary";
// import SalesChart from "../Components/SalesChart";
import RecentTransactions from "../Components/RecentTransactions";
import TopSellingItems from "../Components/TopSellingItems"; // Import the TopSellingItems component

const SalesDashboard = () => (
  <Box p={4} flex="1">
    <Navbar />  {/* Include the Navbar at the top */}
    <SalesSummary />
    <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={6}>
      {/* <SalesChart /> */}
      {/* <RecentTransactions /> */}
    </Grid>
    <Box mt={6}> {/* Add a Box around TopSellingItems for spacing */}
      {/* <TopSellingItems /> Include the TopSellingItems component */}
    </Box>
  </Box>
);

export default SalesDashboard;
