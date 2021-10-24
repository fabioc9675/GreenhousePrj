import React from "react";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import DataChart from "./DataChart";

function DataCollapsible(props) {
  const { data, data2Chart, dateUpdate } = props;
  return (
    <Collapsible accordion={false} popout>
      <CollapsibleItem
        expanded={false}
        header={`Última temperatura ambiente = ${data.temp_env} ºC`}
        icon={<Icon>filter_drama</Icon>}
        node="div"
      >
        <DataChart
          data={data2Chart}
          xDataKey="hour"
          yDataKey="temp_env"
          date={dateUpdate}
          unit="ºC"
          color="#8e24aa"
        />
      </CollapsibleItem>
      <CollapsibleItem
        expanded={false}
        header={`Última humedad relativa ambiente = ${data.mois_env} %`}
        icon={<Icon>place</Icon>}
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
        expanded={false}
        header={`Última radición Solar = ${data.radi_env} `}
        icon={<Icon>filter_drama</Icon>}
        node="div"
      >
        <DataChart
          data={data2Chart}
          xDataKey="hour"
          yDataKey="radi_env"
          date={dateUpdate}
          unit=""
          color="#8e24aa"
        />
      </CollapsibleItem>
      <CollapsibleItem
        expanded={false}
        header={`Última Temperatura Suelo 1 = ${data.temp_earth_1} ºC`}
        icon={<Icon>filter_drama</Icon>}
        node="div"
      >
        <DataChart
          data={data2Chart}
          xDataKey="hour"
          yDataKey="temp_earth[0]"
          date={dateUpdate}
          unit="ºC"
          color="#8e24aa"
        />
      </CollapsibleItem>
      <CollapsibleItem
        expanded={false}
        header={`Última humedad Suelo 1 = ${data.humi_earth_1} %`}
        icon={<Icon>filter_drama</Icon>}
        node="div"
      >
        <DataChart
          data={data2Chart}
          xDataKey="hour"
          yDataKey="humi_earth[0]"
          date={dateUpdate}
          unit="%"
          color="#8e24aa"
        />
      </CollapsibleItem>
    </Collapsible>
  );
}

export default DataCollapsible;
