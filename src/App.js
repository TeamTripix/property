import React from "react";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import MyAccount from "./component/MyAccount";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/Dashboard"
            element={<ProtectedRoutes Component={Dashboard} />}
          />
          <Route
            exact
            path="/my-account"
            element={<ProtectedRoutes Component={MyAccount} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
