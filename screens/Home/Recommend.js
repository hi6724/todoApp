import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styled from "styled-components";

export default Recommend = () => {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <Title>할일추천</Title>
      <View>
        <SubTitle>비오는 날은 집에서</SubTitle>
        <ItemContainer horizontal showsHorizontalScrollIndicator={false}>
          <Item>
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
