import React, { Component } from "react";
import { io } from "socket.io-client";
import { Caption, DatePicker, Footer, Slide, Slider } from "react-materialize";
import moment from "moment";
import { FaGithubSquare, FaYoutubeSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import DataTable from "./DataTable";
import DataCollapsible from "./DataCollapsible";

import { version } from "../../dataConfig/autobuild_version";

const udeaLogo = "resources/logos/UdeALogo.png";

class MainFrame extends Component {
  constructor(props) {
    super(props);
    // properties extraction
    var dataConfig = this.props.dataConfig;
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
      title: dataConfig.title, // app title
      instLogo: dataConfig.instLogo, // institution logo
      instURL: dataConfig.instURL, // institution URL
      footNote: dataConfig.footNote, // Personalized footnote
      background: dataConfig.background, // Web page background
      mainCard: dataConfig.mainCard, // Main card
      photoBook: dataConfig.photoBook, // photo book information
      photoTitle: dataConfig.photoTitle,
      photoText: dataConfig.photoText,
      greenhouses: [], // load Greenhouse data payload from database
      dateInit: dateInit, // calculate data between
      dateEnd: dateEnd,
      dateComp: "", // data to load current day
      availableDates: [], // Available dates in database
      lastGreenhouse: {}, // real time acquisition and show
      visitCount: 0, // visit counter
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

    // Update visit count
    this.updateVisitCount();
    // set time interval for someting usefull
    // this.timer = setInterval(() => {
    //   console.log("launch interval");
    //   // this.fetchTask();
    // }, 10000);
    console.log("Mounted");
  }

  componentWillUnmount() {
    // clear time interval
    // clearInterval(this.timer);
    console.log("Unmounted");
  }

  // Update visit count to the web page
  updateVisitCount() {
    fetch(
      "https://api.countapi.xyz/update/jfk-school/greenhouse?amount=1"
    ).then((res) =>
      res.json().then((res) => {
        this.setState({ visitCount: res.value });
        console.log(this.state.visitCount);
      })
    );
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
      <div
        style={{
          backgroundImage: `url("${this.state.background}")`,
          height: "100%",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/** Navigation */}
        <nav className="light-blue darken-4">
          <div className="container" style={{ height: "100px" }}>
            <a className="brand-logo" href="/">
              {this.state.title}
            </a>

            <a
              className="grey-text text-lighten-4 right"
              href={this.state.instURL}
              target="_blank"
            >
              <img height="100px" src={this.state.instLogo} alt="" />
            </a>
          </div>
        </nav>

        <div className=" blue-grey darken-4 center">
          <img alt="" src={this.state.mainCard} width="100%" />
        </div>

        <div className="container ">
          <DatePicker
            style={{ fontSize: "1.5rem" }}
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
            color="white"
          />
        </div>
        <div className="container blue-grey darken-4 center">
          <Slider
            fullscreen={false}
            options={{
              duration: 1000,
              height: 400,
              indicators: true,
              interval: 6000,
            }}
          >
            <Slide image={<img alt="" src={this.state.photoBook[0]} />}>
              <Caption placement="left">
                <h3>{this.state.photoTitle[0]}</h3>
                <h5 className="white black-text">{this.state.photoText[0]}</h5>
              </Caption>
            </Slide>
            <Slide image={<img alt="" src={this.state.photoBook[1]} />}>
              <Caption placement="right">
                <h3>{this.state.photoTitle[1]}</h3>
                <h5 className="white black-text">{this.state.photoText[1]}</h5>
              </Caption>
            </Slide>
            <Slide image={<img alt="" src={this.state.photoBook[2]} />}>
              <Caption placement="center">
                <h3>{this.state.photoTitle[2]}</h3>
                <h5 className="white black-text">{this.state.photoText[2]}</h5>
              </Caption>
            </Slide>
            <Slide image={<img alt="" src={this.state.photoBook[3]} />}>
              <Caption placement="center">
                <h3>{this.state.photoTitle[3]}</h3>
                <h5 className="white black-text">{this.state.photoText[3]}</h5>
              </Caption>
            </Slide>
            <Slide image={<img alt="" src={this.state.photoBook[4]} />}>
              <Caption placement="left">
                <h3>{this.state.photoTitle[4]}</h3>
                <h5 className="white black-text">{this.state.photoText[4]}</h5>
              </Caption>
            </Slide>
            <Slide image={<img alt="" src={this.state.photoBook[5]} />}>
              <Caption placement="right">
                <h3>{this.state.photoTitle[5]}</h3>
                <h5 className="white black-text">{this.state.photoText[5]}</h5>
              </Caption>
            </Slide>
          </Slider>
        </div>
        <div>
          <DataTable
            data={this.state.greenhouses}
            dateUpdate={this.state.dateComp}
          />
        </div>

        <Footer
          className="green darken-4"
          copyrights="Powered by: Instituto de Física"
          links={
            <div className="col s12">
              <p className="grey-text text-lighten-4">Apoyan:</p>
              <img
                src="/resources/logos/logo_e1.png"
                alt=""
                width="33%"
                style={{ padding: "10px" }}
              />
              <img
                src="/resources/logos/logo_e2.png"
                alt=""
                width="33%"
                style={{ padding: "10px" }}
              />
              <img
                src="/resources/logos/logo_e3.png"
                alt=""
                width="33%"
                style={{ padding: "10px" }}
              />
              <img
                src="/resources/logos/logo_e4.png"
                alt=""
                width="100%"
                style={{ padding: "10px" }}
              />
              <img
                src="/resources/logos/logo_e5.png"
                alt=""
                width="100%"
                style={{ padding: "10px" }}
              />
            </div>
          }
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
                <img width="300px" src={udeaLogo} alt="" />
              </a>
              <div
                style={{
                  paddingTop: "1rem",
                  paddingLeft: "50%",
                  fontSize: "0.8rem",
                }}
              >
                Versión: {version}
              </div>
            </div>
          }
        >
          <h3 className="white-text">{this.state.title}</h3>
          <p className="grey-text text-lighten-4">{this.state.footNote}</p>
          <p className="grey-text text-lighten-4">
            Contáctanos:{" "}
            <a href="mailto:fabian.castano@udea.edu.co?Subject=[Proyecto%20Invernadero]">
              <MdEmail size="2em" color="#FFFFFF" />
            </a>{" "}
          </p>
          <h5 className="grey-text text-lighten-4">
            Nos han visitado <b>{this.state.visitCount}</b> veces
          </h5>
        </Footer>
      </div>
    );
  }
}

export default MainFrame;
