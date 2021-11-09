import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStackNav from "./HomeStackNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileStackNav from "./ProfileStackNav";

const Tabs = createBottomTabNavigator();

export default Nav = ({ loggedInUser, setLoggedInUser }) => {
  const { uid } = loggedInUser;
  const [allToDos, setAllToDos] = useState([]);
  const [toDos, setToDos] = useState([]);
  const [finishedToDos, setFinishedToDos] = useState([]);
  const [failedToDos, setFailedToDos] = useState([]);

  const dayArr = ["월", "화", "수", "목", "금", "토", "일"];
  const date = new Date();
  const today = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const day = date.getDay();
  const setTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let t = "오전";
    if (hours >= 12) {
      t = "오후";
      hours = hours - 12;
    }
    const now = `${t} ${hours}:${minutes}`;
    return now;
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(uid);
    if (s) {
      const tempToDos = JSON.parse(s);
      const tempAllToDos = [];
      const newToDo = [];
      const finished = [];
      const failed = [];
      tempToDos.sort(function (a, b) {
        return a.deadline - b.deadline;
      });
      tempToDos.map((todo) => {
        tempAllToDos.push(todo);
        if (todo.isChecked === true) {
          if (todo.deadline < date.valueOf()) {
            finished.push(todo);
          } else {
            newToDo.push(todo);
          }
        } else {
          if (todo.deadline < date.valueOf()) {
            failed.push(todo);
          } else {
            newToDo.push(todo);
          }
        }
      });
      setAllToDos(tempAllToDos);
      setToDos(newToDo);
      setFinishedToDos(finished);
      setFailedToDos(failed);
      console.log(failedToDos);
    }
  };

  const [clock, setClock] = useState(setTime());

  useEffect(() => {
    setInterval(() => {
      setClock(setTime);
    }, 40000);
  }, []);
  useEffect(() => {
    loadToDos();
  }, []);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Feedback") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "rgba(0,0,0,0.8)",
        tabBarInactiveTintColor: "rgba(0,0,0,0.6)",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
      })}
    >
      <Tabs.Screen
        name="Home"
        options={{
          header: ({}) => {
            return (
              <SafeAreaView style={styles.homeHeader}>
                <Text style={styles.date}>
                  {`${currentMonth}.${today} (${dayArr[day - 1]}) ${clock}`}
                </Text>
              </SafeAreaView>
            );
          },
        }}
      >
        {() => (
          <HomeStackNav
            uid={uid}
            toDos={toDos}
            setToDos={setToDos}
            allToDos={allToDos}
            setAllToDos={setAllToDos}
          />
        )}
      </Tabs.Screen>

      <Tabs.Screen
        name="Feedback"
        options={{
          header: ({}) => {
            return (
              <SafeAreaView style={styles.headerView}>
                <Text style={styles.headerText}>피드백</Text>
              </SafeAreaView>
            );
          },
        }}
      >
        {() => <Home loggedInUser={loggedInUser} />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Profile"
        options={{
          header: ({}) => {
            return (
              <SafeAreaView style={styles.headerView}>
                <Text style={styles.headerText}>프로필</Text>
              </SafeAreaView>
            );
          },
        }}
      >
        {() => (
          <ProfileStackNav
            uid={uid}
            setLoggedInUser={setLoggedInUser}
            finishedToDos={finishedToDos}
            failedToDos={failedToDos}
            setFinishedToDos={setFinishedToDos}
            setFailedToDos={setFailedToDos}
            allToDos={allToDos}
            setAllToDos={setAllToDos}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  homeHeader: {
    paddingHorizontal: 25,
    marginTop: 15,
  },
  date: {
    fontFamily: "BM-Pro",
    opacity: 0.3,
  },
  headerText: {
    fontFamily: "BM-Pro",
    fontSize: 26,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
});
