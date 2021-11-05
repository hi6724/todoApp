import React from "react";
import { Text, View } from "react-native";
import Todo from "../../components/Home/Todo";

export default Edit = ({ route }) => {
  console.log("EDITPAGE", route);
  return <Todo todo={route.params} />;
};
