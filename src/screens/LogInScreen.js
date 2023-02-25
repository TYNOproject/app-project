import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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
            fontFamily: "Rubik",
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
        style={{
          height: 51,
          width: 327,
          borderRadius: 5,
          borderWidth: 1,
          marginBottom: 8,
          textAlign: "center",
          textAlignVertical: "center",
        }}
        placeholder="שם משתמש"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={{
          height: 51,
          width: 327,
          borderRadius: 5,
          borderWidth: 1,
          marginBottom: 8,
          textAlign: "center",
          textAlignVertical: "center",
        }}
        placeholder="סיסמא"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity
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
            fontFamily: "Rubik",
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
            fontFamily: "Rubik",
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
};

export default LoginScreen;
