import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const AfterRegistrationScreen = ({ navigation }) => {
  const name = navigation.getParam("name");


  const handleRegisterAsStudent = () => {
    navigation.navigate('StudentSignUp', { name: name });

  };

  const handleRegisterAsTeacher = () => {
    navigation.navigate('TeacherSignUp', { name: name });
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontSize: 35,
          fontWeight: "400",
          lineHeight: 36,
          letterSpacing: 0,
          textAlign: "center",
          marginTop: 90,
        }}
      >
        היי {name},
        {"\n"} כיף שהצטרפת!
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
          lineHeight: 24,
          letterSpacing: 0,
          textAlign: "center",
          top: 10,
          marginTop: 40,
        }}
      >
        אם נכנסת לכאן כדי ללמוד
      </Text>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          marginTop: 20,
          width: 326,
          height: 64,
          borderRadius: 5,
          backgroundColor: "#BFBFBF",
        }}
        onPress={handleRegisterAsStudent}

      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            lineHeight: 24,
            textAlign: "right",
            color: "#595959",
          }}
        >
          הרשמה כסטודנט
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
          lineHeight: 24,
          letterSpacing: 0,
          top: 10,
          textAlign: "center",
          marginTop: 100,
        }}
      >
        אם נכנסת לכאן כדי ללמד
      </Text>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          marginTop: 20,
          width: 326,
          height: 64,
          borderRadius: 5,
          backgroundColor: "#BFBFBF",
        }}
        onPress={handleRegisterAsTeacher}

      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            lineHeight: 24,
            textAlign: "right",
            color: "#595959",
          }}
        >
          הרשמה כמורה
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AfterRegistrationScreen;
