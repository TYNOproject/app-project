import React from "react";
import { useContext, useState } from "react";
import StudentContext from "../contexts/StudentContext";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import * as constants from "../../constants";
import Service from "../api/Service";
import { addNewUser } from "../api/serviceCalls";
import { LinearGradient } from "expo-linear-gradient";

const handleRegister = async (navigation, studentDetails) => {
  console.log(studentDetails);
  const response = await addNewUser(studentDetails);
  console.log(response);
  if (response.status === 200) {
    navigation.navigate("HomePage");
  } else {
    alert("אירעה שגיאה, אנא נסה שנית");
  }
};

export default function StudentSignUpScreen({ navigation }) {
  // const studentDetails = navigation.getParam("studentDetails");
  const { addToStudent, items, getVal } = useContext(StudentContext);

  const name = getVal(items, "studentDetails").name;

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
          היי {name}, {"\n"}
          נעים להכיר! {"\n"}
        </Text>
        <Text style={styles.subheader}>נשאר לך רק לספר לנו על התואר שלך</Text>
      </View>
      <View style={styles.dropdown}>
        <SelectOption
          options={constants.faculties.map((faculty) => faculty.faculty_name)}
          defaultText="פקולטה"
          buttonStyle={styles.selectOptionStyle}
          onSelectOption={(selectedItem) => {
            facId = constants.faculties.find(
              (faculty) => faculty.faculty_name === selectedItem
            ).id;
            studentDetails = getVal(items, "studentDetails");
            addToStudent("studentDetails", {
              ...studentDetails,
              faculty: facId,
            });
          }}
        />
        <SelectOption
          options={constants.departments.map(
            (department) => department.department_name
          )}
          defaultText="מחלקה"
          buttonStyle={styles.selectOptionStyle}
          onSelectOption={(selectedItem) => {
            depId = constants.departments.find(
              (department) => department.department_name === selectedItem
            ).id;
            studentDetails = getVal(items, "studentDetails");
            console.log("selectedItem" + selectedItem);
            addToStudent("studentDetails", {
              ...studentDetails,
              departmentId: depId,
            });
          }}
        />
        <SelectOption
          options={constants.degrees}
          defaultText="תואר"
          buttonStyle={styles.selectOptionStyle}
          onSelectOption={(selectedItem) => {
            studentDetails = getVal(items, "studentDetails");
            addToStudent("studentDetails", {
              ...studentDetails,
              degree: selectedItem,
            });
          }}
        />
        <SelectOption
          options={constants.years}
          defaultText="שנה"
          buttonStyle={styles.selectOptionStyle}
          onSelectOption={(selectedItem) => {
            studentDetails = getVal(items, "studentDetails");
            addToStudent("studentDetails", {
              ...studentDetails,
              year: selectedItem,
            });
          }}
        />

        <Button
          title="אפשר להמשיך"
          titleStyle={{ fontSize: 18, textAlign: "center" }} // Add this line to center the title
          leading={() => <AntDesign name="left" size={24} color="white" />}
          style={{
            width: 250,
            height: 50,
            top: 120,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() =>
            handleRegister(navigation, getVal(items, "studentDetails"))
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
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  dropdown: {
    position: "relative",
    top: 290,
    height: 300,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 0, // add some padding to the bottom
  },
  selectOptionStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
    width: 250,
    borderColor: "purple", // added purple border color
    borderWidth: 2, // increased border width for visibility
    top: 20,
    paddingBottom: 0,
  },
});
