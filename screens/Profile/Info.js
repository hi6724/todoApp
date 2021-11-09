import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { authService } from "../../navigation/AuthProvider";

export default Info = ({ loggedInUser }) => {
  const { uid } = loggedInUser;
  const { email, lastLoginAt, photoURL, displayName } = authService.currentUser;
  console.log(authService.currentUser);
  console.log(email, lastLoginAt, photoURL, displayName);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "black" }}>Me</Text>
    </View>
  );
};
