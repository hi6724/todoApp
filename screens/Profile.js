import { signOut } from "@firebase/auth";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { authService } from "../navigation/AuthProvider";

export default Profile = ({ loggedInUser, setLoggedInUser }) => {
  const userLogOut = async () => {
    await signOut(authService);
    setLoggedInUser(null);
  };
  return (
    <TouchableOpacity onPress={userLogOut}>
      <Text>LOGOUT</Text>
    </TouchableOpacity>
  );
};
