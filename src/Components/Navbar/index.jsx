import React from "react";
import Pic from "../../assets/images.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMessage,
  faBell,
  faGear,
  faDoorClosed,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div className="col-md-1 col-12 mt-3">
      <div className="p-2 NavSide row flex-md-column flex-row  align-items-center position-relative  rounded-4 h-100">
        <div className="col-md-10 col-3  my-auto">
          <div className="w-100">
            <img src={Pic} className="w-75 rounded-circle" />
          </div>
        </div>
        <div className=" col-md-10 col-6  my-auto text-center d-flex justify-content-between flex-md-column flex-row">
          <div className="my-4 ">
            <a href="chatbar">
              <FontAwesomeIcon className="NavSideIc" icon={faHouse} />
            </a>
          </div>
          <div className="my-4">
            <a>
              <FontAwesomeIcon className="NavSideIc" icon={faMessage} />
            </a>
          </div>
          <div className="my-4">
            <a>
              <FontAwesomeIcon className="NavSideIc" icon={faBell} />
            </a>
          </div>
          <div className="my-4">
            <a>
              <FontAwesomeIcon className="NavSideIc" icon={faGear} />
            </a>
          </div>
        </div>
        <div className=" my-auto text-center col-md-10 col-3 flex-md-column flex-sm-row">
          <div className="my-4">
            <a>
              <FontAwesomeIcon className="Door" icon={faDoorClosed} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
