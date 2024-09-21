import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
function App() {
  return (
    <div>
      <Register />
      <Routes>
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
