import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import styled from "styled-components/native";
import { windowWidth } from "../../components/dimension";
import FormInput from "../../components/Auth/FormInput";
import CalendarPicker from "react-native-calendar-picker";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
export default Add = ({ uid, toDos, setToDos }) => {
  const { register, setValue, handleSubmit, watch, getValues } = useForm();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  let date = today.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  const withoutDate = new Date(`${year}-${month + 1}-${date}T03:00:00.000Z`);
  const [startDate, setStartDate] = useState(withoutDate);
  const [deadline, setDeadline] = useState(withoutDate);
  const [tempToDo, setTempToDo] = useState(null);
  const navigation = useNavigation();
  const [showCalendar, setShowCalendar] = useState(false);

  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(date);
    } else {
      setDeadline(date);
    }
  };
  //   mutation to firebase
  const onValid = async () => {
    const s = await AsyncStorage.getItem(uid);
    let tempToDos;
    if (s) {
      tempToDos = JSON.parse(s);
    }
    const { todo } = getValues();
    const todoObj = {
      id: Date.now(),
      uid: uid,
      todo,
      startDate: startDate.valueOf(),
      deadline: deadline.valueOf(),
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
    navigation.navigate("Home2");
    // addDoc(collection(dbService, "todo"), todoObj);
  };
  useEffect(() => {
    register("todo", { required: true });
  }, [register]);

  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={() => Keyboard.dismiss()}
    >
      <Container>
        <View>
          <Title>할일을 추가하세요</Title>
        </View>
        <View>
          <FormInput
            value={watch("todo")}
            autoCapitalize="none"
            iconType="check"
            placeholder="입력하세요"
            onChangeText={(text) => setValue("todo", text)}
            onSubmitEditing={() => setShowCalendar(true)}
          />
          <TouchableOpacity onPress={() => setShowCalendar((prev) => !prev)}>
            <SubText>{showCalendar ? "숨기기" : "기한설정"}</SubText>
          </TouchableOpacity>
          {showCalendar && (
            <CalendarPicker
              height={0}
              selectedStartDate={startDate}
              selectedEndDate={deadline}
              allowRangeSelection
              allowBackwardRangeSelect
              onDateChange={onDateChange}
              minDate={new Date()}
            />
          )}
        </View>

        <BtnContainer>
          <BasicBtn
            windowWidth={windowWidth}
            onPress={() => navigation.navigate("Home2")}
          >
            <BtnText>취소</BtnText>
          </BasicBtn>
          <BasicBtn windowWidth={windowWidth} onPress={handleSubmit(onValid)}>
            <BtnText>추가</BtnText>
          </BasicBtn>
        </BtnContainer>
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
