import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStackNav from "./HomeStackNav";
import styled from "styled-components";

const Tabs = createBottomTabNavigator();

export default Nav = ({ loggedInUser, setLoggedInUser }) => {
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
      hours - 12;
    }
    const now = `${t} ${hours}:${minutes}`;
    return now;
  };
  const [clock, setClock] = useState(setTime());

  // useEffect(() => {
  //   setInterval(() => {
  //     setClock(setTime);
  //   }, 20000);
  // }, []);
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
        // children={() => <Home loggedInUser={loggedInUser} />}
      >
        {() => <HomeStackNav loggedInUser={loggedInUser} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Feedback"
        children={() => <Home loggedInUser={loggedInUser} />}
      />

      <Tabs.Screen
        name="Profile"
        children={() => (
          <Profile
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        )}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  homeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 15,
  },
  date: {
    fontFamily: "BM-Pro",
    opacity: 0.3,
  },
});
