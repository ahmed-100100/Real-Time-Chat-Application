import { useContext, useState } from "react";
import Pic from "../../assets/images.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMessage,
  faBell,
  faGear,
  faDoorOpen,
  faUserGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../Contexts/MainContext";

export default function Navbar({
  setisActiveGrop,
  setisActiveUser,
  setisActiveChat,
}) {
  const { logOut } = useContext(MainContext);
  return (
    <div className="col-lg-1 col-12">
      <div className="p-2 NavSide row flex-lg-column flex-row  align-items-center position-relative justify-content-center  rounded-4 h-100">
        <div className="col-lg-12 col-2  my-auto">
          <div className="w-100  text-center">
            <img src={Pic} className="w-100 rounded-circle" />
          </div>
        </div>
        <div className=" col-lg-10 col-6  my-auto text-center d-flex justify-content-between flex-lg-column flex-row">
          <div className="my-4">
            <a>
              <FontAwesomeIcon
                className="NavSideIc"
                icon={faMessage}
                onClick={() => {
                  setisActiveChat(true);
                  setisActiveGrop(false);
                  setisActiveUser(false);
                }}
              />
            </a>
          </div>
          <div className="my-4">
            <a>
              <FontAwesomeIcon
                className="NavSideIc"
                icon={faUserGroup}
                onClick={() => {
                  setisActiveChat(false);
                  setisActiveGrop(true);
                  setisActiveUser(false);
                }}
              />
            </a>
          </div>
          <div className="my-4 ">
            <a>
              <FontAwesomeIcon
                className="NavSideIc"
                icon={faUser}
                onClick={() => {
                  setisActiveChat(false);
                  setisActiveGrop(false);
                  setisActiveUser(true);
                }}
              />
            </a>
          </div>
        </div>
        <div className=" my-auto text-center col-lg-10 col-3 flex-lg-column flex-sm-row">
          <div className="my-4">
            <a onClick={() => logOut()}>
              <FontAwesomeIcon className="Door" icon={faDoorOpen} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
