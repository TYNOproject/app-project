import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function ReviewScreen ({ navigation }){
  const name = navigation.getParam("username");
  const teacherName = navigation.getParam("teacherName");
  const [numReview, setNumReview] = useState("");
  const [wordReview, setWordReview] = useState("");

const handleReview = () => {
// handle review logic here
navigation.navigate("HomePage", {name});
};

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

  return (
    <View style={styles.container}>
      <Text style={styles.header1}>
        כל הכבוד {name} !
      </Text>
      <Text style={styles.header2}>
        סיימת שיעור עם {teacherName}
      </Text>
      <Text style={styles.content}>
        נשמח שתספר לנו איך היה השיעור עם {teacherName} {"\n"}
        זה יכול לעזור ל{teacherName} ולסטודנטים הבאים
      </Text>
      <TextInput multiline
        style={styles.inputField}
        placeholder="הוסף הערה"
        onChangeText={setWordReview}
        value={wordReview}
      />
      <Button style = {styles.button}
        leading={() => <AntDesign name="left" size={24} />}
        title="שלח הערה"
        variant="outlined"
        color="black"
        onPress={handleReview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
  },
  header1: {
    marginBottom: 20,
    fontSize: 30,
    top: 20,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
  },
  header2: {
    fontSize: 20,
    top: 20,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    top: 100,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
  },
  inputField: {
    width: 300,
    height: 90,
    top: 120,
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
  button: {
    position: "relative",
    top: 130

  }
});