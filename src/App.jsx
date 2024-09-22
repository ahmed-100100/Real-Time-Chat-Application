import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
// import Navbar from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { MainContext } from "./Contexts/MainContext"
function App() {
  let { logged, setLogged, /*logOut*/ } = useContext(MainContext);
  function ProtectedRoute({ children }) {
    if (!logged) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  return (
    <div>
      {/* <Navbar logOut={logOut} /> */}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login setLogged={setLogged} />} />
          <Route path="/register" element={<Register setLogged={setLogged} />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<h1>Not Found!</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
