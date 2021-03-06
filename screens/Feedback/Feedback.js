import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import styled from "styled-components";
import * as Progress from "react-native-progress";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "react-native-vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
export default Feedback = ({ data }) => {
  const profileImage = [
    { text: "알", image: require("../../assets/profile/1.png") },
    { text: "병아리", image: require("../../assets/profile/2.png") },
    { text: "닭", image: require("../../assets/profile/3.png") },
    { text: "파랑새", image: require("../../assets/profile/4.png") },
    { text: "학", image: require("../../assets/profile/5.png") },
    { text: "독수리", image: require("../../assets/profile/6.png") },
    { text: "피닉스", image: require("../../assets/profile/7.png") },
  ];
  const navigation = useNavigation();
  const today = new Date();
  const theYear = today.getFullYear();
  const theMonth = today.getMonth();
  const theDate = today.getDate();
  const theDayOfWeek = today.getDay();
  const [failedList, setFailedList] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [finishedList, setFinishedList] = useState([0, 0, 0, 0, 0, 0, 0]);

  const tempStartDate = new Date(
    theYear,
    theMonth,
    theDate - theDayOfWeek + 1,
    -12
  );
  const tempEndDate = new Date(
    theYear,
    theMonth,
    theDate - theDayOfWeek + 7,
    -12
  );
  const [startDate, setStartDate] = useState(tempStartDate);
  const [endDate, setEndDate] = useState(tempEndDate);
  var step;
  var arr = [];
  for (step = 0; step < 7; step++) {
    const nowDate = new Date(
      theYear,
      theMonth,
      theDate - theDayOfWeek + 1 + step,
      -12
    );
    arr.push(nowDate.toISOString().slice(5, 10));
  }
  const [labels, setLabels] = useState(arr);

  const handleDate = (type) => {
    if (type === "prev") {
      startDate.setDate(startDate.getDate() - 7);
      const theYear = startDate.getFullYear();
      const theMonth = startDate.getMonth();
      const theDate = startDate.getDate();
      const theDayOfWeek = startDate.getDay();
      const tempStartDate = new Date(
        theYear,
        theMonth,
        theDate - theDayOfWeek + 1,
        -12
      );
      const tempEndDate = new Date(
        theYear,
        theMonth,
        theDate - theDayOfWeek + 7,
        -12
      );
      arr = [];
      for (step = 0; step < 7; step++) {
        const nowDate = new Date(
          theYear,
          theMonth,
          theDate - theDayOfWeek + 1 + step,
          -12
        );
        arr.push(nowDate.toISOString().slice(5, 10));
      }
      setLabels(arr);
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
    }
    if (type === "next") {
      startDate.setDate(startDate.getDate() + 7);
      const theYear = startDate.getFullYear();
      const theMonth = startDate.getMonth();
      const theDate = startDate.getDate();
      const theDayOfWeek = startDate.getDay();
      const tempStartDate = new Date(
        theYear,
        theMonth,
        theDate - theDayOfWeek + 1,
        -12
      );
      const tempEndDate = new Date(
        theYear,
        theMonth,
        theDate - theDayOfWeek + 7,
        -12
      );
      arr = [];
      for (step = 0; step < 7; step++) {
        const nowDate = new Date(
          theYear,
          theMonth,
          theDate - theDayOfWeek + 1 + step,
          -12
        );
        arr.push(nowDate.toISOString().slice(5, 10));
      }
      setLabels(arr);
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
    }
  };
  const {
    failedToDos,
    finishedToDos,
    loggedInUser,
    setFailedToDos,
    setFinishedToDos,
  } = data;
  const [exp, setExp] = useState(
    finishedToDos.length / 5 - Math.floor(finishedToDos.length / 5)
  );
  const [level, setLevel] = useState(Math.floor(finishedToDos.length / 5));
  let tempArr = finishedToDos.filter(
    (todoObj) =>
      todoObj.deadline >= startDate.valueOf() &&
      todoObj.deadline <= endDate.valueOf()
  );
  const [finishedToDosByDate, setFinishedToDosByDate] = useState(tempArr);
  tempArr = failedToDos.filter(
    (todoObj) =>
      todoObj.deadline >= startDate.valueOf() &&
      todoObj.deadline <= endDate.valueOf()
  );
  const [failedToDosByDate, setFailedToDosByDate] = useState(tempArr);
  useEffect(() => {
    const tempPTodosArr = finishedToDos.filter(
      (todoObj) =>
        todoObj.deadline >= startDate.valueOf() &&
        todoObj.deadline <= endDate.valueOf()
    );
    setFinishedToDosByDate(tempPTodosArr);
    const tempFTodosArr = failedToDos.filter(
      (todoObj) =>
        todoObj.deadline >= startDate.valueOf() &&
        todoObj.deadline <= endDate.valueOf()
    );
    // 하루 = 86400000
    setFailedToDosByDate(tempFTodosArr);
  }, [startDate]);
  useEffect(() => {
    let tempFailedList = [0, 0, 0, 0, 0, 0, 0];
    let tempFinishedList = [0, 0, 0, 0, 0, 0, 0];
    finishedToDosByDate.forEach((todo) => {
      tempFailedList[(todo.deadline - startDate.valueOf()) / 86400000] += 1;
    });
    failedToDosByDate.forEach((todo) => {
      tempFinishedList[(todo.deadline - startDate.valueOf()) / 86400000] += 1;
    });
    setFailedList(tempFailedList);
    setFinishedList(tempFinishedList);
  }, [finishedToDosByDate]);
  const goToDetail = (todos, isFinished) => {
    navigation.navigate("Detail", {
      todos,
      isFinished,
      setToDos: isFinished ? setFinishedToDos : setFailedToDos,
    });
  };
  const tempData = {
    labels,
    datasets: [
      {
        data: failedList,
        color: () => `rgba(82, 196, 26, ${1})`,
        strokeWidth: 3,
      },
      {
        data: finishedList,
        color: () => `rgba(255, 77, 79, ${1})`,
        strokeWidth: 3,
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width;
  return (
    <Container>
      <FirstItem>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View>
            <BigFont>성공한 일정</BigFont>
            <BigFont>
              <Text style={{ fontWeight: "bold" }}>
                {finishedToDos.length}개
              </Text>
              달성
            </BigFont>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 75, height: 75 }}
              resizeMode="contain"
              source={profileImage[level].image}
            />
            <Username>
              Lv{level + 1}.
              {loggedInUser.displayName
                ? loggedInUser.displayName
                : profileImage[level].text}
            </Username>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Progress.Bar
            progress={exp}
            width={null}
            unfilledColor="rgba(0,0,0,0.2)"
            borderColor="rgba(0,0,0,0)"
          />
        </View>
      </FirstItem>

      <DateSetting>
        <SmallFont>기간설정</SmallFont>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => handleDate("prev")}>
            <Ionicons name="chevron-back-outline" size={22} />
          </TouchableOpacity>
          <SmallFont>
            {startDate.toISOString().slice(5, 10)} ~{" "}
            {endDate.toISOString().slice(5, 10)}
          </SmallFont>
          <TouchableOpacity onPress={() => handleDate("next")}>
            <Ionicons name="chevron-forward-outline" size={22} />
          </TouchableOpacity>
        </View>
      </DateSetting>
      <Overview>
        <OverviewItem
          width={screenWidth / 2.5}
          onPress={() => goToDetail(finishedToDosByDate, true)}
        >
          <AccentFont>성공</AccentFont>
          <AccentFont>{finishedToDosByDate.length}</AccentFont>
        </OverviewItem>

        <FailOverview
          width={screenWidth / 2.5}
          onPress={() => goToDetail(failedToDosByDate, false)}
        >
          <FailText>실패</FailText>
          <FailText>{failedToDosByDate.length}</FailText>
        </FailOverview>
      </Overview>
      <Statics>
        <LineChart
          data={tempData}
          width={screenWidth - 45}
          height={220}
          chartConfig={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backgroundGradientFrom: "rgba(255, 255, 255, 0.2)",
            backgroundGradientTo: "rgba(255, 255, 255, 0.2)",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "5",
              strokeWidth: "1",
              stroke: "rgb(255,255,255)",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </Statics>
    </Container>
  );
};
const Statics = styled.View`
  margin: 25px 0px;
`;
const Container = styled.ScrollView`
  padding: 15px 25px;
`;
const Overview = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const OverviewItem = styled.TouchableOpacity`
  width: ${(props) => props.width}px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  padding: 15px 15px 0px 0px;
  border-bottom-width: 2px;
  border-color: rgb(82, 196, 26);
`;
const FailOverview = styled(OverviewItem)`
  border-color: rgb(255, 77, 79);
`;
const DateSetting = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const FirstItem = styled.View`
  padding: 15px 25px;
  margin-bottom: 30px;
  background-color: rgba(125, 125, 125, 0.1);
  border-radius: 25px;
`;
const AccentFont = styled.Text`
  font-size: 22px;
  color: rgb(82, 196, 26);
  font-family: "BM-Pro";
`;
const FailText = styled(AccentFont)`
  color: rgb(255, 77, 79);
`;
const BigFont = styled.Text`
  font-size: 28px;
  font-family: "BM-Air";
`;
const Username = styled.Text`
  font-size: 15px;
  font-family: "BM-Y";
`;
const SmallFont = styled.Text`
  font-size: 16px;
  font-family: "BM-Air";
`;
