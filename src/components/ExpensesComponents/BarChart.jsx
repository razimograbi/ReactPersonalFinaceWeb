import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

/**
 * BarChart component to display a bar chart of income and expenses by month.
 *
 * @param {Object} props - The properties object.
 * @param {number[]} props.monthlyIncomes - The array of monthly income amounts.
 * @param {number[]} props.monthlyExpenses - The array of monthly expense amounts.
 * @returns {JSX.Element} A canvas element for the bar chart.
 */
const BarChart = ({ monthlyIncomes, monthlyExpenses }) => {
  const myChartRef = useRef(null);

  useEffect(() => {
    //destroy previous (if existing) charts
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    const gridColor = "#ccc"; // Light gray color
    // Create a new chart with the given data
    const ctx = document.getElementById("myChart").getContext("2d");
    myChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        // Data for the bar chart with income and expenses datasets
        datasets: [
          {
            label: "Income",
            data: monthlyIncomes,
            backgroundColor: "rgba(75, 192, 192)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Expenses",
            data: monthlyExpenses,
            backgroundColor: "rgba(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      // Chart options configuration for styling and responsiveness
      options: {
        indexAxis: "x",
        plugins: {
          legend: {
            position: "right",
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: gridColor,
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
          y: {
            grid: {
              color: gridColor,
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [monthlyIncomes, monthlyExpenses]);

  return <canvas id="myChart"></canvas>;
};

export default BarChart;
