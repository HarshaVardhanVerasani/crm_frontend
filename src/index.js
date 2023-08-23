import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";
import store from "./redux/store";

axios.interceptors.request.use(function (config) {
  config.headers["x-access-token"] = localStorage.getItem("accessToken");
  return config;
});

axios.interceptors.response.use(
  //fulfilled response
  function (res) {
    return res; //returning back to ui
  },
  function (err) {
    if (err.response.data.message === "Unauthorized!") {
      //once we clear the local storage then reload manually then authenticate route (useAuth) will figure out redirect to login page
      localStorage.clear();
      setTimeout(()=>{
        window.location.reload()
      },3000)
      toast("Session Timed Out Logging Out");
      return Promise.reject(err); //returning back to ui
    } else {
      //if the error code is not 401 then we return that error response to ui
      return Promise.reject(err); //returning back to ui
    }
  }
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
