import LogImg from "../../assets/images.png";
import "./style.css";
import React, { useEffect, useRef } from "react";

export default function Chatbar({ isActiveGrop }) {
  const chatbarRef = useRef(null);

  useEffect(() => {
    const chatbar = chatbarRef.current;
    if (chatbar.scrollHeight > chatbar.clientHeight) {
      const lastBdr = chatbar.querySelector(".bdr:last-of-type");
      if (lastBdr) {
        lastBdr.classList.add("no-border");
      }
    }
  }, []);

  return (
    <div
      className={`col-lg-4 col-12 ${
        isActiveGrop ? "d-flex" : "d-none"
      } d-lg-flex h-100`}
      ref={chatbarRef}
    >
      <div className="d-flex w-100 justify-content-start Bars  flex-column">
        <div className="sections w-100 justify-content-between d-flex flex-column p-3 bg-white rounded-4 FrindsGroup mb-3">
          <p>Friends</p>
          <div className="row users">
            <div className="col-2 d-flex">
              <div className="w-100 ">
                <img src={LogImg} className="rounded-circle  w-100" />
              </div>
            </div>
            <div className="col-10  justify-content-between d-flex">
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
