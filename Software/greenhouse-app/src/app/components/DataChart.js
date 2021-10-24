import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DataChart(props) {
  // definition of language Used in simulator
  const { data, xDataKey, yDataKey, date, unit, color } = props;

  return (
    <div className="col">
      <div className="container">{`Fecha de consulta = ${date}`}</div>
      <ResponsiveContainer width="100%" height="100%" aspect={4.5}>
        <AreaChart
          width={900}
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
      </ResponsiveContainer>
    </div>
  );
}

export default DataChart;
