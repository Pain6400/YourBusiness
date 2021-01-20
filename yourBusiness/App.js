import React from 'react';
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/Utils/firebase";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Setting a timer",
  "Animated:", 
  "'ListItem.leftIcon'", 
  "'ListItem.title'",
  "Warning: Cannot update a component from inside the function body of a different component.",
  "Warning: Can't perform a React state update on an unmounted component.",
  "Non-serializable values were found in the navigation state. Check:"
]);
LogBox.ignoreAllLogs();

export default function App() {
  return <Navigation />
}

