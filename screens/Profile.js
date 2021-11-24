import { signOut } from "@firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import styled from "styled-components/native";
import Todo from "../components/Home/Todo";
import { authService, dbService } from "../navigation/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditModal from "../components/Profile/EditModal";

export default Profile = ({
  loggedInUser,
  setLoggedInUser,
  finishedToDos,
  failedToDos,
  setFinishedToDos,
  setFailedToDos,
  setToDos,
}) => {
  const profileData = [
    { text: "알", image: require("../assets/profile/1.png") },
    { text: "병아리", image: require("../assets/profile/2.png") },
    { text: "닭", image: require("../assets/profile/3.png") },
    { text: "파랑새", image: require("../assets/profile/4.png") },
    { text: "학", image: require("../assets/profile/5.png") },
    { text: "독수리", image: require("../assets/profile/6.png") },
    { text: "피닉스", image: require("../assets/profile/7.png") },
  ];

  const [level, setLevel] = useState(Math.floor(finishedToDos.length / 5));
  const navigation = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isUploadCollapsed, setIsUploadCollapsed] = useState(true);

  const [isValid, setIsValid] = useState(loggedInUser.uid !== "incognito");

  const userLogOut = async () => {
    await signOut(authService);
    setLoggedInUser(null);
  };
  const goToDetail = (todos, isFinished) => {
    navigation.navigate("Detail", {
      todos,
      isFinished,
      setToDos: isFinished ? setFinishedToDos : setFailedToDos,
    });
  };
  const [modalVisible, setModalVisible] = useState(false);
  const handleUpload = async () => {
    let isUpdate = false;
    let id;
    const s = await AsyncStorage.getItem(loggedInUser.uid);
    let tempToDos;
    if (s) {
      tempToDos = JSON.parse(s);
    }
    const q = query(collection(dbService, loggedInUser.uid));
    const documentSnapshots = await getDocs(q);
    documentSnapshots.forEach((s) => {
      if (s.data().toDos.length > 0) {
        id = s.id;
        isUpdate = true;
      }
    });
    if (!isUpdate) {
      await addDoc(collection(dbService, loggedInUser.uid), {
        toDos: tempToDos,
      });
    } else {
      await updateDoc(doc(dbService, `${loggedInUser.uid}/${id}`), {
        toDos: tempToDos,
      });
    }
    alert("업로드 완료");
  };
  const getToDos = async () => {
    const s = await AsyncStorage.getItem(loggedInUser.uid);
    let tempToDos;
    let firebaseToDos;
    if (s) {
      tempToDos = JSON.parse(s);
    }
    const q = query(collection(dbService, loggedInUser.uid));
    const documentSnapshots = await getDocs(q);
    documentSnapshots.forEach((s) => {
      firebaseToDos = s.data().toDos;
    });
    let idArr = [];
    tempToDos.map((hello) => {
      idArr.push(hello.id);
    });
    firebaseToDos.filter((toDo) => {
      if (!idArr.includes(toDo.id)) {
        tempToDos.push(toDo);
      }
    });

    const newToDo = [];
    const finished = [];
    const failed = [];
    const date = new Date();
    tempToDos.sort(function (a, b) {
      return a.deadline - b.deadline;
    });
    tempToDos.map((todo) => {
      if (todo.isChecked === true) {
        if (todo.deadline + 86400000 < date.valueOf()) {
          finished.push(todo);
        } else {
          newToDo.push(todo);
        }
      } else {
        if (todo.deadline + 86400000 < date.valueOf()) {
          failed.push(todo);
        } else {
          newToDo.push(todo);
        }
      }
    });

    setToDos(newToDo);
    setFinishedToDos(finished);
    setFailedToDos(failed);
    await AsyncStorage.setItem(loggedInUser.uid, JSON.stringify(tempToDos));
    alert("불러오기 완료");
  };
  return (
    <Container>
      <AvatarContainer>
        <Avatar
          resizeMode="contain"
          source={
            isValid && loggedInUser.photoURL
              ? loggedInUser.photoURL
              : profileData[level].image
          }
        />
        <Username>
          {isValid
            ? loggedInUser.displayName
              ? `Lv.${level + 1} ${loggedInUser.displayName}`
              : `Lv.${level + 1} ${profileData[level].text}`
            : `Lv.${level + 1} ${profileData[level].text}`}
        </Username>
      </AvatarContainer>
      <EditModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />

      <WhiteBtn
        onPress={() => {
          isValid
            ? setModalVisible(!modalVisible)
            : alert("로그인후 이용 할 수 있습니다");
        }}
      >
        <BtnText>이름변경</BtnText>
      </WhiteBtn>
      <WhiteBtn onPress={() => setIsUploadCollapsed((prev) => !prev)}>
        <BtnText>
          {isUploadCollapsed ? "온라인 백업 및 가져오기" : "숨기기"}
        </BtnText>
      </WhiteBtn>
      <Collapsible collapsed={isUploadCollapsed}>
        <Overview>
          <UploadBtn
            onPress={() => {
              isValid ? handleUpload() : alert("로그인후 이용 할 수 있습니다");
            }}
          >
            <UploadText>온라인 백업</UploadText>
          </UploadBtn>
          <UploadBtn
            onPress={() => {
              isValid ? getToDos() : alert("로그인후 이용 할 수 있습니다");
            }}
          >
            <UploadText>가져오기</UploadText>
          </UploadBtn>
        </Overview>
      </Collapsible>

      <WhiteBtn onPress={() => setIsCollapsed((prev) => !prev)}>
        <BtnText>{isCollapsed ? "내가 지금까지 해온 일들" : "숨기기"}</BtnText>
      </WhiteBtn>
      <Collapsible collapsed={isCollapsed}>
        <Overview>
          <OverviewItem onPress={() => goToDetail(finishedToDos, true)}>
            <AccentFont>성공</AccentFont>
            <AccentFont>{finishedToDos.length}</AccentFont>
          </OverviewItem>

          <FailOverview onPress={() => goToDetail(failedToDos, false)}>
            <FailText>실패</FailText>
            <FailText>{failedToDos.length}</FailText>
          </FailOverview>
        </Overview>
      </Collapsible>
      <WhiteBtn onPress={userLogOut}>
        <BtnText>LOGOUT</BtnText>
      </WhiteBtn>
    </Container>
  );
};
const EditContainer = styled.Modal``;
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
const Overview = styled.View`
  margin-top: 15px;
`;
const OverviewItem = styled.TouchableOpacity`
  background-color: rgba(82, 196, 26, 0.2);
  border-radius: 25px;
  margin-top: 15px;

  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
`;
const UploadBtn = styled(OverviewItem)`
  background-color: rgba(46, 100, 229, 0.2);
  border-color: #a82e2e;
`;
const FailOverview = styled(OverviewItem)`
  background-color: rgba(255, 77, 79, 0.2);
  border-color: #a82e2e;
`;
const AccentFont = styled.Text`
  font-size: 22px;
  font-family: "BM-Pro";
  color: #52c41a;
`;
const FailText = styled(AccentFont)`
  color: #a82e2e;
`;
const UploadText = styled(AccentFont)`
  color: rgb(46, 100, 229);
`;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,

    elevation: 2,
  },
});
