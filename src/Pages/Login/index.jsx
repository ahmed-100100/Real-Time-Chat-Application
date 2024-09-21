import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useReducer } from "react";

const initialValue = {
  email: "",
  password: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <div className="row justify-content-center align-items-center rows mx-3 my-2">
      <div className="form col-md-6 col-sm-12 ">
        <div className="form-group p-4 w-100  g-2">
          <p className="title">Login</p>
          <label htmlFor="LoginEmail">Email Address</label>
          <input
            placeholder="youremail@example.com"
            type="email"
            className=" form-control p-3"
            id="LoginEmail"
            value={state.email}
            onChange={(event) =>
              dispatch({ type: "email", payload: event.target.value })
            }
          ></input>
          <div className="mt-3 d-flex justify-content-between">
            <label htmlFor="LoginPass">Password</label>
            <a className="lin">Forget ?</a>
          </div>
          <input
            placeholder="password"
            type="password"
            className=" form-control p-3"
            id="LoginPass"
            value={state.password}
            onChange={(event) =>
              dispatch({ type: "password", payload: event.target.value })
            }
          ></input>
          <button type="button" className="LoginBtn form-control p-3">
            Account Login
          </button>
          <div className="bdr my-3 text-center"></div>
          <div className="w-100 text-center">
            <p>OR lOGIN WITH</p>
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
        </div>
        <div className="OutForm text-center mt-2">
          Don&apos;t have an account? <Link to={"register"}>Register</Link>
        </div>
      </div>
    </div>
  );
}
