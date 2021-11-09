import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Edit from "../screens/Home/Edit";
import Profile from "../screens/Profile";
import Info from "../screens/Profile/Info";

const Stack = createStackNavigator();
export default ProfileStackNav = ({
  loggedInUser,
  setLoggedInUser,
  finishedToDos,
  failedToDos,
  setFinishedToDos,
  setFailedToDos,
}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Profile2"
        children={() => (
          <Profile
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
            finishedToDos={finishedToDos}
            failedToDos={failedToDos}
            setFinishedToDos={setFinishedToDos}
            setFailedToDos={setFailedToDos}
          />
        )}
      />
      <Stack.Screen
        name="Info"
        children={() => <Info loggedInUser={loggedInUser} />}
      />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
};
