import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default CollapsedBtn = ({ isCollapsed, setIsCollapsed, text }) => {
  return (
    <ActionBtn
      onPress={() => setIsCollapsed((prev) => !prev)}
      style={styles.btn}
    >
      <View style={styles.innerBtn}>
        {isCollapsed ? (
          <Ionicons name={"caret-forward-outline"} size={16} color={"#fff"} />
        ) : (
          <Ionicons name={"caret-down-outline"} size={16} color={"#fff"} />
        )}

        <Text style={styles.btnText}>{text}</Text>
      </View>
    </ActionBtn>
  );
};
const ActionBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.7);
  width: 150px;
  padding: 15px;
  border-radius: 15px;
`;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: "transparent",
    width: "90%",
  },
  btnText: {
    marginLeft: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  innerBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 5,
    backgroundColor: "rgba(10, 10, 10, 0.8)",
  },
});
