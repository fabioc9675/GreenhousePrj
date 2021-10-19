import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function DataChart(props) {
  // definition of language Used in simulator
  const { data, xDataKey, yDataKey } = props;

  return (
    <LineChart
      width={800}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xDataKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey={yDataKey}
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}

export default DataChart;
