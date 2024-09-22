import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
export default function Register() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center rows">
        <div className="col-md-8 col-sm-10">
          <div className="form row justify-content-center align-items-center p-3 my-3 mx-2">
            <p className="title">Create Account</p>
            <div className="col-md-6 col-sm-12 p-3">
              <label htmlFor="LoginEmail">Your Name</label>
              <input
                placeholder="yourname"
                type="text"
                className=" form-control  p-3"
                id="LoginEmail"
              ></input>
            </div>
            <div className="col-md-6 col-sm-12 p-3">
              <label htmlFor="LoginEmail">Email Address</label>
              <input
                placeholder="youremail@example.com"
                type="email"
                className=" form-control p-3"
                id="LoginEmail"
              ></input>
            </div>
            <div className="col-md-6 col-sm-12 p-3">
              <label htmlFor="LoginPass">Password</label>
              <input
                placeholder="password"
                type="password"
                className=" form-control p-3"
                id="LoginPass"
              ></input>
            </div>
            <div className="col-md-6 col-sm-12 p-3">
              <label htmlFor="LoginPass">Password Repeat</label>
              <input
                placeholder="password"
                type="password"
                className=" form-control p-3"
                id="LoginPass"
              ></input>
            </div>
            <div className="col-md-12 col-sm-12 p-3">
              <input
                className="form-check-input "
                type="checkbox"
                value=""
                id="flexCheckDefault"
              ></input>
              <label
                className="form-check-label ps-2"
                htmlFor="flexCheckDefault"
              >
                I agree with <a>Privacy policy & terms</a>
              </label>
            </div>
            <div className="col-md-12 col-sm-12 p-3">
              <input
                type="submit"
                value="Account Register"
                className="LoginBtn form-control p-3"
              ></input>
            </div>
            <div className="bdr my-3 text-center"></div>
            <div className="w-100 text-center">
              <p>OR SIGNUP WITH</p>
            </div>
            <div className="row justify-content-between g-2">
              <div className="col-md-5 col-sm-12 BTnIcon">
                <button className="form-control p-3">
                  <FontAwesomeIcon icon={faGoogle} className="pe-2" />
                  <span>Google</span>
                </button>
              </div>
              <div className="col-md-5 col-sm-12 BTnIcon">
                <button className="form-control p-3">
                  <FontAwesomeIcon icon={faFacebook} className="pe-2" />
                  <span>Facebook</span>
                </button>
              </div>
            </div>
            <div className="OutForm text-center mt-2">
              Already have an account? <a>Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
