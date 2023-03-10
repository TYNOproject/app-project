import React, {useState, useContext, useEffect} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {useFonts} from "expo-font";
import SelectOption from "../components/SelectOption";

import TeachersList from "../components/TeachersList";
import ClassContext from "../contexts/ClassContext";
import {getTeachersByCourseName} from "../api/serviceCalls.js";

export default function CoursePageScreen({navigation}) {
    const [teachers, setTeachers] = useState([]);

    const {itemsClass, getValClass} = useContext(ClassContext);
    const course = getValClass(itemsClass, 'courseName');
    const filterOptions = ["rate", "year", "price"];
    const sortOptions = ["rate", "year", "price"];
    const [isLoading, setIsLoading] = useState(true);

    function sortByProperty(list, property) {
        return list.sort((a, b) => {
            if (a[property] < b[property]) {
                return -1;
            } else if (a[property] > b[property]) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    useEffect(() => {
        getTeachersByCourseName(course)
            .then((response) =>
                response !== undefined ? setTeachers(response.data) : setTeachers([])
            )
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    let [fontsLoaded] = useFonts({
        "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
        "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf")
    });

    if (!fontsLoaded)
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );

    return (
        <View style={styles.container}>
            <View style={styles.topPart}>
                <Text style={styles.header}>מורים בקורס {course}</Text>
            </View>
            <View style={styles.dropdown}>
                <SelectOption
                    options={sortOptions}
                    defaultText="מיון"
                    buttonStyle={styles.dropdownButtonStyle}
                    onSelectOption={(option) => {
                        console.log("option chosen in year: " + option);
                        setTeachers(sortByProperty(teachers, option));
                    }}
                />
                <SelectOption
                    options={filterOptions}
                    defaultText="סינון"
                    buttonStyle={styles.dropdownButtonStyle}
                />
            </View>
            <View style={styles.spacer}/>
            <View style={styles.bottomHalf}>
                {isLoading ? (<ActivityIndicator size="large" color="#0000ff"/>) : (
                    <TeachersList teachers={teachers} navigation={navigation}/>)}
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
