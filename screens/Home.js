import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../components/dimension";
import { FloatingAction } from "react-native-floating-action";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Todo from "../components/Home/Todo";
import Collapsible from "react-native-collapsible";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { dbService } from "../navigation/AuthProvider";
import { subTitle } from "../components/utils/subTitle";
export default Home = ({ loggedInUser }) => {
  let random;
  const [motivation, setMotivation] = useState();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [todos, setTodos] = useState([]);
  const [checkTodo, setCheckTodo] = useState([]);
  const getTodo = async () => {
    const q = query(
      collection(dbService, "todo"),
      where("uid", "==", loggedInUser.uid),
      where("isFinished", "==", false),
      orderBy("deadline", "asc")
    );
    await onSnapshot(q, (snapShot) => {
      const todoArray = snapShot.docs.map((todoDoc) => {
        if (!todoDoc.data().isChecked) {
          return {
            id: todoDoc.id,
            ...todoDoc.data(),
          };
        } else {
          return null;
        }
      });
      const checkedArray = snapShot.docs.map((todoDoc) => {
        if (todoDoc.data().isChecked) {
          const today = new Date();
          console.log(todoDoc.data().todo);
          console.log("TODAY", today.valueOf());
          console.log("DEADLINE", todoDoc.data().deadline);
          if (today.valueOf() > todoDoc.data().deadline) {
            updateDoc(doc(dbService, `todo/${todoDoc.id}`), {
              isFinished: true,
            });
            return null;
          }
          return {
            id: todoDoc.id,
            ...todoDoc.data(),
          };
        } else {
          return null;
        }
      });
      setTodos(todoArray);

      setCheckTodo(checkedArray);
    });
  };
  useEffect(() => {
    random = Math.floor(Math.random() * subTitle.length);
    setMotivation(subTitle[random]);
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
    <>
      <SubHeader>{motivation}</SubHeader>
      <Container contentContainerStyle={{ alignItems: "center" }}>
        {todos.map((todo) => {
          if (todo !== null) {
            return <Todo key={todo.id} todo={todo} />;
          }
        })}
        <ActionBtn
          onPress={() => setIsCollapsed((prev) => !prev)}
          style={styles.btn}
        >
          <View style={styles.innerBtn}>
            {isCollapsed ? (
              <Ionicons
                name={"caret-forward-outline"}
                size={16}
                color={"#fff"}
              />
            ) : (
              <Ionicons name={"caret-down-outline"} size={16} color={"#fff"} />
            )}

            <Text style={styles.btnText}>완료됨</Text>
          </View>
        </ActionBtn>
        <Collapsible collapsed={isCollapsed}>
          {checkTodo.map((todo) => {
            if (todo !== null) {
              return <Todo key={todo.id} todo={todo} />;
            }
          })}
        </Collapsible>
      </Container>
      <FloatingAction
        color="rgba(0,0,0,0.3)"
        overlayColor="transparent"
        actions={actions}
      />
    </>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 15px 0px;
`;
const SubHeader = styled.Text`
  font-family: "BM-E";
  padding: 10px 20px;
  font-size: 23px;
  color: rgba(0, 0, 0, 0.7);
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
const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: "transparent",
    width: "90%",
  },
  btnText: {
    marginLeft: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  innerBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 5,
    backgroundColor: "rgba(10, 10, 10, 0.8)",
  },
});
