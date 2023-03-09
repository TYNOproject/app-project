import React, { useState, useContext } from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import StudentContext from "../contexts/StudentContext";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen({ navigation }) {
  const { addToStudent } = useContext(StudentContext);
  const { clearItems } = useContext(StudentContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleRegister = () => {
    navigation.navigate("StudentSignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        טוב שבאת! {"\n"}
        כמה פרטים וסיימנו
      </Text>
      <TextInput
        style={styles.inputField}
        placeholder="השם שלך"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.inputField}
        placeholder="מייל אוניברסיטאי"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.inputField}
        placeholder="סיסמא"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button
        title="אפשר להמשיך"
        titleStyle={{ fontSize: 18, textAlign: "center" }} // Add this line to center the title
        leading={() => <AntDesign name="left" size={24} color="white" />}
        style={{
          width: 250,
          height: 50,
          top: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          addToStudent("studentDetails", { name, email, password });
          handleRegister();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "75%",
    top: 10,
  },
  header: {
    fontSize: 30,
    top: 85,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
  },
  inputField: {
    width: 300,
    top: 40,
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
