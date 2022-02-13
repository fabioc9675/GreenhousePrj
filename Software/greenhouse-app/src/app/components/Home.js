import React from "react";

// local imports
import InstButton from "./InstButton";

export default function Home() {
  return (
    <div className="MainFrame">
      <div className="SimButton">
        <InstButton
          buttonLabel="UdeA"
          pathUrl="/udea"
          imgDir="resources/logos/UdeALogo.png"
          title="UdeA"
        />
      </div>
      <div className="SimButton">
        <InstButton
          buttonLabel="JFK"
          pathUrl="/jfk"
          imgDir="resources/logos/IELaPaz.png"
          title="JFK"
        />
      </div>
    </div>
  );
}
