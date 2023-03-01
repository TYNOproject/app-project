import React, { useState } from "react";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import Service from "../api/Service";

const sendToServer = async (studentDetails) => {
  try {
    console.log(studentDetails);
    const response = await Service.post("/add", {
      name: studentDetails.name,
      email: studentDetails.email,
      password: studentDetails.password,
      degree: 1,
      departmentId: 1,
      year: 1,
      isTeacher: false,
      price: 0.0,
      description: "",
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export default function StudentSignUpScreen({ navigation }) {
  const [degree, setDegree] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [year, setYear] = useState("");
  const studentDetails = navigation.getParam("studentDetails");
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

  return (
    <View style={styles.whole}>
      <View style={styles.topPart}>
        <Text style={styles.header}>
          היי {studentDetails.name}, {"\n"}
          נעים להכיר! {"\n"}
        </Text>
        <Text style={styles.subheader}>נשאר לך רק לספר לנו על התואר שלך</Text>
      </View>
      <View style={styles.dropdown}>
        <SelectOption
          options={["1", "2", "3"]}
          defaultText="פקולטה"
          buttonStyle={styles.selectOptionStyle}
        />
        <SelectOption
          options={["1", "2", "3"]}
          defaultText="מחלקה"
          buttonStyle={styles.selectOptionStyle}
          onSelect={(selectedItem) => setDepartmentId(selectedItem)}
        />
        <SelectOption
          options={["1", "2", "3"]}
          defaultText="תואר"
          buttonStyle={styles.selectOptionStyle}
          onSelect={(selectedItem) => setDegree(selectedItem)}
        />
        <SelectOption
          options={["1", "2", "3"]}
          defaultText="שנה"
          buttonStyle={styles.selectOptionStyle}
          onSelect={(selectedItem) => setYear(selectedItem)}
        />
        <Button
          leading={() => <AntDesign name="left" size={24} />}
          title="זהו, סיימנו"
          variant="outlined"
          color="black"
          style={{ position: "relative", top: 10 }}
          onPress={() =>
            sendToServer({
              ...studentDetails,
              degree,
              departmentId,
              year,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  whole: {
    flexDirection: "column",
    alignItems: "center",
  },
  topPart: {
    position: "absolute",
    left: "10%",
    top: 20,
    width: 320,
    direction: "rtl",
    paddingTop: 50,
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  subheader: {
    fontFamily: "Heebo-Regular",
    fontWeight: "normal",
    textAlign: "center",
    fontSize: 20,
  },
  dropdown: {
    position: "relative",
    top: 290,
    height: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectOptionStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
    width: 250,
  },
});
