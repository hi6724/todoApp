import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../../components/dimension";
import { useNavigation } from "@react-navigation/native";
import { updateEmail, updateProfile } from "@firebase/auth";
import { authService } from "../../navigation/AuthProvider";
import DismissKeyboard from "../../components/utils/DismissKeyboard";

export default Info = ({ loggedInUser, setLoggedInUser }) => {
  const navigation = useNavigation();
  const { register, setValue, handleSubmit, watch, getValues } = useForm();
  const { uid, displayName, photoURL, email } = loggedInUser;
  const onValid = async () => {
    const { username, email } = getValues();
    updateProfile(authService.currentUser, {
      displayName: username,
    });
    updateEmail(authService.currentUser, email);
    const newUser = {
      createdAt: loggedInUser.createdAt,
      displayName: username,
      email,
      photoURL: loggedInUser.photoURL,
      uid: loggedInUser.uid,
    };
    setLoggedInUser(newUser);
    navigation.goBack();
  };
  useEffect(() => {
    register("username", { required: true });
    setValue("username", displayName ? displayName : "유저이름");
    register("email", { required: true });
    setValue("email", email ? email : "이메일");
  }, [register]);

  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
          <AvatarContainer
          // onPress={() => navigation.navigate("Upload")}
          >
            <Avatar
              resizeMode="contain"
              source={
                loggedInUser.photoURL
                  ? loggedInUser.photoURL
                  : require("../../assets/profile.png")
              }
            />
          </AvatarContainer>
          <WhiteBtn>
            <Input
              value={watch("username")}
              onChangeText={(text) => setValue("username", text)}
            />
          </WhiteBtn>
          <WhiteBtn>
            <BtnText>{email}</BtnText>
          </WhiteBtn>
        </KeyboardAvoidingView>
        <BtnContainer windowWidth={windowWidth}>
          <BasicBtn
            windowWidth={windowWidth}
            onPress={() => navigation.goBack()}
          >
            <BasicBtnText>취소</BasicBtnText>
          </BasicBtn>
          <BasicBtn windowWidth={windowWidth} onPress={handleSubmit(onValid)}>
            <BasicBtnText>변경</BasicBtnText>
          </BasicBtn>
        </BtnContainer>
      </Container>
    </DismissKeyboard>
  );
};

const Container = styled.View`
  position: relative;
  flex: 1;
  height: 100%;
  padding: 15px;
  justify-content: space-between;
`;
const AvatarContainer = styled.TouchableOpacity`
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

const WhiteBtn = styled.View`
  width: 100%;
  padding: 15px;
  border-bottom-width: 2px;
`;
const Input = styled.TextInput`
  font-family: "BM-Pro";
  font-size: 22px;
`;
const BtnText = styled.Text`
  font-family: "BM-Pro";
  font-size: 22px;
`;
const BtnContainer = styled.View`
  width: ${(props) => props.windowWidth}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const BasicBtn = styled.TouchableOpacity`
  width: ${(props) => props.windowWidth / 2.4}px;
  margin: 0px 10px;
  background-color: #fff;
  border-radius: 15px;
  align-items: center;
  padding: 10px 16px;
`;
const BasicBtnText = styled.Text`
  font-size: 16px;
  font-family: "BM-Air";
`;
