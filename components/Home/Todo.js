import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../dimension";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { dbService } from "../../navigation/AuthProvider";
export default Todo = ({ todo }) => {
  const navigation = useNavigation();
  const newDeadline = new Date(todo.deadline);
  const deadlineMonth = newDeadline.getMonth() + 1;
  const deadlineDate = newDeadline.getDate();
  const handleEdit = () => {
    navigation.navigate("Edit", todo);
  };
  const handleDelete = () => {
    Alert.alert(
      "TODO 삭제",
      "정말 지우시겠습니까?",
      [
        {
          text: "취소",
        },
        {
          text: "삭제",
          onPress: () => {
            deleteDoc(doc(dbService, `todo/${todo.id}`));
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handleCheck = async (checkBox) => {
    if (checkBox) {
      await updateDoc(doc(dbService, `todo/${todo.id}`), { isChecked: true });
    } else {
      await updateDoc(doc(dbService, `todo/${todo.id}`), {
        isChecked: false,
        isFinished: false,
      });
    }
  };
  return (
    <ItemContainer
      onPress={handleEdit}
      windowWidth={windowWidth}
      style={styles.shadow}
    >
      <View style={{ flexDirection: "row" }}>
        <BouncyCheckbox
          isChecked={todo.isChecked}
          fillColor="red"
          unfillColor="#FFFFFF"
          onPress={handleCheck}
        />
        <View style={{ justifyContent: "center" }}>
          <TodoText>{todo.todo}</TodoText>
          <DateText>{`${deadlineMonth}.${deadlineDate} 까지`}</DateText>
        </View>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={handleDelete}
      >
        <Ionicons name={"trash-outline"} size={30} color={"grey"} />
      </TouchableOpacity>
    </ItemContainer>
  );
};
const ItemContainer = styled.TouchableOpacity`
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
const DateText = styled.Text`
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
