import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useReducer, useState } from "react";
import { POST } from "../../api/axios";
import Joi from "joi";
import { MainContext } from "../../Contexts/MainContext";

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
  let { setLogged } = useContext(MainContext);
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [clientErrors, setClientErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState("");

  function validateData() {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%?&])[A-Za-z\\d@$!%?&]{8,}$"
          )
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
        }),
      repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords do not match",
      }),
      agree: Joi.boolean().valid(true).required().messages({
        "any.only": "Please agree with privacy policy & terms",
      }),
    });
    return schema.validate(state, { abortEarly: false });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { error } = validateData();
    if (error) {
      setServerErrors("");
      setClientErrors(error.details);
    } else {
      setClientErrors([]);
      const payload = {
        name: state.name,
        email: state.email,
        password: state.password,
      };
      POST("/api/users/register", payload)
        .then((res) => {
          if (res.data.success) {
            setLogged(true);
          }
        })
        .catch((errMessage) => {
          setClientErrors([]);
          setServerErrors(errMessage);
        });
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center rows">
        <div className="col-md-8 col-sm-10">
          {serverErrors && (
            <p className="alert alert-danger text-center my-3">
              {serverErrors}
            </p>
          )}
          {clientErrors.length > 0 &&
            clientErrors.map((err, i) => (
              <p key={i} className="alert alert-danger text-center my-3">
                {err.message}
              </p>
            ))}
          <form onSubmit={handleSubmit}>
            <div className="form row justify-content-center align-items-center p-3 my-3 mx-2">
              <div className="col-md-6 col-sm-12 p-3">
                <label htmlFor="LoginEmail">Full Name</label>
                <input
                  placeholder="John Doe"
                  type="text"
                  className="form-control p-3"
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
                  className="form-control p-3"
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
                  className="form-control p-3"
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
                  className="form-control p-3"
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
                  className="form-check-input"
                  type="checkbox"
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
                  I agree with <Link to="#">Privacy policy & terms</Link>
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
                  <button type="button" className="form-control p-3">
                    <FontAwesomeIcon icon={faGoogle} className="pe-2" />
                    <span>Google</span>
                  </button>
                </div>
                <div className="col-md-5 col-sm-12 BTnIcon">
                  <button type="button" className="form-control p-3">
                    <FontAwesomeIcon icon={faFacebook} className="pe-2" />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
              <div className="OutForm text-center mt-2">
                Already have account? <Link to={"/"}>Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}