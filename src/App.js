import React from "react";
import { createBrowserRouter } from "react-router-dom";
//pages
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Home from "./pages/home.js";

var localToken = localStorage.getItem('token');
if (localToken) {
  
  var App = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
  ]);
  
} else {
  var App = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ]);
}



export default App;