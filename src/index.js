import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyAL4mC1ZkGTJ-cNT1O_2f9iyX5spuBRcvs",
  authDomain: "evernote-59899.firebaseapp.com",
  databaseURL: "https://evernote-59899.firebaseio.com",
  projectId: "evernote-59899",
  storageBucket: "evernote-59899.appspot.com",
  messagingSenderId: "571962366536",
  appId: "1:571962366536:web:e823439fe7f9682cba167d",
  measurementId: "G-ENKWYXNNBT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("evernote-container"));
