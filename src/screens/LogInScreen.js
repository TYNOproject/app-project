import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import StudentContext from "../contexts/StudentContext.js";
import { signIn } from "../api/serviceCalls.js";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation }) {
  const { addToStudent, items, getVal } = useContext(StudentContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  const handleLogin = async () => {
    //check if the user exists in the database, if so -> nvaigate to home page
    //else, pop up that says that he's not registered
    signInResponse = await signIn({ email, password });
    console.log(signInResponse.data);
    if (signInResponse.status !== 200) {
      alert("אירעה שגיאה, אנא נסה שנית");
      return;
    }
    if (signInResponse.status === 200) {
      addToStudent("studentDetails", signInResponse.data);
      console.log(getVal(items, "studentDetails"));
      navigation.navigate("HomePage");
    }
  };

  const handleRegister = async () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: "50%",
        }}
        resizeMode="contain"
      />
      <Text style={styles.header}>
        {"\n"}
        היי,{"\n"}
        טוב לראות אותך :)
      </Text>
      <View style={styles.inputFields}>
        <TextInput
          style={styles.inputField1}
          placeholder="כתובת מייל"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.inputField2}
          placeholder="סיסמא"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="התחבר"
          titleStyle={{
            fontSize: 18,
            textAlign: "center",
            fontFamily: "Heebo-Bold",
          }} // Add this line to center the title
          leading={() => <AntDesign name="left" size={24} color="white" />}
          onPress={handleLogin}
        />

        <Button
          title="לא רשום? לחץ כאן"
          titleStyle={{
            fontSize: 18,
            textAlign: "center",
            fontFamily: "Heebo-Bold",
          }} // Add this line to center the title
          leading={() => <AntDesign name="left" size={24} color="white" />}
          style={styles.registerButton}
          onPress={handleRegister}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "15%",
  },
  inputFields: {
    width: "80%",
    flex: 1,
    justifyContent: "space-evenly",
    marginTop: "10%",
  },
  header: {
    fontSize: 30, // use responsive font size
    fontFamily: "Heebo-Bold",
    textAlign: "center",
    textShadowColor: "#A1B2C3",
    textShadowOffset: { width: 1 },
    textShadowRadius: 7,
  },
  inputField1: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#7521f3",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    fontFamily: "Heebo-Regular",
  },

  inputField2: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#7521f3",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    fontFamily: "Heebo-Regular",
  },
  buttonContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: "30%",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
});
