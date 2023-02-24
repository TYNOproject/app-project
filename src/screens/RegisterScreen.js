import React, { useState,Component } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView,
  Platform,Keyboard ,StyleSheet,ScrollView} from "react-native";
import { Button } from "@react-native-material/core";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // handle register logic here
    console.log(`Registering user with name: ${name}, email: ${email}`);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          height: 72,
          width: 300,
          left:0,
          position: "absolute",
          top: 70,
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
            fontSize: 30,
            left:-36,
            fontWeight: "400",
            lineHeight: 36,
            letterSpacing: 0,
            textAlign: "center",
          }}
        >
          כמה פרטים וסיימנו
        </Text>
      </View>
      <View style={{marginBottom: 16}}>
  <Text style={{fontSize: 16, marginBottom: 8, right: -265}}>
    השם שלך
  </Text>
  <TextInput
    style={{
      height: 51,
      width: 327,
      borderRadius: 5,
      padding: "16px 20px 16px 20px",
      borderWidth: 1,
      marginBottom: 8,
      textAlign: "center",
      textAlignVertical: "center",
    }}
    placeholder="השם שלך"
    onChangeText={setName}
    value={name}
  />
</View>
<View style={{marginBottom: 16}}>
<Text style={{fontSize: 16, marginBottom: 8, right: -212}}>
    שם המשפחה שלך
  </Text>
  <TextInput
    style={{
      height: 51,
      width: 327,
      borderRadius: 5,
      padding: "16px 20px 16px 20px",
      borderWidth: 1,
      marginBottom: 8,
      textAlign: "center",
      textAlignVertical: "center",
    }}
    placeholder="שם המשפחה שלך"
    onChangeText={setLastName}
    value={lastName}
  />
</View>
<View style={{marginBottom: 16}}>
<Text style={{fontSize: 16, marginBottom: 8, right: -220}}>
    מייל אוניברסיטאי
  </Text>
  <TextInput
    style={{
      height: 51,
      width: 327,
      borderRadius: 5,
      padding: "16px 20px 16px 20px",
      borderWidth: 1,
      marginBottom: 8,
      textAlign: "center",
      textAlignVertical: "center",
    }}
    placeholder="מייל אוניברסיטאי"
    onChangeText={setEmail}
    value={email}
  />
</View>
<View style={{marginBottom: 16}}>
<Text style={{fontSize: 16, marginBottom: 8, right: -285}}>
    סיסמא
  </Text>
  <TextInput
    style={{
      height: 51,
      width: 327,
      borderRadius: 5,
      padding: "16px 20px 16px 20px",
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
</View>
<TouchableOpacity onPress={handleRegister} style={{
height: 53,
width: 326,
left: 0,
top: 65,
borderRadius: 5,
padding: 16,
backgroundColor: "#006699",
justifyContent: "center",
alignItems: "center"
}}>
<Text style={{
fontFamily: "Rubik",
fontSize: 24,
fontWeight: "400",
lineHeight: 28,
letterSpacing: 0,
textAlign: "center",
color: "#FFFFFF",
}}>
אפשר להמשיך
</Text>
</TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
