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
import { addDoc, collection } from "@firebase/firestore";
import { dbService } from "../../navigation/AuthProvider";

export default Add = ({ loggedInUser }) => {
  const { register, setValue, handleSubmit, watch, getValues } = useForm();
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [deadline, setDeadline] = useState(today);
  const [todo, setTodo] = useState(null);
  const navigation = useNavigation();
  const [showCalendar, setShowCalendar] = useState(false);
  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(date);
      console.log(date);
    } else {
      setDeadline(date);
    }
  };
  //   mutation to firebase
  const onValid = () => {
    const { todo } = getValues();
    const newStartDate = startDate.toISOString().split("T")[0];
    const newDeadline = deadline.toISOString().split("T")[0];
    const todoObj = {
      uid: loggedInUser.uid,
      todo,
      startDate: newStartDate,
      deadline: newDeadline,
    };

    addDoc(collection(dbService, "todo"), todoObj);
    navigation.navigate("Home2");
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
