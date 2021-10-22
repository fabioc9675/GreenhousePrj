import React, { Component } from "react";
import {
  AreaChart,
  LineChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

function DataChart(props) {
  // definition of language Used in simulator
  const { data, xDataKey, yDataKey, date } = props;

  return (
    <div className="col">
      <div className="container">{`Fecha de consulta = ${date}`}</div>
      <AreaChart
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
        {/*<Legend />*/}
        <Area
          type="monotone"
          dataKey={yDataKey}
          stroke="#8884d8"
          fill="#8884d8"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </div>
  );
}

export default DataChart;
