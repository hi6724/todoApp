import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../dimension";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";
export default Todo = ({ todo }) => {
  const newDeadline = todo.deadline.split("-");
  console.log(todo);
  return (
    <ItemContainer windowWidth={windowWidth} style={styles.shadow}>
      <View style={{ flexDirection: "row" }}>
        <BouncyCheckbox fillColor="red" unfillColor="#FFFFFF" />
        <View style={{ justifyContent: "center" }}>
          <TodoText>{todo.todo}</TodoText>
          <Date>{`${newDeadline[1]}.${newDeadline[2]} 까지`}</Date>
        </View>
      </View>
      <TouchableOpacity style={{ margin: 10 }} onPress={() => alert("Edit")}>
        <Ionicons name={"create-outline"} size={25} color={"grey"} />
      </TouchableOpacity>
    </ItemContainer>
  );
};
const ItemContainer = styled.View`
  padding: 15px 15px;
  justify-content: space-between;
  flex-direction: row;
  background-color: #fafafa;
  width: ${(props) => props.windowWidth / 1.1}px;
  height: 100px;
  border-radius: 25px;
  margin: 5px 0px;
`;
const TodoText = styled.Text`
  font-size: 20px;
  font-family: "BM-Pro";
`;
const Date = styled.Text`
  font-size: 16px;
  font-family: "BM-Air";
  opacity: 0.3;
`;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
