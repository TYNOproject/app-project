import React, { Component, useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar, Card } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import StudentContext from "../contexts/StudentContext";
import * as constants from "../../constants";
import { getCoursesByDepartment } from "../api/serviceCalls";

export default function HomePageScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState(0);
  const [department, setDepartment] = useState(1);
  const [year, setYear] = useState(0);
  const [courses, setCourses] = useState([]);
  // const name = navigation.getParam("name");

  const { items, getVal, addToStudent } = useContext(StudentContext);
  const name = getVal(items, "studentDetails").name;
  useEffect(() => {
    getCoursesByDepartment(getVal(items, "studentDetails").departmentId)
      .then((response) =>
        response !== undefined ? setCourses(response.data) : setCourses([])
      )
      .catch((error) => console.log(error));
  }, []);
  //need to take from the DB

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
<View style={styles.container}>
          <View style={styles.topPart}>
        <Text style={styles.header}>
          היי {name}, {"\n"}
          מה נלמד הפעם? {"\n"}
        </Text>
      </View>
      <View style={styles.searchBar}>
        <SearchBar
          placeholder="חיפוש לפי קורס..."
          containerStyle={{ backgroundColor: "transparent" }}
          lightTheme
          round
          onChangeText={setSearch}
          value={search}
          autoCorrect={false}
        />
      </View>
      <View style={styles.dropdown}>
        <SelectOption
          options={constants.faculties.map((faculty) => faculty.faculty_name)}
          defaultText="פקולטה"
          buttonStyle={styles.dropdownButtonStyle}
          onSelectOption={(option) => setFaculty(option.id)}
        />
        <SelectOption
          options={constants.departments.map(
            (department) => department.department_name
          )}
          defaultText="מחלקה"
          buttonStyle={styles.dropdownButtonStyle}
          onSelectOption={(option) => setDepartment(option.id)}
        />
        <SelectOption
          options={constants.years}
          defaultText="שנה"
          buttonStyle={styles.dropdownButtonStyle}
          onSelectOption={(option) => setYear(option.id)}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.bottomHalf}>
        <CoursesList
          courses={courses}
          navigation={navigation}
          callback={() => navigation.navigate("CoursePage")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
  searchBar: {
    position: "absolute",
    direction: "rtl",
    top: 150,
    left: 60,
    height: 60,
    width: 300,
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    top: -20,
    textAlign: "center",
  },
  topPart: {
    position: "absolute",
    left: "10%",
    top: 0,
    width: 320,
    direction: "rtl",
    paddingTop: 50,
  },
  dropdown: {
    flexDirection: "row",
    top: 250,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    width: 110,
    top: -30,
  },

  spacer: {
    flex: 1,
  },
  bottomHalf: {
    alignSelf: "flex-end",
    width: "100%",
    flex: 2,
    top: 20,
  },
});
