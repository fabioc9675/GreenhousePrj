import React, { Component } from "react";
import { io } from "socket.io-client";
import { DatePicker, Footer } from "react-materialize";
import moment from "moment";
import { FaGithubSquare, FaYoutubeSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// import data of configuration
import dataConfig from "../../dataConfig/dataConfig.json";
import DataTable from "./DataTable";
import DataCollapsible from "./DataCollapsible";

const udeaLogo = "resources/logos/UdeALogo.png";

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
      instName: dataConfig.institutionName, // load institution name
      greenhouses: [], // load Greenhouse data payload from database
      dateInit: dateInit, // calculate data between
      dateEnd: dateEnd,
      dateComp: "", // data to load current day
      availableDates: [], // Available dates in database
      lastGreenhouse: {}, // real time acquisition and show
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
    this.fetchGreenhouseAvailableDates(); // Available dates in database
    this.fetchGreenhousebyDate(this.state.dateInit, this.state.dateEnd); // data by date
    this.fetchLastGreenhouse(); // last data in database

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
          // console.log(this.state.greenhouses);
        })
      )
      .catch((err) => console.error(err));
  }

  // function to make a query of all availabe dates
  fetchGreenhouseAvailableDates() {
    fetch(`/api/greenhouse/datesInst/${this.state.institution}`)
      .then((res) =>
        res.json().then((data) => {
          var dates = data.map((dat) => {
            return new Date(moment(dat.createdAt).format("ll")).toDateString();
          });
          dates.push(
            new Date(moment(this.dateComp).format("ll")).toDateString()
          );
          this.setState({ availableDates: dates });
          // console.log(this.state.availableDates);
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
          // console.log(this.state.greenhouses);
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
          data[0].temp_earth_1 = data[0].temp_earth[0];
          data[0].temp_earth_2 = data[0].temp_earth[1];
          data[0].temp_earth_3 = data[0].temp_earth[2];
          data[0].temp_earth_4 = data[0].temp_earth[3];
          data[0].humi_earth_1 = data[0].humi_earth[0];
          data[0].humi_earth_2 = data[0].humi_earth[1];
          data[0].humi_earth_3 = data[0].humi_earth[2];
          data[0].humi_earth_4 = data[0].humi_earth[3];
          this.setState({ lastGreenhouse: data[0] });
          // console.log(this.state.lastGreenhouse);
        })
      )
      .catch((err) => console.error(err));
  }

  // function to handle change in datePicker
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

    // console.log("Data request");
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
              Proyecto Invernadero, {this.state.instName}
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
              defaultDate: new Date(this.state.dateComp),
              disableDayFn: (date) => {
                // console.log(this.state.availableDates);
                if (this.state.availableDates.includes(date.toDateString())) {
                  return false;
                } else {
                  return true;
                }
              },
            }}
          />
          <button
            className="waves-effect waves-light btn-large"
            onClick={() => this.requesDataByDate()}
          >
            <i className="material-icons left">search</i>Consultar fecha
          </button>
        </div>

        <div>
          <DataCollapsible
            data={this.state.lastGreenhouse}
            data2Chart={this.state.greenhouses}
            dateUpdate={this.state.dateComp}
          />
        </div>

        <div>
          <DataTable data={this.state.greenhouses} />
        </div>

        <Footer
          className="green darken-4"
          copyrights="Copyright: Instituto de Física"
          moreLinks={
            <div>
              <a
                className="grey-text text-lighten-4"
                href="https://github.com/fabioc9675"
                target="_blank"
              >
                <FaGithubSquare size="3em" />
              </a>
              <a
                className="grey-text text-lighten-4"
                href="https://www.youtube.com/channel/UCWdd0P8N_Ug6H5iSZgOykQg"
                target="_blank"
              >
                <FaYoutubeSquare size="3em" />
              </a>

              <a
                className="grey-text text-lighten-4 right"
                href="https://www.udea.edu.co"
                target="_blank"
              >
                <img width="200px" src={udeaLogo} alt="" />
              </a>
            </div>
          }
        >
          <h5 className="white-text">Proyecto Invernadero</h5>
          <p className="grey-text text-lighten-4">
            Proyecto apoyado por el instituto de física de la Universidad de
            Antioquia
          </p>
          <p className="grey-text text-lighten-4">
            Contactanos:{" "}
            <a href="mailto:fabian.castano@udea.edu.co?Subject=[Proyecto%20Invernadero]">
              <MdEmail size="2em" color="#FFFFFF" />
            </a>{" "}
          </p>
        </Footer>
      </div>
    );
  }
}

export default App;
