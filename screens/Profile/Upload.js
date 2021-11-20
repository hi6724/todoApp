import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";

export default Upload = ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const [endCursor, setEndCursor] = useState("0");
  const getPhotos = async () => {
    const data = await MediaLibrary.getAssetsAsync({
      first: 40,
      after: endCursor,
      sortBy: "creationTime",
    });
    if (photos.length > 0) {
      setPhotos([...photos, ...data.assets]);
    } else {
      setPhotos(data.assets);
    }
    setEndCursor(data.endCursor);
  };
  const getMorePhotos = async () => {
    const data = await MediaLibrary.getAssetsAsync({ after: endCursor });
    setPhotos([...photos, data.assets]);
    setEndCursor(data.after);
  };
  const getPermissions = async () => {
    const { granted, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (granted === false && canAskAgain) {
      const per = await MediaLibrary.requestPermissionsAsync();
      if (per.granted) {
        setOk(true);
        getPhotos();
      }
    } else if (granted) {
      setOk(true);
      getPhotos();
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
    getPermissions();
  }, []);
  const { width } = useWindowDimensions();
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => setChosenPhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / 4, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? "blue" : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );
  const HeaderRight = () => (
    <TouchableOpacity>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  return (
    <Container>
      <NextBtn>
        <HeaderRightText>Next</HeaderRightText>
      </NextBtn>
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            resizeMode="contain"
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          onEndReachedThreshold={1}
          onEndReached={() => getPhotos()}
          data={photos}
          numColumns={4}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  flex: 1;
  background-color: black;
`;
const NextBtn = styled.TouchableOpacity`
  right: 0;

  background-color: red;
  height: 100px;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;
const HeaderRightText = styled.Text`
  color: black;
  font-size: 16px;
  margin-right: 7px;
  font-family: "BM-Pro";
`;
