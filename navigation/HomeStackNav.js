import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../screens/Home";
import Add from "../screens/Home/Add";
import Recommend from "../screens/Home/Recommend";

const Stack = createStackNavigator();
export default HomeStackNav = ({ loggedInUser }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home2"
        children={() => <Home loggedInUser={loggedInUser} />}
      />
      <Stack.Screen
        name="Add"
        children={() => <Add loggedInUser={loggedInUser} />}
      />
      <Stack.Screen
        name="Recommend"
        children={() => <Recommend loggedInUser={loggedInUser} />}
      />
    </Stack.Navigator>
  );
};
