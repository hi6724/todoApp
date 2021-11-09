import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Image, View } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

export default Recommend = ({ uid, toDos, setToDos }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  let date = today.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  const withoutDate = new Date(`${year}-${month + 1}-${date}T03:00:00.000Z`);
  const navigation = useNavigation();
  const handleOk = async (text) => {
    const s = await AsyncStorage.getItem(uid);
    let tempToDos;
    if (s) {
      tempToDos = JSON.parse(s);
    }
    const todoObj = {
      id: Date.now(),
      uid: uid,
      todo: text,
      startDate: withoutDate.valueOf(),
      deadline: withoutDate.valueOf(),
      isFinished: false,
      isChecked: false,
    };
    let newAllToDos;
    if (tempToDos !== undefined) {
      newAllToDos = [...tempToDos, todoObj];
    } else {
      newAllToDos = [todoObj];
    }
    let newToDos;
    if (tempToDos !== undefined) {
      newToDos = [...toDos, todoObj];
    } else {
      newToDos = [todoObj];
    }
    newToDos.sort(function (a, b) {
      return a.deadline - b.deadline;
    });
    setToDos(newToDos);
    await AsyncStorage.setItem(uid, JSON.stringify(newAllToDos));
    navigation.goBack();
  };
  return (
    <Container showsVerticalScrollIndicator={false}>
      <Title>할일추천</Title>
      <View>
        <SubTitle>비오는 날은 집에서</SubTitle>
        <ItemContainer horizontal showsHorizontalScrollIndicator={false}>
          <Item
            onPress={() =>
              Alert.alert("넷플릭스", "추가하시겠습니까?", [
                { text: "취소" },
                {
                  text: "확인",
                  onPress: () => handleOk("넷플릭스"),
                },
              ])
            }
          >
            <Image
              style={{ width: 100, height: 50 }}
              resizeMode="contain"
              source={require("../../assets/icon.png")}
            />
            <ItemText>넷플릭스</ItemText>
          </Item>
          <Item>
            <Image
              style={{ width: 100, height: 50 }}
              resizeMode="contain"
              source={require("../../assets/icon.png")}
            />
            <ItemText>요리</ItemText>
          </Item>
          <Item>
            <Image
              style={{ width: 100, height: 50 }}
              resizeMode="contain"
              source={require("../../assets/icon.png")}
            />
            <ItemText>뒹굴뒹굴</ItemText>
          </Item>
          <Item>
            <Image
              style={{ width: 100, height: 50 }}
              resizeMode="contain"
              source={require("../../assets/icon.png")}
            />
            <ItemText>웹툰보기</ItemText>
          </Item>
        </ItemContainer>
      </View>
      <View>
        <SubTitle>날씨 좋은날은 외출!</SubTitle>
        <ItemContainer horizontal showsHorizontalScrollIndicator={false}>
          <Item>
            <Image
              style={{ width: 100, height: 50 }}
              resizeMode="contain"
              source={require("../../assets/icon.png")}
            />
            <ItemText>넷플릭스</ItemText>
          </Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </ItemContainer>
      </View>
      <View>
        <SubTitle>자기계발</SubTitle>
        <ItemContainer horizontal showsHorizontalScrollIndicator={false}>
          <Item>
            <Image
              style={{ width: 100, height: 50 }}
              resizeMode="contain"
              source={require("../../assets/icon.png")}
            />
            <ItemText>넷플릭스</ItemText>
          </Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </ItemContainer>
      </View>
      <View style={{ marginBottom: 35 }}>
        <SubTitle>킬링타임</SubTitle>
        <ItemContainer horizontal showsHorizontalScrollIndicator={false}>
          <Item>
            <Image
              style={{ width: 100, height: 50 }}
              resizeMode="contain"
              source={require("../../assets/icon.png")}
            />
            <ItemText>넷플릭스</ItemText>
          </Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </ItemContainer>
      </View>
    </Container>
  );
};
const Container = styled.ScrollView`
  padding: 20px 25px;
`;
const Title = styled.Text`
  font-family: "BM-Pro";
  font-size: 32px;
  color: #051d5f;
  margin-bottom: 35px;
`;
const SubTitle = styled.Text`
  font-family: "BM-Pro";
  font-size: 20px;
`;
const ItemContainer = styled.ScrollView``;

const Item = styled.TouchableOpacity`
  justify-content: space-between;
  border-radius: 15px;
  margin: 10px 15px 10px 0px;
  width: 125px;
  height: 125px;
  padding: 10px;
  background-color: #fafafa;
`;
const ItemText = styled.Text`
  font-family: "BM-E";
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
`;
