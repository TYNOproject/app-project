import React, {useState, useContext, useEffect} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {useFonts} from "expo-font";
import SelectOption from "../components/SelectOption";

import TeachersList from "../components/TeachersList";
import ClassContext from "../contexts/ClassContext";
import {getTeachersByCourseName} from "../api/serviceCalls.js";

export default function CoursePageScreen({navigation}) {
    const [teachers, setTeachers] = useState([]);
    const [changeFlag, setchangeFlag] = useState(false);

    const {itemsClass, getValClass} = useContext(ClassContext);
    const course = getValClass(itemsClass, 'courseName');
    const sortOptions = ["rate", "year", "price"];
    const [isLoading, setIsLoading] = useState(true);

    function sortByProperty(list, property) {
        setchangeFlag(!changeFlag);
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
        setIsLoading(true);
        getTeachersByCourseName(course)
            .then((response) =>
                response !== undefined ? setTeachers(response.data) : setTeachers([])
            )
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    },[course,changeFlag]);

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
                        setTeachers(sortByProperty(teachers, option));
                    }}
                />
            </View>
            <View style={styles.spacer}/>
            <View style={styles.bottomHalf}>
                {isLoading ? (<ActivityIndicator size="large" color="#0000ff"/>) : teachers.length > 0 ? (
                    <TeachersList teachers={teachers} navigation={navigation}/>) :  (
                    <Text style={{textAlign: 'center', fontFamily: 'Heebo-Regular' , fontSize:20, top:"20%"}}>אין מורים זמינים כרגע</Text>    
                    )}
            </View>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
    },
    header: {
        fontFamily: "Heebo-Bold",
        fontWeight: "bold",
        fontSize: 30,
        shadowOpacity: 0.2,
        shadowRadius: 1,
        textAlign: "center",
        flex: 0.5,
    },
    topPart: {
        position: "absolute",
        direction: "rtl",
        paddingTop: "10%",
    },
    dropdown: {
        flexDirection: "row",
        top: "35%",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
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
        width: "100%",
        flex: 3,

    },
});
