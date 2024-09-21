import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useReducer } from "react";

const initialValue = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  agree: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "repeat-password":
      return { ...state, repeatPassword: action.payload };
    case "agree":
      return { ...state, agree: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export default function Register() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center rows">
        <div className="col-md-8 col-sm-10">
          <div className="form row justify-content-center align-items-center p-3 my-3 mx-2">
            <div className="col-md-6 col-sm-12 p-3">
              <label htmlFor="LoginEmail">Full Name</label>
              <input
                placeholder="John Doe"
                type="text"
                className=" form-control  p-3"
                id="LoginEmail"
                value={state.name}
                onChange={(event) =>
                  dispatch({ type: "name", payload: event.target.value })
                }
              ></input>
            </div>
            <div className="col-md-6 col-sm-12 p-3">
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
            </div>
            <div className="col-md-6 col-sm-12 p-3">
              <label htmlFor="LoginPass">Password</label>
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
            </div>
            <div className="col-md-6 col-sm-12 p-3">
              <label htmlFor="LoginRepeatPass">Repeat Password</label>
              <input
                placeholder="Repeat password"
                type="password"
                className=" form-control p-3"
                id="LoginRepeatPass"
                value={state.repeatPassword}
                onChange={(event) =>
                  dispatch({
                    type: "repeat-password",
                    payload: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className="col-md-12 col-sm-12 p-3">
              <input
                className="form-check-input "
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={state.agree}
                onChange={(event) =>
                  dispatch({
                    type: "agree",
                    payload: event.target.checked,
                  })
                }
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
              Already have account? <Link to={"/"}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
