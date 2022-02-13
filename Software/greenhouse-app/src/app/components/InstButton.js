import React from "react";
import { useNavigate } from "react-router";
import { Card, Row, Col, Icon, CardTitle } from "react-materialize";

export default function InstButton(props) {
  // component props
  const { buttonLabel, pathUrl, imgDir, title, textInfo } = props;

  // URL history
  const navigate = useNavigate();

  // function to handle click
  function HandleClick() {
    // alert("Se envio informacion a Google Analytics");

    navigate(pathUrl);
  }

  return (
    <Row>
      <Col m={6} s={12}>
        <Card
          className="teal z-depth-3"
          actions={[
            <a
              className="waves-effect waves-light btn-large white-text text-bold"
              key="1"
              onClick={HandleClick}
            >
              Ingrese a la huerta
            </a>,
          ]}
          header={<CardTitle image={imgDir} width={100} />}
          horizontal
          revealIcon={<Icon>more_vert</Icon>}
        >
          <span className="card-title activator white-text text-bold ">
            {title}
          </span>
          <hr className="white"></hr>
          <p className="white-text">{textInfo}</p>
        </Card>
      </Col>
    </Row>
  );
}
