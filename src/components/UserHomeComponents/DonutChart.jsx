import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

/**
 * DonutChart component to display a doughnut chart of expenses by category for the current month.
 *
 * @param {Object} props - The properties object.
 * @param {Object[]} props.expenses - The array of expense objects.
 * @param {string} props.expenses[].category - The category of the expense.
 * @param {number} props.expenses[].amount - The amount of the expense.
 * @param {string} props.expenses[].startDate - The start date of the expense.
 * @returns {JSX.Element} A canvas element for the doughnut chart.
 */

const DonutChart = ({ expenses ,useCurrentMonth = true}) => {
  const chartDoughnutRef = useRef(null);

  useEffect(() => {
    if (!expenses) return;

        // List of categories to show in the chart
    const categoriesToShow = [
      "Shopping",
      "Food",
      "Transportation",
      "Loan",
      "Groceries",
      "Bills",
      "Entertainment",
      "Other",
    ];

    // Initialize the expense amounts for each category to zero
    const expensesByCategory = categoriesToShow.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    // Aggregate expenses by category for the current month
    expenses.forEach((expense) => {
      const category = expense.category;
      const amount = parseFloat(expense.amount);

       // Get the date from the expense's start date
       const expenseDate = new Date(expense.startDate);
       const expenseYearOrMonth = useCurrentMonth ? expenseDate.getMonth() : expenseDate.getFullYear();
 
       // Get the current date
       const currentDate = new Date();
       const currentYearOrMonth = useCurrentMonth ? currentDate.getMonth() : currentDate.getFullYear();
 
       // Check if the expense's date matches the current date
       if (
         expenseYearOrMonth === currentYearOrMonth &&
         categoriesToShow.includes(category)
       ) {
         expensesByCategory[category] += amount;
       }
       
     /*  const expenseDate = new Date(expense.startDate);
      const expenseMonth = expenseDate.getMonth();

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();

      if (
        expenseMonth === currentMonth &&
        categoriesToShow.includes(category)
      ) {
        expensesByCategory[category] += amount;
      } */
    });

    // Data for the doughnut chart
    const dataDoughnut = {
      labels: categoriesToShow,
      datasets: [
        {
          data: categoriesToShow.map(
            (category) => expensesByCategory[category]
          ),
          backgroundColor: [
            "rgb(51, 153, 255)",
            "rgb(255, 102, 102)",
            "rgb(255, 204, 51)",
            "rgb(102, 204, 0)",
            "rgb(166, 206, 227)",
            "rgb(253, 218, 236)",
            "rgb(255, 153, 0)",
            "rgb(0, 153, 153)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    // Configuration for the doughnut chart
    const configDoughnut = {
      type: "doughnut",
      data: dataDoughnut,
      options: {
        plugins: {
          doughnutlabel: {
            labels: [
              {
                text: "Total",
                font: { size: "20" },
                color: "#000",
              },
            ],
          },
        },
      },
    };

    // Destroy the previous chart instance if it exists
    if (chartDoughnutRef.current) {
      chartDoughnutRef.current.destroy();
    }
    // Create a new chart instance
    chartDoughnutRef.current = new Chart(
      document.getElementById("chartDoughnut"),
      configDoughnut
    );

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (chartDoughnutRef.current) {
        chartDoughnutRef.current.destroy();
      }
    };
  }, [expenses]);
  
  // Render a canvas element for the doughnut chart
  return <canvas id="chartDoughnut"></canvas>;
};

export default DonutChart;
