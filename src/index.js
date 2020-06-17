import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App"

import { toast, Zoom } from 'react-toastify';


toast.configure({
  transition: Zoom,
  position: toast.POSITION.TOP_CENTER,
  hideProgressBar: true,
  autoClose: 1500,
})


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
