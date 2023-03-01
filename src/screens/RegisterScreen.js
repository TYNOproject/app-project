import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Light": require("../../assets/fonts/Heebo-Light.ttf"),
    "Heebo-Medium": require("../../assets/fonts/Heebo-Medium.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
    "Heebo-SemiBold": require("../../assets/fonts/Heebo-SemiBold.ttf"),
    "Heebo-Thin": require("../../assets/fonts/Heebo-Thin.ttf"),
    "Heebo-Black": require("../../assets/fonts/Heebo-Black.ttf"),
    "Heebo-ExtraBold": require("../../assets/fonts/Heebo-ExtraBold.ttf"),
    "Heebo-ExtraLight": require("../../assets/fonts/Heebo-ExtraLight.ttf"),
  });

  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  const handleRegister = () => {
    // handle register logic here
    navigation.navigate("StudentSignUp", {name});
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
        placeholder="שם המשפחה שלך"
        onChangeText={setLastName}
        value={lastName}
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
        leading={() => <AntDesign name="left" size={24} />}
        title="אפשר להמשיך"
        variant="outlined"
        color="black"
        style={{ position: "relative", top: 10 }}
        onPress={handleRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "80%",
  },
  header: {
    fontSize: 30,
    top: 20,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
  },
  inputField: {
    width: 300,
    height: 40,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    fontFamily: "Heebo-Regular",
  },
});
