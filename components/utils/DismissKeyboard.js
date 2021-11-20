import { Keyboard, TouchableWithoutFeedback } from "react-native";
import React from "react";

export default function DismissKeyboard({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
      {children}
    </TouchableWithoutFeedback>
  );
}
