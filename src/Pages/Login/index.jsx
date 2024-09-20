import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  return (
    <div className="row justify-content-center align-items-center rows">
      <div className="col-md-6 col-sm-12 ">
        <form className="form-group p-4 w-100  g-2">
          <p className="title">Login</p>
          <label for="LoginEmail">Email Address</label>
          <input
            placeholder="youremail@example.com"
            type="email"
            className=" form-control p-3"
            id="LoginEmail"
          ></input>
          <div className="mt-3 d-flex justify-content-between">
            <label for="LoginPass">Password</label>
            <a className="lin">Forget ?</a>
          </div>
          <input
            placeholder="password"
            type="password"
            className=" form-control p-3"
            id="LoginPass"
          ></input>
          <input
            type="submit"
            value="Account Login"
            className="LoginBtn form-control p-3"
          ></input>
          <div className="bdr my-3 text-center"></div>
          <div className="w-100 text-center">
            <p>OR lOGIN WITH</p>
          </div>
          <div className="BTnIcon d-flex justify-content-between">
            <button className="form-control p-1 me-5">
              <FontAwesomeIcon icon={faGoogle} className="pe-2" />
              <span>Google</span>
            </button>
            <button className="form-control p-2s ms-5">
              <FontAwesomeIcon icon={faFacebook} className="pe-2" />
              <span>Facebook</span>
            </button>
          </div>
        </form>
        <div className="OutForm text-center mt-2">
          Don't have an account? <a>Register</a>
        </div>
      </div>
    </div>
  );
}
