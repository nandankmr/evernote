import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
const firebase = require("firebase");


// Initialize Firebase
firebase.initializeApp(require("./config"));
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("evernote-container"));
