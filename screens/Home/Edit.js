import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
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
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";
import { dbService } from "../../navigation/AuthProvider";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default Edit = ({ route }) => {
  const { params } = route;

  const { register, setValue, handleSubmit, watch, getValues } = useForm();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  let date = today.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  const [startDate, setStartDate] = useState(params.startDate);
  const [deadline, setDeadline] = useState(params.deadline);
  const navigation = useNavigation();
  const [showCalendar, setShowCalendar] = useState(true);
  const [isChecked, setIsChecked] = useState(params.isChecked);
  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(date);
    } else {
      setDeadline(date);
    }
  };
  //   mutation to firebase
  const onValid = async () => {
    const { todo } = getValues();
    const todoObj = {
      todo,
      startDate: startDate.valueOf(),
      deadline: deadline.valueOf(),
      isChecked: isChecked,
    };
    await updateDoc(doc(dbService, `todo/${params.id}`), todoObj);
    navigation.navigate("Home2");
  };
  useEffect(() => {
    register("todo", { required: true });
    setValue("todo", params.todo);
  }, [register]);
  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={() => Keyboard.dismiss()}
    >
      <Container>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BouncyCheckbox
            isChecked={isChecked}
            fillColor="red"
            unfillColor="#FFFFFF"
            size={32}
            onPress={() => setIsChecked((prev) => !prev)}
          />
          <TextInput
            value={watch("todo")}
            onChangeText={(text) => setValue("todo", text)}
            style={styles.title}
          />
        </View>
        <View>
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
            <BtnText>변경</BtnText>
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
const styles = StyleSheet.create({
  title: {
    fontFamily: "BM-Pro",
    fontSize: 32,
    color: "#051d5f",
  },
});
