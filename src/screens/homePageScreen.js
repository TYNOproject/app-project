import React, { Component,useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList,Button } from "react-native";
import { ListItem, SearchBar,Card } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import StudentContext from "../contexts/StudentContext";
import { getCoursesByCourseName } from "../api/serviceCalls.js";


export default function HomePageScreen({ navigation })
{
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  // const name = navigation.getParam("name");

  const {items} = useContext(StudentContext);
  const {getVal} = useContext(StudentContext)
  const username = getVal(items,"username");

  
  //need to take from the DB

  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  const handleSerach = async () => {
    serchRespone = await getCoursesByCourseName(search);
    console.log(serchRespone.data);
    setCourses(serchRespone.data);
  };

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
          היי {username}, {"\n"}
          מה נלמד הפעם? {"\n"}
        </Text>
      </View>
    <View style={
      styles.searchBar
    }>
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
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="פקולטה" buttonStyle= {styles.dropdownButtonStyle} />
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="מחלקה" buttonStyle= {styles.dropdownButtonStyle} />
        <SelectOption options={["1", "2", "3", "4"]} defaultText="שנה" buttonStyle= {styles.dropdownButtonStyle} />
      </View>
      <Button title="חפש" onPress={handleSerach}></Button>
      <View style={styles.spacer} />
        <View style={styles.bottomHalf}>
            <CoursesList courses={courses} navigation={navigation} />
        </View>
      </View>); 
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
  searchButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    width: 150,
    alignSelf: 'center',
    position: "relative",
  },
});