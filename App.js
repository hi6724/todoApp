import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./navigation/AuthNav";
import { authService } from "./navigation/AuthProvider";
import { onAuthStateChanged } from "@firebase/auth";
import { LogBox, Text, View } from "react-native";
import Nav from "./navigation/Nav";
import { useFonts } from "@expo-google-fonts/inter";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
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
          displayName: user.displayName,
          email: user.email,
          createdAt: user.metadata.creationTime,
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
      <Provider store={store}>
        <NavigationContainer>
          {loggedInUser === null ? (
            <AuthNav setLoggedInUser={setLoggedInUser} />
          ) : (
            <Nav
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          )}
        </NavigationContainer>
      </Provider>
    );
  }
}
