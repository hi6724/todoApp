import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormButton from "../../components/Auth/FormButton";
import FormInput from "../../components/Auth/FormInput";
import SocialButton from "../../components/Auth/SocialButton";
import { windowWidth } from "../../components/dimension";
import { authService, firebaseApp } from "../../navigation/AuthProvider";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default LoginScreen = ({ setLoggedInUser }) => {
  const navigation = useNavigation();
  const passwordRef = useRef();
  const { register, handleSubmit, getValues, setValue, watch } = useForm();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = async (data) => {
    const ok = await signInWithEmailAndPassword(
      authService,
      data.email,
      data.password
    );
  };
  useEffect(() => {
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("../../assets/profile/1.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>투두 메이트</Text>
      <FormInput
        value={watch("email")}
        blurOnSubmit={false}
        placeholderText="이메일"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <FormInput
        value={watch("password")}
        innerRef={passwordRef}
        placeholderText="비밀번호"
        iconType="lock"
        secureTextEntry={true}
        onChangeText={(text) => setValue("password", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />

      <FormButton buttonTitle="로그인" onPress={handleSubmit(onValid)} />
      {/* <SocialButton
        buttonTitle="Google로 로그인"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
      /> */}
      <SocialButton
        onPress={() => setLoggedInUser({ uid: "incognito" })}
        buttonTitle="회원가입 없이 진행"
        btnType="user-secret"
        color="rgba(0,0,0,0.8)"
        backgroundColor="rgba(0,0,0,0.2)"
      />
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <Text style={styles.navButtonText}>
          아직 회원이 아니신가요? 회원가입
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: windowWidth,
  },
  text: {
    fontSize: 28,
    fontFamily: "BM-Pro",
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2e64e5",
  },
});
