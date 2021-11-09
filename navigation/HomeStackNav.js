import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import Home from "../screens/Home";
import Add from "../screens/Home/Add";
import Edit from "../screens/Home/Edit";
import Recommend from "../screens/Home/Recommend";

const Stack = createStackNavigator();
export default HomeStackNav = ({
  uid,
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
            uid={uid}
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
            uid={uid}
            toDos={toDos}
            setToDos={setToDos}
            allToDos={allToDos}
            setAllToDos={setAllToDos}
          />
        )}
      />

      <Stack.Screen
        name="Recommend"
        children={() => (
          <Recommend uid={uid} toDos={toDos} setToDos={setToDos} />
        )}
      />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
};
