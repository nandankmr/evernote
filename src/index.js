import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyAL4mC1ZkGTJ-cNT1O_2f9iyX5spuBRcvs",
  authDomain: "evernote-59899.firebaseapp.com",
  databaseURL: "https://evernote-59899.firebaseio.com",
  projectId: "evernote-59899",
  storageBucket: "evernote-59899.appspot.com",
  messagingSenderId: "571962366536",
  appId: "1:571962366536:web:e823439fe7f9682cba167d",
  measurementId: "G-ENKWYXNNBT"
});
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("evernote-container"));


serviceWorker.unregister();
