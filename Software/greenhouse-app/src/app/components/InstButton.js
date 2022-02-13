import React from "react";
import { useNavigate } from "react-router";

export default function InstButton(props) {
  // component props
  const { buttonLabel, pathUrl, imgDir, title } = props;

  // URL history
  const navigate = useNavigate();

  // function to handle click
  function HandleClick() {
    // alert("Se envio informacion a Google Analytics");

    navigate(pathUrl);
  }

  return (
    <div className="desc-pane" onClick={HandleClick}>
      <div className="des-pane des-content">
        <div className="des-pane des-title">{title}</div>
        <hr className="desc-line" />
      </div>
      <button className="desc-pane desc-button">
        <img className="des-pane desc-icon" src={imgDir} alt={buttonLabel} />
      </button>
    </div>
  );
}
