import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import * as Font from "expo-font";
import { windowWidth } from "../../components/dimension";
import FormInput from "../../components/Auth/FormInput";
import CalendarPicker from "react-native-calendar-picker";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

Font.loadAsync({
  "Kufam-SemiBoldItalic": require("../../assets/fonts/Kufam-SemiBoldItalic.ttf"),
});
export default Add = () => {
  const { register, setValue, handleSubmit, watch, getValues } = useForm();
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [todo, setTodo] = useState(null);
  const navigation = useNavigation();

  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };
  //   mutation to firebase
  const onValid = async () => {
    const { todo } = getValues();
    const parsedStartDate = startDate ? startDate.toString() : "";
    const parsedEndDate = endDate ? endDate.toString() : "";
    console.log("TODO : ", todo);
    console.log(parsedStartDate, parsedEndDate);
    navigation.navigate("Home2");
  };
  useEffect(() => {
    register("todo", { required: true });
  }, [register]);
  return (
    <Container>
      <View>
        <Title>+New Todo</Title>
      </View>
      <View>
        <FormInput
          value={watch("todo")}
          autoCapitalize="none"
          iconType="check"
          placeholder="Write your todo"
          onChangeText={(text) => setValue("todo", text)}
        />
        <SubText>StartDate and DeadLine</SubText>
        <View style={{ display: "flex" }}>
          <CalendarPicker
            height={0}
            selectedStartDate={startDate}
            selectedEndDate={endDate}
            allowRangeSelection
            allowBackwardRangeSelect
            onDateChange={onDateChange}
            minDate={new Date()}
          />
        </View>
      </View>

      <BtnContainer>
        <BasicBtn
          windowWidth={windowWidth}
          onPress={() => navigation.navigate("Home2")}
        >
          <BtnText>Cancel</BtnText>
        </BasicBtn>
        <BasicBtn windowWidth={windowWidth} onPress={handleSubmit(onValid)}>
          <BtnText>Submit</BtnText>
        </BasicBtn>
      </BtnContainer>
    </Container>
  );
};

const Container = styled.View`
  padding: 20px 25px;
  justify-content: space-between;
  flex: 1;
`;
const Title = styled.Text`
  font-family: "Kufam-SemiBoldItalic";
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
  font-weight: bold;
`;
const SubText = styled.Text`
  color: rgba(125, 125, 125, 0.5);
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0px;
`;
