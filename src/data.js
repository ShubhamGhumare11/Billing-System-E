// src/data.js

// Sales metrics for summary
const salesSummary = {
    totalSales:1000000,
    dailySales: 12000,
    monthlySales: 50000,
    totalTransactions: 500,
    yearlySales: 600000,
    profitInYear: 120000,
    totalProfit: 200000,
  };
  
  // Sales data for daily sales over time
  export const salesData = [
    { date: '2024-10-01', sales: 400 },
    { date: '2024-10-02', sales: 500 },
    { date: '2024-10-03', sales: 200 },
    // Add more data here
  ];
  
  // Top-selling items data
  export const topSellingItems = [
    { id: 1, name: "T-Shirt", sales: 120 },
    { id: 2, name: "Jeans", sales: 85 },
    // Add more items here
  ];
  
  // Recent transactions data
  export const recentTransactions = [
    { id: 1, customer: "Alice", amount: 250 },
    { id: 2, customer: "Bob", amount: 120 },
    // Add more transactions here
  ];
  
  // Export the summary data for use in other components
  export default salesSummary;
  