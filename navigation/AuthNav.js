import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignupScreen";

const Stack = createStackNavigator();

export default AuthNav = ({ setLoggedInUser }) => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen
        name="LoginScreen"
        children={() => <LoginScreen setLoggedInUser={setLoggedInUser} />}
      ></Stack.Screen>
      <Stack.Screen
        name="SignUpScreen"
        children={() => <SignUpScreen setLoggedInUser={setLoggedInUser} />}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
