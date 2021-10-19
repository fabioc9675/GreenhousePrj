import React, { Component } from "react";
import { io } from "socket.io-client";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// import data of configuration
import dataConfig from "../../dataConfig/dataConfig.json";
import { DatePicker } from "react-materialize";
import moment from "moment";

class App extends Component {
  constructor() {
    // set the current date
    var date = new Date();
    const dateInit = moment(date).format("YYYY-MM-D");
    // const myDate = moment(date).format("MMM D, YYYY");
    date.setDate(date.getDate() + 1);
    const dateEnd = moment(date).format("YYYY-MM-D");

    super();
    this.state = {
      institution: dataConfig.institution, // load institute environment variable
      greenhouses: [],
      dateInit: dateInit,
      dateEnd: dateEnd,
      dateComp: {},
      // myDate: myDate,
    };

    // Associate events with the component
    this.handleChange = this.handleChange.bind(this);
  }

  // Component mounted ready
  componentDidMount() {
    // console.log("Component was mounted");
    const socket = io("/");

    // initialization of socket io in the client side
    socket.on("message", (message) => {
      console.log(message);
      this.fetchGreenhouse();
    });

    // load data
    this.fetchGreenhousebyDate(this.state.dateInit, this.state.dateEnd);

    // set time interval for someting usefull
    // this.timer = setInterval(() => {
    //   console.log("launch interval");
    //   // this.fetchTask();
    // }, 10000);
  }

  componentWillUnmount() {
    // clear time interval
    // clearInterval(this.timer);
  }

  // function to make a query to DataBase
  fetchGreenhouse() {
    fetch(`/api/greenhouse/inst/${this.state.institution}`)
      .then((res) =>
        res.json().then((data) => {
          this.setState({ greenhouses: data });
          console.log(this.state.greenhouses);
        })
      )
      .catch((err) => console.error(err));
  }

  // function to make a query to DataBase
  fetchGreenhousebyDate(di, de) {
    fetch(`/api/greenhouse/inst/${this.state.institution}/date/${di}/${de}`)
      .then((res) =>
        res.json().then((data) => {
          this.setState({ greenhouses: data });
          console.log(this.state.greenhouses);
        })
      )
      .catch((err) => console.error(err));
  }

  // function to handle change
  handleChange(e) {
    // this.fetchTaskbyDate();
    const dateInit = moment(e.target.value).format("YYYY-MM-D");
    var date = new Date(dateInit);
    date.setUTCDate(date.getUTCDate() + 1);
    const dateEnd = moment(date).utc().format("YYYY-MM-D");
    // const myDate = moment(e.target.value).format("MMM D, YYYY");
  }

  // requesting data when button is pressed
  requesDataByDate() {
    var datePicker = document.getElementById("dateSelector");
    var date = new Date(datePicker.value);

    const dateInit = moment(date).format("YYYY-MM-D");
    const myDate = moment(date).format("MMM D, YYYY");

    date.setUTCDate(date.getUTCDate() + 1);

    const dateEnd = moment(date).utc().format("YYYY-MM-D");

    console.log("Data request");
    this.setState({
      dateInit: dateInit,
      dateEnd: dateEnd,
      // myDate: myDate,
    });

    this.fetchGreenhousebyDate(dateInit, dateEnd);
  }

  render() {
    return (
      <div>
        {/** Navigation */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              Proyecto Invernadero, Institución {this.state.institution}
            </a>
          </div>
        </nav>

        <div className="container">
          <DatePicker
            label="Fecha de observación"
            id="dateSelector"
            onChange={(newDate) => {
              this.handleChange({
                target: {
                  id: "myDate",
                  value: newDate,
                },
              });
            }}
            options={{
              setDefaultDate: true,
              defaultDate: this.state.myDate,
            }}
          />
          <button
            className="waves-effect waves-light btn-large"
            onClick={() => this.requesDataByDate()}
          >
            <i className="material-icons left">search</i>Consultar fecha
          </button>
        </div>

        <div className="container">
          <LineChart
            width={800}
            height={400}
            data={this.state.greenhouses}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="createdAt" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              type="monotone"
              dataKey="temp_env"
              stroke="#ff7300"
              yAxisId={0}
            />
            <Line
              type="monotone"
              dataKey="temp_earth[1]"
              stroke="#387908"
              yAxisId={1}
            />
          </LineChart>
        </div>

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
