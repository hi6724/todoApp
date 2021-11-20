import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

export default Recommend = ({ uid, toDos, setToDos }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const rainyDay = [
    { text: "넷플릭스", image: require("../../assets/recommend/netflix.png") },
    { text: "요리하기", image: require("../../assets/recommend/cooking.png") },
    { text: "웹툰보기", image: require("../../assets/recommend/manga.png") },
    { text: "영화보기", image: require("../../assets/recommend/popcorn.png") },
    {
      text: "여행 일정 짜보기",
      image: require("../../assets/recommend/around-the-world.png"),
    },
  ];
  const goodDay = [
    {
      text: "산책하기",
      image: require("../../assets/recommend/walking-the-dog.png"),
    },
    { text: "코노가기", image: require("../../assets/recommend/singing.png") },
    { text: "조깅하기", image: require("../../assets/recommend/run.png") },
    { text: "빵집가기", image: require("../../assets/recommend/bakery.png") },
    { text: "등산가기", image: require("../../assets/recommend/climbing.png") },
  ];
  const improvement = [
    {
      text: "영어공부하기",
      image: require("../../assets/recommend/studying.png"),
    },
    { text: "뉴스보기", image: require("../../assets/recommend/tv.png") },
    { text: "운동하기", image: require("../../assets/recommend/fitness.png") },

    { text: "코딩공부", image: require("../../assets/recommend/coding.png") },
    {
      text: "자격증 따기",
      image: require("../../assets/recommend/certificate.png"),
    },
    { text: "등산가기", image: require("../../assets/recommend/climbing.png") },
  ];
  const killingTime = [
    {
      text: "드라마보기",
      image: require("../../assets/recommend/tv-monitor.png"),
    },
    { text: "웹툰보기", image: require("../../assets/recommend/manga.png") },
    {
      text: "유튜브보기",
      image: require("../../assets/recommend/youtube.png"),
    },
    {
      text: "소설보기",
      image: require("../../assets/recommend/detective.png"),
    },
  ];

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
  const handlePress = (text) => {
    Alert.alert(text, `${text}를 추가하시겠습니까?`, [
      { text: "취소" },
      {
        text: "확인",
        onPress: () => handleOk(text),
      },
    ]);
  };
  return (
    <Container showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Title> 할일추천</Title>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SubTitle style={{ color: "rgba(0,0,0,0.5)" }}>취소 </SubTitle>
        </TouchableOpacity>
      </View>
      <View>
        <SubTitle>비오는 날은 집에서</SubTitle>
        <ItemContainer horizontal showsHorizontalScrollIndicator={false}>
          {rainyDay.map((todo, index) => (
            <Item key={index} onPress={() => handlePress(todo.text)}>
              <ItemText>{todo.text}</ItemText>
              <ItemImage resizeMode="contain" source={todo.image} />
            </Item>
          ))}
        </ItemContainer>
      </View>
      <View>
        <SubTitle>날씨 좋은날은 외출!</SubTitle>
        <ItemContainer horizontal showsHorizontalScrollIndicator={false}>
          {goodDay.map((todo, index) => (
            <Item key={index} onPress={() => handlePress(todo.text)}>
              <ItemText>{todo.text}</ItemText>
              <ItemImage resizeMode="contain" source={todo.image} />
            </Item>
          ))}
        </ItemContainer>
      </View>
      <View>
        <SubTitle>자기계발</SubTitle>
        <ItemContainer horizontal showsHorizontalScrollIndicator={false}>
          {improvement.map((todo, index) => (
            <Item key={index} onPress={() => handlePress(todo.text)}>
              <ItemText>{todo.text}</ItemText>
              <ItemImage resizeMode="contain" source={todo.image} />
            </Item>
          ))}
        </ItemContainer>
      </View>
      <View style={{ marginBottom: 35 }}>
        <SubTitle>킬링타임</SubTitle>
        <ItemContainer horizontal showsHorizontalScrollIndicator={false}>
          {killingTime.map((todo, index) => (
            <Item key={index} onPress={() => handlePress(todo.text)}>
              <ItemText>{todo.text}</ItemText>
              <ItemImage resizeMode="contain" source={todo.image} />
            </Item>
          ))}
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
const ItemImage = styled.Image`
  position: absolute;
  bottom: -5px;
  right: 15px;
  width: 70px;
  height: 100px;
`;
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
