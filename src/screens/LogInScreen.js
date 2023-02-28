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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          height: 200,
          width: 213,
          position: "absolute",
          top: 100,
          left: "50%",
          marginLeft: -106.5,
          borderRadius: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            lineHeight: 36,
            letterSpacing: 0,
            textAlign: "center",
          }}
        >
          היי,{"\n"}
          טוב לראות אותך :)
        </Text>
      </View>
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
        style={{
          backgroundColor: "#006699",
          borderRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "400",
            lineHeight: 28,
            letterSpacing: 0,
            textAlign: "center",
            color: "#fff",
          }}
        >
          התחבר
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister}>
        <Text
          style={{
            position: "absolute",
            width: "100%",
            fontSize: 24,
            bottom: -200,
            left: -200,
            fontWeight: "400",
            lineHeight: 28,
            letterSpacing: 0,
            textAlign: "center",
            allignSelf: "flex-start",
            textDecorationLine: "underline",
            color: "#006699",
          }}
        >
          לא רשום עדיין? תרשם לאתר פה
        </Text>
      </TouchableOpacity>
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
