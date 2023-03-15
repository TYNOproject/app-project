import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SearchBar } from "react-native-elements";

import ClassContext from "../contexts/ClassContext";
import StudentContext from "../contexts/StudentContext";
import CoursesList from "../components/CoursesList";
import SelectOption from "../components/SelectOption";
import * as constants from "../../constants";
import {getCoursesByDepartment, searchCourses} from "../api/serviceCalls";
import {FontAwesome} from "@expo/vector-icons";
import { set } from "react-native-reanimated";


export default function RegisterScreen({ navigation }) {
  const { clearItems } = useContext(StudentContext);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState(0);
  const [department, setDepartment] = useState(1);
  const [year, setYear] = useState(1);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {items, getVal, addToStudent} = useContext(StudentContext);
  const name = getVal(items, "studentDetails").name;
  useEffect(() => {
    addToStudent('coursesList',new Set());
      getCoursesByDepartment(getVal(items, "studentDetails").department.id)
          .then((response) =>
              response !== undefined ? setCourses(response.data) : setCourses([])
          )
          .catch((error) => console.log(error))
          .finally(() => setIsLoading(false));
  }, []);

  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  function modifySet(id) {
    let set = getVal(items,'coursesList')
    if (set.has(id)) {
      set.delete(id);
    } else {
      set.add(id);
    }
    addToStudent('coursesList',set);
  }

  const handleSearch = (search) => {
    let searchDetails = {
        courseName: search,
        departmentId: department,
        year: year,
    };

    searchCourses(searchDetails)
        .then((response) => {
            response !== undefined ? setCourses(response.data) : setCourses([]);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
};

  const handleRegister = () => {
    navigation.navigate("TeacherProfile");
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
        כמה פרטים וסיימנו
      </Text>
      <Text style= {styles.description}>
        תספר לתלמידים שלנו קצת עלייך: תואר,שנה.. {"\n"}
        התיאור יופיע בעמוד המורה שלך
      </Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="תספר לנו קצת עלייך"
        onChangeText={setDescription}
        value={description}
      />
      <Text style= {styles.price}>
        מה המחיר שלך לשיעור?
      </Text>
      <TextInput
        keyboardType="numeric"
        style={styles.priceinput}
        placeholder="מחיר לשיעור"
        onChangeText={setPrice}
        value={price}
      />
      <Text style= {styles.courses}>
        איזה קורסים אתה מעוניין ללמד?
      </Text>
      </View>
      <View style={styles.searchBar}>
                <SearchBar
                    placeholder="חיפוש לפי קורס..."
                    containerStyle={{backgroundColor: "transparent"}}
                    lightTheme
                    round
                    onChangeText={setSearch}
                    value={search}
                    autoCorrect={false}
                    searchIcon={
                        <FontAwesome
                            name="search"
                            size={24}
                            color="black"
                            onPress={() => {
                                setIsLoading(true);
                                handleSearch(search)
                            }}
                        />
                    }
                />
            </View>
            <View style={styles.dropdown}>
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
                    onSelectOption={(option) => {
                        console.log("option chosen in year: " + option);
                        setYear(option);
                    }}
                />
            </View>
            <View style={styles.bottomHalf}>
                {isLoading ? (<ActivityIndicator size="large" color="#0000ff" />) : (

                        <CoursesList
                            courses={courses}
                            navigation={navigation}
                            changeColor = {true}
                            callback={(id) => modifySet(id)}
                        />
                    )}
            </View>
      <Button style = {styles.button}
        leading={() => <AntDesign name="left" size={24} />}
        title="אפשר להמשיך"
        variant="outlined"
        color="black"
        onPress={() => {
          // clearItems();
          // addToStudent('username', name);
          handleRegister();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 5
  },
  topPart: {
    flex: 2.5,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontFamily: "Heebo-Regular",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  descriptionInput: {
    width: 300,
    height: 70,
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
    marginBottom: 20
  },
  price: {
    fontFamily: "Heebo-Regular",
    fontSize: 16,
    marginBottom: 10,
  },
  priceinput: {
    width: 300,
    height: 40,
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
    marginBottom: 10
  },
  courses: {
    fontFamily: "Heebo-Bold",
    fontSize: 16,
    marginBottom: -40
  },
  searchBar: {
    marginBottom: 10,
    marginHorizontal: 20,
    direction: "rtl",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  dropdownButtonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    width: 150,
    height: 30,
    marginBottom: - 10
  },
  bottomHalf: {
    alignSelf: "flex-end",
    width: "100%",
    flex: 2,
  },
    button: {
    position: "relative",
    marginBottom: 10
  }
});
