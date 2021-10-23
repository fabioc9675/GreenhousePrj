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
  const { data, xDataKey, yDataKey, date, unit } = props;

  const color = "#8e24aa"; // chart color

  /* 
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            margin: "0px",
            padding: "10px",
            backgroundColor: "rgb(255, 255, 255)",
            opacity: "80%",
          }}
        >
          <div className="label">{`Hora: ${label}`}</div>
          <div className="intro">{`Valor: ${payload[0].value} ${unit}`}</div>
        </div>
      );
    }

    return null;
  };
  */

  return (
    <div className="col">
      <div className="container">{`Fecha de consulta = ${date}`}</div>
      <AreaChart
        width={800}
        height={200}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xDataKey}
          padding={{ left: 20, right: 20 }}
          interval="preserveStartEnd"
        />
        <YAxis />
        <Tooltip /*content={<CustomTooltip />}*/ />
        {/*<Legend />*/}
        <Area
          type="monotone"
          dataKey={yDataKey}
          stroke={color}
          fillOpacity={1}
          fill="url(#colorUv)"
          activeDot={{ r: 8 }}
          dot={{ r: 4 }}
          name="Valor"
          unit={unit}
        />
      </AreaChart>
    </div>
  );
}

export default DataChart;
