import { signOut } from "@firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import styled from "styled-components/native";
import Todo from "../components/Home/Todo";
import { authService, dbService } from "../navigation/AuthProvider";
import { useNavigation } from "@react-navigation/native";

export default Profile = ({
  loggedInUser,
  setLoggedInUser,
  finishedToDos,
  failedToDos,
  setFinishedToDos,
  setFailedToDos,
}) => {
  const navigation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const userLogOut = async () => {
    await signOut(authService);
    setLoggedInUser(null);
  };
  return (
    <Container>
      <AvatarContainer>
        <Avatar
          resizeMode="contain"
          source={require("../assets/profile.png")}
        />
        <Username>유저 이름</Username>
      </AvatarContainer>
      <WhiteBtn onPress={() => navigation.navigate("Info")}>
        <BtnText>개인정보</BtnText>
      </WhiteBtn>
      <WhiteBtn onPress={() => setIsCollapsed((prev) => !prev)}>
        <BtnText>{isCollapsed ? "내가 지금까지 해온 일들" : "숨기기"}</BtnText>
      </WhiteBtn>
      <Collapsible collapsed={isCollapsed}>
        <ScrollView>
          {finishedToDos &&
            finishedToDos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                todo={todo}
                toDos={finishedToDos}
                setToDos={setFinishedToDos}
                isFinished={true}
              />
            ))}
        </ScrollView>
      </Collapsible>
      <WhiteBtn onPress={userLogOut}>
        <BtnText>LOGOUT</BtnText>
      </WhiteBtn>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 15px;
`;
const AvatarContainer = styled.View`
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;
const Avatar = styled.Image`
  height: 125px;
  border-radius: 25px;
`;
const Username = styled.Text`
  font-family: "BM-Pro";
  font-size: 22px;
`;
const WhiteBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-bottom-width: 2px;
`;
const BtnText = styled.Text`
  font-family: "BM-Pro";
  font-size: 22px;
`;
