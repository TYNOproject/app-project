import React, { Component, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar, Card } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import Service from "../api/Service";
  import StudentContext from "../../StudentContext";


export default function HomePageScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [listOfCourses, setListOfCourses] = useState([]);

  const getCoursesByDepartment = async (depId) => {
    try {
      const response = await Service.post("/getCoursesByDepartment", {
        departmentId: depId,
      });
      setListOfCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  getCoursesByDepartment(3);

  const name = navigation.getParam("name");
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
          placeholder="חיפוש לפי קורס\מורה..."
          lightTheme
          round
          onChangeText={setSearch}
          value={search}
          autoCorrect={false}
        />
      </View>
      <View style={styles.dropdown}>
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="פקולטה"
          buttonStyle={styles.dropdownButtonStyle}
        />
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="מחלקה"
          buttonStyle={styles.dropdownButtonStyle}
        />
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="תואר"
          buttonStyle={styles.dropdownButtonStyle}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.bottomHalf}>
        <CoursesList courses={listOfCourses} />
      </View>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      alignItems:"center",
      flexDirection: "column",
      flex: 1,
    },
    searchBar: {
        position: "absolute",
        direction: "rtl",
        top: 150,
        left: 60,
        height: 60,
        width: 300
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
      flexDirection:"row",
      top: 250,
      justifyContent: "space-between",
      alignItems: "center"
    },
    dropdownButtonStyle: {
      flexDirection:"row",
      justifyContent : "center",
      width:110,
      top:-30
    },

    spacer: {
      flex: 1,
    },
    bottomHalf: {
      alignSelf: "flex-end",
      width: '100%',
      flex: 2,
      top:-20
    },
  });

