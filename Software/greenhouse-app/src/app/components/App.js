import React, { Component } from "react";
import { io } from "socket.io-client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// import data of configuration
import dataConfig from "../../dataConfig/dataConfig.json";
import {
  Collapsible,
  CollapsibleItem,
  DatePicker,
  Icon,
} from "react-materialize";
import moment from "moment";
import DataChart from "./DataChart";

class App extends Component {
  constructor() {
    // set the current date
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const dateInit = moment(date).utc().format(); // format("YYYY-MM-D");
    // const myDate = moment(date).format("MMM D, YYYY");
    date.setUTCDate(date.getUTCDate() + 1);
    const dateEnd = moment(date).utc().format();

    super();
    this.state = {
      institution: dataConfig.institution, // load institute environment variable
      greenhouses: [],
      dateInit: dateInit,
      dateEnd: dateEnd,
      dateComp: "",
      lastGreenhouse: {},
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
      // this.fetchGreenhouse();
      this.fetchGreenhousebyDate(this.state.dateInit, this.state.dateEnd);
      this.fetchLastGreenhouse();
      M.toast({ html: "Nuevo dato " });
    });

    // load data
    this.fetchGreenhousebyDate(this.state.dateInit, this.state.dateEnd);
    this.fetchLastGreenhouse();

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
          var dateQuery = "No hay datos para esta fecha";
          for (var i = 0; i < data.length; i++) {
            var createAt = new Date(data[i].createdAt);
            data[i].date = moment(createAt).format("YYYY-MM-D");
            data[i].hour = moment(createAt).format("LT"); // .format("hh:mm:ss a");
            dateQuery = moment(createAt).format("ll");
          }
          this.setState({ greenhouses: data });
          this.setState({ dateComp: dateQuery });
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
          var dateQuery = "No hay datos para esta fecha";
          for (var i = 0; i < data.length; i++) {
            var createAt = new Date(data[i].createdAt);
            data[i].date = moment(createAt).format("YYYY-MM-D");
            data[i].hour = moment(createAt).format("LT"); // .format("hh:mm a");
            dateQuery = moment(createAt).format("ll");
          }
          this.setState({ greenhouses: data });
          this.setState({ dateComp: dateQuery });
          console.log(this.state.greenhouses);
        })
      )
      .catch((err) => console.error(err));
  }

  // function to fetch last greenhouse
  fetchLastGreenhouse() {
    fetch(`/api/greenhouse/last/inst/${this.state.institution}`)
      .then((res) =>
        res.json().then((data) => {
          var createAt = new Date(data[0].createdAt);
          data[0].date = moment(createAt).format("YYYY-MM-D");
          data[0].hour = moment(createAt).format("LT"); // .format("hh:mm a");
          this.setState({ lastGreenhouse: data[0] });
          console.log(this.state.lastGreenhouse);
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

    const dateInit = moment(date).utc().format(); // format("YYYY-MM-D");
    // const myDate = moment(date).format("MMM D, YYYY");
    date.setUTCDate(date.getUTCDate() + 1);
    const dateEnd = moment(date).utc().format();

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
            value={this.state.dateComp}
            onChange={(newDate) => {
              this.handleChange({
                target: {
                  id: "myDate",
                  value: newDate,
                },
              });
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
          <Collapsible accordion={false} popout>
            <CollapsibleItem
              expanded={false}
              header={`Temperatura ambiente = ${this.state.lastGreenhouse.temp_env} ºC`}
              icon={<Icon>filter_drama</Icon>}
              node="div"
              style={{ justifyItems: "center" }}
            >
              <DataChart
                data={this.state.greenhouses}
                xDataKey="hour"
                yDataKey="temp_env"
                date={this.state.dateComp}
                unit="ºC"
              />
            </CollapsibleItem>
            <CollapsibleItem
              expanded={false}
              header={`Humedad relativa ambiente = ${this.state.lastGreenhouse.mois_env} %`}
              icon={<Icon>place</Icon>}
              node="div"
            >
              <DataChart
                data={this.state.greenhouses}
                xDataKey="hour"
                yDataKey="mois_env"
                date={this.state.dateComp}
                unit="%"
              />
            </CollapsibleItem>
            <CollapsibleItem
              expanded={false}
              header="You know, FYI, you can buy a paddle. Did you not plan for this contingency?"
              icon={<Icon>whatshot</Icon>}
              node="div"
            >
              You know, FYI, you can buy a paddle. Did you not plan for this
              contingency?
            </CollapsibleItem>
          </Collapsible>
        </div>

        <div className="container">
          <table className="responsive-table striped">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
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
                    <td>{greenhouse.date}</td>
                    <td>{greenhouse.hour}</td>
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
