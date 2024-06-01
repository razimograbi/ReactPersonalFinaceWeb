import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DonutChart = ({ expenses }) => {
  const chartDoughnutRef = useRef(null);

  useEffect(() => {
    if (!expenses) return;

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

    const expensesByCategory = categoriesToShow.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    expenses.forEach((expense) => {
      const category = expense.category;
      const amount = parseFloat(expense.amount);

      const expenseDate = new Date(expense.startDate);
      const expenseMonth = expenseDate.getMonth();

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();

      if (
        expenseMonth === currentMonth &&
        categoriesToShow.includes(category)
      ) {
        expensesByCategory[category] += amount;
      }
    });

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

    if (chartDoughnutRef.current) {
      chartDoughnutRef.current.destroy();
    }
    chartDoughnutRef.current = new Chart(
      document.getElementById("chartDoughnut"),
      configDoughnut
    );

    return () => {
      if (chartDoughnutRef.current) {
        chartDoughnutRef.current.destroy();
      }
    };
  }, [expenses]);

  return <canvas id="chartDoughnut"></canvas>;
};

export default DonutChart;
