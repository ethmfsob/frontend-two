import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Assesments work", "Number of work"],
  ["Submitted", 11],
  ["Pending", 2],
];

export const options = {
  title: "Submission ratio",
  pieHole: 0.4,
  is3D: false,
};

export default function PieChart() {
  return (
    <Chart
      chartType="PieChart"
      width="105%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
