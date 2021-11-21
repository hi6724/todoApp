import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Detail from "../screens/Feedback/Detail";
import Edit from "../screens/Home/Edit";
import Profile from "../screens/Profile";
import Info from "../screens/Profile/Info";
import Upload from "../screens/Profile/Upload";

const Stack = createStackNavigator();
export default ProfileStackNav = ({
  loggedInUser,
  setLoggedInUser,
  finishedToDos,
  failedToDos,
  setFinishedToDos,
  setFailedToDos,
  setToDos,
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
            setToDos={setToDos}
          />
        )}
      />
      <Stack.Screen
        name="Info"
        children={() => (
          <Info loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        )}
      />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
