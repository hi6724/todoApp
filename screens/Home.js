import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import CollapsedBtn from "../components/Home/CollapsedBtn";
import store from "../redux/store";
export default Home = ({
  loggedInUser,
  toDos,
  setToDos,
  allToDos,
  setAllToDos,
}) => {
  let random;
  const [motivation, setMotivation] = useState();
  const [isCollapsed, setIsCollapsed] = useState(true);

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
  }, [toDos]);
  const navigation = useNavigation();
  const actions = [
    {
      name: "Recommend",
      margin: 0,
      render: () => (
        <ActionBtn key={1} onPress={() => navigation.navigate("Recommend")}>
          <Ionicons name={"heart"} size={20} color={"white"} />
          <ActionText>할일추천</ActionText>
        </ActionBtn>
      ),
    },
    {
      name: "Add",
      margin: 0,
      render: () => (
        <ActionBtn key={2} onPress={() => navigation.navigate("Add")}>
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
        {toDos.length > 0 &&
          toDos.map((todo) => {
            if (todo !== null) {
              if (!todo.isChecked) {
                return (
                  <Todo
                    key={todo.id}
                    id={todo.id}
                    todo={todo}
                    isFinished={false}
                    toDos={toDos}
                    setToDos={setToDos}
                    allToDos={allToDos}
                    setAllToDos={setAllToDos}
                  />
                );
              }
            }
          })}
        {/* {Object.keys(toDos).map((key) => {
          if (!toDos[key].isChecked) {
            return (
              <Todo
                key={key}
                id={key}
                todo={toDos[key]}
                toDos={toDos}
                setToDos={setToDos}
                isFinished={false}
              />
            );
          }
        })} */}
        <CollapsedBtn
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          text="완료됨"
        />

        <Collapsible collapsed={isCollapsed}>
          {toDos.length > 0 &&
            toDos.map((todo) => {
              if (todo !== null) {
                if (todo.isChecked) {
                  return (
                    <Todo
                      key={todo.id}
                      id={todo.id}
                      todo={todo}
                      toDos={toDos}
                      setToDos={setToDos}
                      isFinished={false}
                    />
                  );
                }
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
