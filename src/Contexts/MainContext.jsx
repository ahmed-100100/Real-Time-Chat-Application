import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
export let MainContext = createContext("");
export function MainContextProvider({ children }) {
  let [logged, setLogged] = useState(false);
  const navigate = useNavigate();
  function logOut() {
    setLogged(false);
    navigate("/");
  }
  return (
    <MainContext.Provider value={{ logged, setLogged, logOut }}>
      {children}
    </MainContext.Provider>
  );
}
MainContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
