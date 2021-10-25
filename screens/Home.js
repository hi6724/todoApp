import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../components/dimension";
import { FloatingAction } from "react-native-floating-action";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
export default Home = () => {
  const navigation = useNavigation();
  const actions = [
    {
      name: "Recommend",
      margin: 0,
      render: () => (
        <ActionBtn onPress={() => navigation.navigate("Recommend")}>
          <Ionicons name={"heart"} size={20} color={"white"} />
          <ActionText>RECOMMEND</ActionText>
        </ActionBtn>
      ),
    },
    {
      name: "Add",
      margin: 0,
      render: () => (
        <ActionBtn onPress={() => navigation.navigate("Add")}>
          <Ionicons name={"add"} size={20} color={"white"} />
          <ActionText>ADD</ActionText>
        </ActionBtn>
      ),
    },
  ];
  return (
    <Container>
      <ItemContainer windowWidth={windowWidth}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Text>checkBox</Text>
          </TouchableOpacity>
          <View>
            <Text>Todo</Text>
            <Text>Date</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      </ItemContainer>

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
const ItemContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  background-color: aliceblue;
  width: ${(props) => props.windowWidth / 1.2};
  height: 70px;
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
  color: white;
`;
