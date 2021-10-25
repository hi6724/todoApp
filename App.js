import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./navigation/AuthNav";
import { authService } from "./navigation/AuthProvider";
import { onAuthStateChanged } from "@firebase/auth";
import { Text, View } from "react-native";
import Nav from "./navigation/Nav";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, (user) => {
      if (user) {
        const userObj = {
          uid: user.uid,
          photoURL: user.photoURL,
        };
        setLoggedInUser(userObj);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {loggedInUser === null ? (
        <AuthNav />
      ) : (
        <Nav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      )}
    </NavigationContainer>
  );
}
