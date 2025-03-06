import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const IncomeExpenseChart = ({ income, expenses }) => {
  const chartRef = useRef(null); // Ref for the chart canvas
  const chartInstance = useRef(null); // Ref for the chart instance

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get the canvas context
    const ctx = chartRef.current.getContext('2d');

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'bar', // Use a bar chart
      data: {
        labels: ['Income', 'Expenses'], // X-axis labels
        datasets: [
          {
            label: 'Amount',
            data: [income, expenses], // Y-axis data
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)', // Income color
              'rgba(255, 99, 132, 0.6)', // Expenses color
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)', // Income border color
              'rgba(255, 99, 132, 1)', // Expenses border color
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Start the Y-axis from 0
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [income, expenses]); // Re-render the chart when income or expenses change

  return <canvas ref={chartRef} />;
};

export default IncomeExpenseChart;