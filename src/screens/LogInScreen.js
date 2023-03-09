import React,{ useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
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
      <Text style={styles.header}>
        היי,{"\n"}
        טוב לראות אותך :)
      </Text>
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
      <Button title="התחבר"
        titleStyle={{ fontSize: 25, textAlign: 'center' }} // Add this line to center the title
        leading={() => <AntDesign name="left" size={24} color="white" />}
        style={{ width: 200, height: 50, top: -50, justifyContent: 'center', alignItems: 'center' }}
        onPress={handleLogin} />

      <Button title="לא רשום? לחץ כאן"
        titleStyle={{ fontSize: 25, textAlign: 'center' }} // Add this line to center the title
        leading={() => <AntDesign name="left" size={24} color="white" />}
        style={{ width: 250, height: 50, top: -90, justifyContent: 'center', alignItems: 'center' }}
        onPress={handleRegister} />

</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  header: {
    fontSize: 30,
    top: 110,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
  },
  inputField1: {
    width: 300,
    top: 60,
    height: 50,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "purple", // added purple border color
    borderWidth: 2, // increased border width for visibility
    borderRadius: 15,
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    fontFamily: "Heebo-Regular",
  },

  inputField2: {
    width: 300,
    top: 0,
    height: 50,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "purple", // added purple border color
    borderWidth: 2, // increased border width for visibility
    borderRadius: 15,
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    fontFamily: "Heebo-Regular",
  },
});
