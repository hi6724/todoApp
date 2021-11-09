import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Feedback from "../screens/Feedback/Feedback";

const Stack = createStackNavigator();
export default FeedbackStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Feedback2" children={() => <Feedback />} />
    </Stack.Navigator>
  );
};
