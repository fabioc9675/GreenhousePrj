import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      greenhouses: [],
    };

    // Associate events with the component
  }

  // Component mounted ready
  componentDidMount() {
    // console.log("Component was mounted");
    this.fetchTask();
  }

  // function to make a query to DataBase
  fetchTask() {
    fetch("/api/greenhouse")
      .then((res) =>
        res.json().then((data) => {
          this.setState({ greenhouses: data });
          // console.log(this.state.greenhouses);
        })
      )
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        {/** Navigation */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              Proyecto Invernadero
            </a>
          </div>
        </nav>

        <div className="container">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Temp. Amb.</th>
                <th>Hume. Amb.</th>
                <th>Radi. Amb.</th>
                <th>Temp. Sue. 1</th>
                <th>Temp. Sue. 2</th>
                <th>Temp. Sue. 3</th>
                <th>Temp. Sue. 4</th>
                <th>Hume. Sue. 1</th>
                <th>Hume. Sue. 2</th>
                <th>Hume. Sue. 3</th>
                <th>Hume. Sue. 4</th>
              </tr>
            </thead>
            <tbody>
              {this.state.greenhouses.map((greenhouse) => {
                return (
                  <tr key={greenhouse._id}>
                    <td>{greenhouse.createdAt}</td>
                    <td>{greenhouse.temp_env}</td>
                    <td>{greenhouse.mois_env}</td>
                    <td>{greenhouse.radi_env}</td>
                    <td>{greenhouse.temp_earth[0]}</td>
                    <td>{greenhouse.temp_earth[1]}</td>
                    <td>{greenhouse.temp_earth[2]}</td>
                    <td>{greenhouse.temp_earth[3]}</td>
                    <td>{greenhouse.humi_earth[0]}</td>
                    <td>{greenhouse.humi_earth[1]}</td>
                    <td>{greenhouse.humi_earth[2]}</td>
                    <td>{greenhouse.humi_earth[3]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
