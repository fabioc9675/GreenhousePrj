import React from "react";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import DataChart from "./DataChart";

function DataCollapsible(props) {
  const { data, data2Chart, dateUpdate, color } = props;
  return (
    <div className="container ">
      <h4>Gráficos de datos ({dateUpdate}): </h4>
      <Collapsible accordion={false} popout>
        <CollapsibleItem
          className={color}
          expanded={false}
          header={`Última temperatura ambiente = ${data.temp_env} ºC`}
          icon={<Icon>thermostat</Icon>}
          node="div"
        >
          <DataChart
            data={data2Chart}
            xDataKey="hour"
            yDataKey="temp_env"
            date={dateUpdate}
            unit="ºC"
            color="#f06292"
          />
        </CollapsibleItem>
        <CollapsibleItem
          className={color}
          expanded={false}
          header={`Última humedad relativa ambiente = ${data.mois_env} %`}
          icon={<Icon>filter_drama</Icon>}
          node="div"
        >
          <DataChart
            data={data2Chart}
            xDataKey="hour"
            yDataKey="mois_env"
            date={dateUpdate}
            unit="%"
            color="#8e24aa"
          />
        </CollapsibleItem>
        <CollapsibleItem
          className={color}
          expanded={false}
          header={`Última radiación Solar = ${data.radi_env} lx`}
          icon={<Icon>light_mode</Icon>}
          node="div"
        >
          <DataChart
            data={data2Chart}
            xDataKey="hour"
            yDataKey="radi_env"
            date={dateUpdate}
            unit=" lx"
            color="#3f51b5"
          />
        </CollapsibleItem>
        <CollapsibleItem
          className={color}
          expanded={false}
          header={`Última Temperatura Suelo 1 = ${data.temp_earth_1} ºC`}
          icon={<Icon>grass</Icon>}
          node="div"
        >
          <DataChart
            data={data2Chart}
            xDataKey="hour"
            yDataKey="temp_earth[0]"
            date={dateUpdate}
            unit="ºC"
            color="#009688"
          />
        </CollapsibleItem>
        <CollapsibleItem
          className={color}
          expanded={false}
          header={`Última humedad Suelo 2 = ${data.humi_earth_2} %`}
          icon={<Icon>water_drop</Icon>}
          node="div"
        >
          <DataChart
            data={data2Chart}
            xDataKey="hour"
            yDataKey="humi_earth[1]"
            date={dateUpdate}
            unit="%"
            color="#2e7d32"
          />
        </CollapsibleItem>
      </Collapsible>
    </div>
  );
}

export default DataCollapsible;
