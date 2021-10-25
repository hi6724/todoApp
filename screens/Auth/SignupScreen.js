import React, { useEffect, useRef } from "react";
import * as Font from "expo-font";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormButton from "../../components/Auth/FormButton";
import FormInput from "../../components/Auth/FormInput";
import SocialButton from "../../components/Auth/SocialButton";
import { windowWidth } from "../../components/dimension";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { authService } from "../../navigation/AuthProvider";
Font.loadAsync({
  "Kufam-SemiBoldItalic": require("../../assets/fonts/Kufam-SemiBoldItalic.ttf"),
});
export default LoginScreen = ({ navigation }) => {
  const { register, handleSubmit, setValue } = useForm();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  useEffect(() => {
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("passwordConfirm", {
      required: true,
    });
  }, [register]);
  const onValid = async (data) => {
    const ok = await createUserWithEmailAndPassword(
      authService,
      data.email,
      data.password
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        blurOnSubmit={false}
        placeholderText="Email"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <FormInput
        blurOnSubmit={false}
        innerRef={passwordRef}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
        onSubmitEditing={() => onNext(passwordConfirmRef)}
        onChangeText={(text) => setValue("password", text)}
      />
      <FormInput
        innerRef={passwordConfirmRef}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
        onChangeText={(text) => setValue("passwordConfirm", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <FormButton buttonTitle="Sign Up" onPress={handleSubmit(onValid)} />

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
      />
      <SocialButton
        buttonTitle="Without Sign Up"
        btnType="user-secret"
        color="rgba(0,0,0,0.8)"
        backgroundColor="rgba(0,0,0,0.2)"
      />
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.navButtonText}>Have an account ? Sign in</Text>
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

  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
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
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
});
