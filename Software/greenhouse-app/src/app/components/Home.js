import React from "react";
import { Footer } from "react-materialize";
import { FaGithubSquare, FaYoutubeSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// local imports
import InstButton from "./InstButton";
import { version } from "../../dataConfig/autobuild_version";
const udeaLogo = "resources/logos/UdeALogo.png";

export default function Home() {
  return (
    <div>
      {/** Navigation */}
      <nav className="light-blue darken-4">
        <div className="container" style={{ height: "100px" }}>
          <a className="brand-logo" href="/">
            Huerta 4.0, El Internet de la Huerta
          </a>
        </div>
      </nav>

      <div style={{ height: "10%" }}></div>
      <div className="row">
        <div className="col s10 offset-s2">
          <div className="SimButton">
            <InstButton
              buttonLabel="JFK"
              pathUrl="/jfk"
              imgDir="resources/Icons/IconJFK.jpg"
              title="Huerta JFK"
              textInfo="Proyecto Huerta 4.0 desarrollado por la escuela la Paz de Envigado"
            />
          </div>
          <div className="SimButton">
            <InstButton
              buttonLabel="UdeA"
              pathUrl="/udea"
              imgDir="resources/Icons/IconUdeA.jpg"
              title="Huerta UdeA"
              textInfo="Proyecto Huerta 4.0 desarrollado por la Universidad de Antioquia"
            />
          </div>
        </div>
      </div>

      <Footer
        className="green darken-4"
        copyrights="Powered by: Instituto de Física"
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
      ></Footer>
    </div>
  );
}
