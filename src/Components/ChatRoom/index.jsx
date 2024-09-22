import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faPhone } from "@fortawesome/free-solid-svg-icons";
import LogImg from "../../assets/images.png";
import "./style.css";

export default function ChatRoom() {
  return (
    <div className="col-md-6 col-9 mt-3">
      <div className="d-flex w-100 justify-content-end ChatLive">
        <div className="w-100 justify-content-between d-flex flex-column">
          <div className="d-flex justify-content-between bg-white p-3 h-auto rounded-top-4 ">
            <div className="d-flex align-items-center">
              <div className="ImgChatBox w-25 ">
                <img className=" rounded-circle w-50" src={LogImg} />
              </div>
              <div className="ps-2">
                <span className="ChatName">Bro</span>
                <br></br>
                <span className="seen">Last seen 9:50 pm</span>
              </div>
            </div>
            <div className="d-flex align-items-center ChatLives">
              <a className="ps-3">
                <FontAwesomeIcon icon={faPhone} />
              </a>
              <a className="ps-3">
                <FontAwesomeIcon icon={faVideoCamera} />
              </a>
            </div>
          </div>
          <div className="bdr w-auto mx-4"></div>
          <div className="h-100 bg-white flex-column p-3 align-items-end rounded-bottom-4 MessageBox position-relative">
            <div className="d-flex position-absolute  inMass">
              <input></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
