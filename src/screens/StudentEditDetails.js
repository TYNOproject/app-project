import React from "react";
import { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import StudentContext from "../contexts/StudentContext";
import SelectOption from "../components/SelectOption";
import * as constants from "../../constants";

export default function StudentEditDetails({ navigation }) {
  const { items, getVal, addToStudent } = useContext(StudentContext);
  const name = getVal(items, "studentDetails").name;
  const [privateInfo, setPrivateInfo] = useState("");

  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  function handleRegisterPress() {
    navigation.navigate("Register");
  }

  function handleTeacherPress() {
    navigation.navigate("TeacherProfile");
  }

  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <MaterialCommunityIcons
          name="card-account-details-outline"
          size={50}
          color="black"
        />
        {"\n"}
        עריכת פרטים אישיים
      </Text>
      <View style={styles.optionsContainer}>
        <SelectOption
          options={constants.faculties.map((faculty) => faculty.faculty_name)}
          defaultText="בחר פקולטה"
          buttonStyle={styles.selectOptionStyle}
          onSelectOption={(selectedItem) => {
            let studentDetails = getVal(items, "studentDetails");
            addToStudent("studentDetails", {
              ...studentDetails,
              faculty: selectedItem,
            });
          }}
        />
        <SelectOption
          options={constants.departments.map((dep) => dep.department_name)}
          defaultText="בחר מחלקה"
          buttonStyle={styles.selectOptionStyle}
          onSelectOption={(selectedItem) => {
            let studentDetails = getVal(items, "studentDetails");
            addToStudent("studentDetails", {
              ...studentDetails,
              department: selectedItem,
            });
          }}
        />
        <SelectOption
          options={constants.degrees}
          defaultText="בחר תואר"
          buttonStyle={styles.selectOptionStyle}
          onSelectOption={(selectedItem) => {
            let studentDetails = getVal(items, "studentDetails");
            addToStudent("studentDetails", {
              ...studentDetails,
              degree: selectedItem,
            });
          }}
        />
        <SelectOption
          options={constants.years}
          defaultText="בחר שנה"
          buttonStyle={styles.selectOptionStyle}
          onSelectOption={(selectedItem) => {
            let studentDetails = getVal(items, "studentDetails");
            addToStudent("studentDetails", {
              ...studentDetails,
              year: selectedItem,
            });
          }}
        />
        <TextInput
          value={privateInfo}
          onChangeText={(info) => setPrivateInfo(info)}
          placeholder={"הכנס תיאור אישי..."}
          style={styles.input}
          editable
          multiline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topContainer: {
    flex: 2,
    height: 200,
  },
  header: {
    fontSize: 30,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
  },
  spacer: {
    flex: 1,
  },
  bottomHalf: {
    alignSelf: "flex-end",
    width: "100%",
    flex: 4,
    top: -80,
    right: -20,
  },
  selectOptionStyle: {
    margin: "3%",
    borderRadius: 8,
    borderColor: "#444",
    width: 250,
    borderWidth: 2, // increased border width for visibility
    top: 20,
    paddingBottom: 0,
  },

  input: {
    padding: "30%",
    marginTop: 50,
    marginBottom: 10,
    borderColor: "#444",
    backgroundColor: "#e8e8e8",
  },
});
