import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faPhone } from "@fortawesome/free-solid-svg-icons";
import LogImg from "../../assets/images.png";

export default function Chatbar() {
  return (
    <div className="col-md-4 col-3 mt-3">
      <div className="d-flex w-100 justify-content-start Bars  h-100 flex-column">
        <div className="w-100 justify-content-between d-flex flex-column p-3 bg-white rounded-4 FrindsGroup mb-3">
          <p>Friends</p>
          <div className="row users">
            <div className="col-md-2 col-sm-10 d-flex">
              <div className="w-100 ">
                <img src={LogImg} className="rounded-circle  w-100" />
              </div>
            </div>
            <div className="col-md-10  justify-content-between d-none d-md-flex">
              <div>
                <span className="ChatName">Bro</span>
                <br></br>
                <span className="seen">Last seen 9:50 pm</span>
              </div>
              <div className="LastSeen">
                <span>Today, 9:52pm</span>
              </div>
            </div>
          </div>
          <div className="bdr my-3"></div>
          <div className="row users">
            <div className="col-md-2 col-sm-10 d-flex">
              <div className="w-100 ">
                <img src={LogImg} className="rounded-circle  w-100" />
              </div>
            </div>
            <div className="col-md-10  justify-content-between d-none d-md-flex">
              <div>
                <span className="ChatName">Bro</span>
                <br></br>
                <span className="seen">Last seen 9:50 pm</span>
              </div>
              <div className="LastSeen">
                <span>Today, 9:52pm</span>
              </div>
            </div>
          </div>
          <div className="bdr my-3"></div>
          <div className="row users">
            <div className="col-md-2 col-sm-10 d-flex">
              <div className="w-100 ">
                <img src={LogImg} className="rounded-circle  w-100" />
              </div>
            </div>
            <div className="col-md-10  justify-content-between d-none d-md-flex">
              <div>
                <span className="ChatName">Bro</span>
                <br></br>
                <span className="seen">Last seen 9:50 pm</span>
              </div>
              <div className="LastSeen">
                <span>Today, 9:52pm</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 justify-content-between d-flex flex-column p-3 bg-white rounded-4 FrindsGroup mb-3">
          <p>Groups</p>
          <div className="row users">
            <div className="col-md-2 col-sm-10 d-flex">
              <div className="w-100 ">
                <img src={LogImg} className="rounded-circle  w-100" />
              </div>
            </div>
            <div className="col-md-10  justify-content-between d-none d-md-flex">
              <div>
                <span className="ChatName">Bro</span>
                <br></br>
                <span className="seen">Last seen 9:50 pm</span>
              </div>
              <div className="LastSeen">
                <span>Today, 9:52pm</span>
              </div>
            </div>
          </div>
          <div className="bdr my-3"></div>
          <div className="row users">
            <div className="col-md-2 col-sm-10 d-flex">
              <div className="w-100 ">
                <img src={LogImg} className="rounded-circle  w-100" />
              </div>
            </div>
            <div className="col-md-10  justify-content-between d-none d-md-flex">
              <div>
                <span className="ChatName">Bro</span>
                <br></br>
                <span className="seen">Last seen 9:50 pm</span>
              </div>
              <div className="LastSeen">
                <span>Today, 9:52pm</span>
              </div>
            </div>
          </div>
          <div className="bdr my-3"></div>
          <div className="row users">
            <div className="col-md-2 col-sm-10 d-flex">
              <div className="w-100 ">
                <img src={LogImg} className="rounded-circle  w-100" />
              </div>
            </div>
            <div className="col-md-10  justify-content-between d-none d-md-flex">
              <div>
                <span className="ChatName">Bro</span>
                <br></br>
                <span className="seen">Last seen 9:50 pm</span>
              </div>
              <div className="LastSeen">
                <span>Today, 9:52pm</span>
              </div>
            </div>
          </div>
          <div className="bdr my-3"></div>
        </div>
      </div>
    </div>
  );
}
