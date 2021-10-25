import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStackNav from "./HomeStackNav";

const Tabs = createBottomTabNavigator();

export default Nav = ({ loggedInUser, setLoggedInUser }) => {
  console.log(loggedInUser);

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
                <View>
                  <Text>10.25 (월) 오후 4:11</Text>
                </View>
              </SafeAreaView>
            );
          },
        }}
        children={() => <Home loggedInUser={loggedInUser} />}
      >
        {() => <HomeStackNav />}
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
    padding: 15,
    borderBottomColor: "rgba(0,0,0,0.3)",
    borderBottomWidth: 1,
  },
  date: {},
  sort: {},
});
