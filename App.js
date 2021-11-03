import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./navigation/AuthNav";
import { authService } from "./navigation/AuthProvider";
import { onAuthStateChanged } from "@firebase/auth";
import { Text, View } from "react-native";
import Nav from "./navigation/Nav";
import { useFonts } from "@expo-google-fonts/inter";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  let [fontsLoaded] = useFonts({
    "BM-Pro": require("./assets/fonts/BM/BMHANNAPro.ttf"),
    "BM-E": require("./assets/fonts/BM/BMEULJIROTTF.ttf"),
    "BM-Y": require("./assets/fonts/BM/BMYEONSUNG_ttf.ttf"),
    "BM-Air": require("./assets/fonts/BM/BMHANNAAir_ttf.ttf"),
  });
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
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
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
}
