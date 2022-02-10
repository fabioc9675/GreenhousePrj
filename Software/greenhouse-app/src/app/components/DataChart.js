import React from "react";
import { Icon } from "react-materialize";
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

  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        x={cx - 12}
        y={cy - 12}
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#424242"
      >
        <g>
          <rect fill="none" height="24" width="24" />
        </g>
        <g>
          <g />
          <path d="M11.99,2C6.47,2,2,6.48,2,12c0,5.52,4.47,10,9.99,10C17.52,22,22,17.52,22,12C22,6.48,17.52,2,11.99,2z M8.5,8 C9.33,8,10,8.67,10,9.5S9.33,11,8.5,11S7,10.33,7,9.5S7.67,8,8.5,8z M12,18c-2.28,0-4.22-1.66-5-4h10C16.22,16.34,14.28,18,12,18z M15.5,11c-0.83,0-1.5-0.67-1.5-1.5S14.67,8,15.5,8S17,8.67,17,9.5S16.33,11,15.5,11z" />
        </g>
      </svg>
    );
  };

  return (
    <div className="col">
      <div className="container">{`Fecha de observación = ${date}`}</div>
      <ResponsiveContainer width="100%" height="100%" aspect={4.5}>
        <AreaChart
          width={900}
          height={200}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xDataKey}
            padding={{ left: 10, right: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis />
          <Tooltip /*content={<CustomTooltip />}*/ />
          {/*<Legend />*/}
          <Area
            type="monotone"
            dataKey={yDataKey}
            stroke={color}
            strokeWidth={3.5}
            fillOpacity={0.3}
            fill={color}
            activeDot={{ r: 7 }}
            dot={<CustomizedDot />} /*dot={{ r: 4 }}*/
            name="Valor"
            unit={unit}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="container center">{`Hora en que se tomó el dato`}</div>
    </div>
  );
}

export default DataChart;
