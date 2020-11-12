import React from 'react';
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/Utils/firebase";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer", "Animated:"]);
LogBox.ignoreAllLogs();

export default function App() {
  return <Navigation />
}

