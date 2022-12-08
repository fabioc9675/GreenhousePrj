import React from "react";

function DataTable(props) {
  // definition of props to use i the component
  const { data, dateUpdate } = props;
  return (
    <div className="container ">
      <h4>Tabla de datos ({dateUpdate}): </h4>
      <div className="grey lighten-5">
        <table className="responsive-table striped centered">
          <thead>
            <tr>
              {/*<th>Fecha</th>*/}
              <th>Hora</th>
              <th>Temperatura Ambiente</th>
              <th>Humedad Ambiente</th>
              <th>Radiación Solar</th>
              <th>Temperatura Suelo 1</th>
              {/*<th>Temp. Sue. 2</th>*/}
              {/*<th>Temp. Sue. 3</th>*/}
              {/*<th>Temp. Sue. 4</th>*/}
              {/*<th>Humedad Suelo 1</th>*/}
              <th>Humedad Suelo 2</th>
              {/*<th>Hume. Sue. 3</th>*/}
              {/*<th>Hume. Sue. 4</th>*/}
            </tr>
          </thead>
          <tbody>
            {data.map((greenhouse) => {
              return (
                <tr key={greenhouse._id}>
                  {/*<td>{greenhouse.date}</td>*/}
                  <td>{greenhouse.hour}</td>
                  <td>{greenhouse.temp_env} ºC</td>
                  <td>{greenhouse.mois_env} %</td>
                  <td>{greenhouse.radi_env} lx</td>
                  <td>{greenhouse.temp_earth[0]} ºC</td>
                  {/*<td>{greenhouse.temp_earth[1]}</td>*/}
                  {/*<td>{greenhouse.temp_earth[2]}</td>*/}
                  {/*<td>{greenhouse.temp_earth[3]}</td>*/}
                  {/*<td>{greenhouse.humi_earth[0]} %</td>*/}
                  <td>{greenhouse.humi_earth[1]}</td>
                  {/*<td>{greenhouse.humi_earth[2]}</td>*/}
                  {/*<td>{greenhouse.humi_earth[3]}</td>*/}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
