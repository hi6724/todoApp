import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Detail from "../screens/Feedback/Detail";
import Feedback from "../screens/Feedback/Feedback";
import FeedbackEdit from "../screens/Feedback/FeedbackEdit";

const Stack = createStackNavigator();
export default FeedbackStackNav = (data) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Feedback2"
        children={() => <Feedback data={data} />}
      />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
