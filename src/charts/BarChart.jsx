import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Modules", "Total Question", { role: 'style' } ],
  ["HTML", 1000,"color: red"],
  ["CSS", 1170,"color: blue"],
  ["Js", 660,"color: green"],
  ["Java", 350,"color: yellow"],
];

export const options = {
  chart: {
    title: "Assesments Questions",
    subtitle: "Total question given by the teacher.",
  },
};

export default function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
