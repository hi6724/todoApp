import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../components/dimension";
import { FloatingAction } from "react-native-floating-action";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Todo from "../components/Home/Todo";
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { dbService } from "../navigation/AuthProvider";
export default Home = ({ loggedInUser }) => {
  const [todos, setTodos] = useState([]);
  const getTodo = async () => {
    const q = query(collection(dbService, "todo"), orderBy("deadline", "desc"));

    await onSnapshot(q, (snapShot) => {
      const todoArray = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTodos(todoArray);
    });
  };
  useEffect(() => {
    getTodo();
  }, []);
  const navigation = useNavigation();
  const actions = [
    {
      name: "Recommend",
      margin: 0,
      render: () => (
        <ActionBtn onPress={() => navigation.navigate("Recommend")}>
          <Ionicons name={"heart"} size={20} color={"white"} />
          <ActionText>할일추천</ActionText>
        </ActionBtn>
      ),
    },
    {
      name: "Add",
      margin: 0,
      render: () => (
        <ActionBtn onPress={() => navigation.navigate("Add")}>
          <Ionicons name={"add"} size={20} color={"white"} />
          <ActionText>추가</ActionText>
        </ActionBtn>
      ),
    },
  ];

  return (
    <Container>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}

      <FloatingAction
        color="rgba(0,0,0,0.3)"
        overlayColor="transparent"
        actions={actions}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 15px 0px;
  align-items: center;
`;

const ActionBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.7);
  width: 150px;
  padding: 15px;
  border-radius: 15px;
`;
const ActionText = styled.Text`
  font-family: "BM-Air";
  font-size: 18px;
  color: white;
`;
