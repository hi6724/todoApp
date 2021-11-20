import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatGrid } from "react-native-super-grid";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { windowWidth } from "../../components/dimension";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default Detail = ({ route }) => {
  console.log("ROUTE", route);
  const {
    params: { todos, isFinished, setToDos },
  } = route;
  const [currentToDos, setCurrentToDos] = useState(todos);
  useEffect(() => {
    console.log("HELLO");
  }, [todos]);
  const handlerLongClick = (item) => {
    //handler for Long Click
    handleDelete(item);
  };

  const handleDelete = (item) => {
    Alert.alert(
      "TODO 삭제",
      "정말 지우시겠습니까?",
      [
        {
          text: "취소",
        },
        {
          text: "삭제",
          onPress: async () => {
            const s = await AsyncStorage.getItem(item.uid);
            let tempToDos;
            if (s) {
              tempToDos = JSON.parse(s);
            }
            const newAllToDos = tempToDos.filter((todo) => todo.id !== item.id);
            const newToDos = todos.filter((todo) => todo.id !== item.id);
            await AsyncStorage.setItem(item.uid, JSON.stringify(newAllToDos));
            setToDos(newToDos);
            setCurrentToDos(newToDos);
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Container>
      <Header style={styles.shadow}>
        <HeaderText isFinished={isFinished}>
          {isFinished ? "내가 해낸 일들" : "아직 못한 일들"}
        </HeaderText>
      </Header>

      <FlatGrid
        itemDimension={windowWidth / 3}
        data={currentToDos}
        spacing={10}
        renderItem={({ item }) => {
          return (
            <ItemContainer
              style={styles.shadow}
              onPress={() => handlerLongClick(item)}
            >
              <TodoText isFinished={isFinished} numberOfLines={3}>
                {item.todo}
              </TodoText>
              <DeadlineText isFinished={isFinished}>
                {new Date(item.deadline).toISOString().slice(5, 10)}까지
              </DeadlineText>
            </ItemContainer>
          );
        }}
      />
    </Container>
  );
};

const Header = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: white;
`;
const HeaderText = styled.Text`
  font-family: "BM-Y";
  font-size: 28px;
  color: black;
`;

const Container = styled.View`
  padding: 15px 25px;
  flex: 1;
`;
const ItemContainer = styled.TouchableOpacity`
  background-color: white;
  padding: 15px;
  width: 150px;
  height: 160px;
`;
const TodoText = styled.Text`
  overflow: hidden;
  font-family: "BM-Pro";
  font-size: 23px;
  color: ${(props) => (props.isFinished ? "#52c41a" : "#ff4d4f")};
`;
const DeadlineText = styled.Text`
  font-family: "BM-Air";
  font-size: 15px;
  color: ${(props) => (props.isFinished ? "#52c41a" : "#ff4d4f")};
`;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
});
