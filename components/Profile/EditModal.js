import { updateProfile } from "@firebase/auth";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { authService } from "../../navigation/AuthProvider";

export default EditModal = ({
  modalVisible,
  setModalVisible,
  loggedInUser,
  setLoggedInUser,
}) => {
  const { uid, displayName, photoURL, email } = loggedInUser;
  const { register, setValue, handleSubmit, watch, getValues } = useForm();
  useEffect(() => {
    register("username", { required: true });
    setValue("username", displayName ? displayName : "이름변경");
  }, [register]);
  const onValid = async () => {
    const { username } = getValues();
    updateProfile(authService.currentUser, {
      displayName: username,
    });
    const newUser = {
      createdAt: loggedInUser.createdAt,
      displayName: username,
      email: loggedInUser.email,
      photoURL: loggedInUser.photoURL,
      uid: loggedInUser.uid,
    };
    setLoggedInUser(newUser);
    setModalVisible(!modalVisible);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Container>
        <ModalView>
          <NameInput
            value={watch("username")}
            onChangeText={(text) => setValue("username", text)}
          />
          <BtnContainer>
            <BtnView
              onPress={() => {
                setValue("username", displayName ? displayName : "이름변경");
                setModalVisible(!modalVisible);
              }}
              style={{ backgroundColor: "rgba(255, 77, 79, 0.2)" }}
            >
              <BtnText style={{ color: "#a82e2e" }}>취소</BtnText>
            </BtnView>
            <BtnView
              style={{ backgroundColor: "rgba(82, 196, 26, 0.2)" }}
              onPress={handleSubmit(onValid)}
            >
              <BtnText style={{ color: "#52c41a" }}>변경</BtnText>
            </BtnView>
          </BtnContainer>
        </ModalView>
      </Container>
    </Modal>
  );
};
const BtnView = styled.TouchableOpacity`
  padding: 15px 25px;
  border-radius: 15px;
  background-color: red;
  margin: 5px 10px;
`;
const BtnText = styled.Text`
  font-size: 15px;
  font-family: "BM-Air";
`;
const BtnContainer = styled.View`
  flex-direction: row;
`;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ModalView = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 90%;
  border-radius: 25px;
  padding: 35px;
`;
const NameInput = styled.TextInput`
  font-size: 35px;
  font-family: "BM-Pro";
`;
