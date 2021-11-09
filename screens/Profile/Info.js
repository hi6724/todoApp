import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default Info = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>Me</Text>
    </View>
  );
};
