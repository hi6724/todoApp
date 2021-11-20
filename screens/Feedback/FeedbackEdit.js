import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default Edit = ({ route }) => {
  const {
    params: { uid, id, todo, toDos, setToDos },
  } = route;

  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={() => Keyboard.dismiss()}
    >
      <Container>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>{"asd"}</Text>
          <TouchableOpacity>
            <Ionicons name={"heart"} size={20} color={"red"} />
          </TouchableOpacity>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  padding: 20px 25px;
  justify-content: space-between;
  flex: 1;
`;
const Title = styled.Text`
  font-family: "BM-Pro";
  font-size: 32px;
  color: #051d5f;
`;
const BtnContainer = styled.View`
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
const BtnText = styled.Text`
  font-size: 16px;
  font-family: "BM-Air";
`;
const SubText = styled.Text`
  font-family: "BM-Pro";
  font-size: 20px;
  color: rgba(125, 125, 125, 0.5);
  /* margin: 20px 0px; */
`;
const styles = StyleSheet.create({
  title: {
    fontFamily: "BM-Pro",
    fontSize: 32,
    color: "#051d5f",
  },
});
