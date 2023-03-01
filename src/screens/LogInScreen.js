import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
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
  const handleLogin = () => {
    if (username.endsWith("@post.bgu.ac.il")) {
      alert("הרשמה הצליחה");
    } else {
      alert("הרשמה נכשלה");
    }
    navigation.navigate("Home");
  };

  const handleRegister = () => {
    // handle register logic here
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        היי,{"\n"}
        טוב לראות אותך :)
      </Text>
      <TextInput
        style={styles.inputField}
        placeholder="שם משתמש"
        onChangeText={setUsername}
        value={username}
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
        title="התחבר"
        variant="outlined"
        color="black"
        style={{ position: "relative", top: 10 }}
        onPress={handleLogin}
      />
      <Button
        leading={() => <AntDesign name="left" size={24} />}
        title="לא רשום? לחץ כאן"
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
    height: "50%",
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
