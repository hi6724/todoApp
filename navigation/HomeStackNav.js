import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import Home from "../screens/Home";
import Add from "../screens/Home/Add";
import Edit from "../screens/Home/Edit";
import Recommend from "../screens/Home/Recommend";

const Stack = createStackNavigator();
export default HomeStackNav = ({
  loggedInUser,
  toDos,
  setToDos,
  allToDos,
  setAllToDos,
}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home2"
        children={() => (
          <Home
            loggedInUser={loggedInUser}
            toDos={toDos}
            setToDos={setToDos}
            allToDos={allToDos}
            setAllToDos={setAllToDos}
          />
        )}
      />
      <Stack.Screen
        name="Add"
        children={() => (
          <Add
            loggedInUser={loggedInUser}
            toDos={toDos}
            setToDos={setToDos}
            allToDos={allToDos}
            setAllToDos={setAllToDos}
          />
        )}
      />
      <Stack.Screen
        name="Recommend"
        children={() => <Recommend loggedInUser={loggedInUser} />}
      />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
};
