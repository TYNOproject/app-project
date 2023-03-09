import React, { Component,useState ,useContext,useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar, Card } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import TeacherCard from "../components/TeacherCard";
import TeachersList from "../components/TeachersList";
import StudentContext from "../contexts/StudentContext";
import ClassContext from "../contexts/ClassContext";
import { getTeachersByCourseName } from "../api/serviceCalls.js";

export default function CoursePageScreen({ navigation }) {
  const [teachers, setTeachers] = useState([]);
  // const course = navigation.getParam("course");

  const {itemsClass} = useContext(ClassContext);
  const {getValClass} = useContext(ClassContext)
  const course = getValClass(itemsClass,'courseName');

  const getTeachers = () => {
    useEffect(() => {
      async function fetchData() {
        teachersRespone = await getTeachersByCourseName(course);
        console.log(teachersRespone.data);
        setTeachers(teachersRespone.data);
      }
      fetchData();
    },[]);
  };

  getTeachers();

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
      <View style={styles.topPart}>
        <Text style={styles.header}>מורים בקורס {course}</Text>
      </View>
      <View style={styles.dropdown}>
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="מיון"
          buttonStyle={styles.dropdownButtonStyle}
        />
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="סינון"
          buttonStyle={styles.dropdownButtonStyle}
        />
      </View>
      <View style={styles.spacer} />
        <View style={styles.bottomHalf}>
            <TeachersList teachers={teachers} navigation={navigation} />
        </View>
      </View>); 
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
    top: 0,
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
    top: 120,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    width: 110,
  },

  spacer: {
    flex: 1,
  },
  bottomHalf: {
    alignSelf: "flex-end",
    width: "100%",
    flex: 4,
  },
});
