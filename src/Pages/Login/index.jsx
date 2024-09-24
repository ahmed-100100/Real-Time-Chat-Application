import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useReducer, useState } from "react";
import { POST } from "../../api/axios";
import Joi from "joi";
import { MainContext } from "../../Contexts/MainContext";
import { tailspin } from "ldrs";

tailspin.register();

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
  let { setLogged, loading, setLoading } = useContext(MainContext);
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [errorMessage, setErrorMessage] = useState("");

  function validation() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%?&])[A-Za-z\\d@$!%?&]{8,}$"
          )
        )
        .required()
        .messages({
          "string.pattern.base": "Invalid Password",
        }),
    });
    return schema.validate(state, { abortEarly: true });
  }

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const { error } = validation();
    if (error) {
      setErrorMessage(error.message);
      return;
    } else {
      setErrorMessage("");
    }
    const payload = {
      email: state.email,
      password: state.password,
    };
    POST("/api/users/login", payload)
      .then((res) => {
        //localStorage.setItem("Token", res.data.jwt);

        if (res.data.success) {
          setLogged(true);
        }
      })
      .catch((err) => {
        setErrorMessage(err ? err : "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center rows mx-3 my-2">
      <div className="form col-md-6 col-sm-12 ">
        {errorMessage.length ? (
          <p className="alert alert-danger">{errorMessage}</p>
        ) : (
          <></>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group p-4 w-100  g-2">
            <p className="title">Login</p>
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
            />
            <div className="mt-3 d-flex justify-content-between">
              <label htmlFor="LoginPass">Password</label>
              <Link className="lin">Forget?</Link>
            </div>
            <input
              placeholder="password"
              type="password"
              className="form-control p-3"
              id="LoginPass"
              value={state.password}
              onChange={(event) =>
                dispatch({ type: "password", payload: event.target.value })
              }
            />
            {loading && errorMessage == "" ? (
              <div className="d-flex  justify-content-center p-3">
                <l-tailspin
                  size="40"
                  stroke="5"
                  speed="0.9"
                  color="black"
                ></l-tailspin>
              </div>
            ) : (
              <button type="submit" className="LoginBtn form-control p-3">
                Account Login
              </button>
            )}
            <div className="bdr my-3 text-center"></div>
            <div className="w-100 text-center">
              <p>OR LOGIN WITH</p>
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
          </div>
        </form>
        <div className="OutForm text-center mt-2">
          Don&apos;t have an account? <Link to={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
}
