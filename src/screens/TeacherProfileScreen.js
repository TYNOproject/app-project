import React, { useEffect, useState} from "react";
import {Button} from "@react-native-material/core";
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from "react-native";
import {useFonts} from "expo-font";
import {AntDesign} from "@expo/vector-icons";
import {useContext} from "react";
import TeacherCoursesList from "../components/TeacherCoursesList";
import StudentContext from "../contexts/StudentContext";
import ClassesList from "../components/ClassesList";
import AviableTimesList from "../components/AviableTimesList";
import {getTeacherClasses, getTeacherCourses} from "../api/serviceCalls";


export default function TeacherProfileScreen({navigation}) {
    const {items, getVal} = useContext(StudentContext);
    const name = getVal(items, "studentDetails").name;
    const [classes, setClasses] = useState([]);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getTeacherClasses(getVal(items, "studentDetails").id)
            .then((response) =>
                response !== undefined ? setClasses(response.data) : setClasses([])
            )
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [name]);

    useEffect(() => {
        getTeacherCourses(getVal(items, "studentDetails").id)
            .then((response) =>
                response !== undefined ? setTeacherCourses(response.data) : setTeacherCourses([])
            )
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [name]);

    const [bookedClasses, setBookedClasses] = useState([]);
    const [pendingClasses, setPendingClasses] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    useEffect(() => setBookedClasses(classes.filter((item) => item.status === "booked")), [classes]);
    useEffect(() => setPendingClasses(classes.filter((item) => item.status === "pending")), [classes]);
    useEffect(() => {
        const available = classes.filter((item) => item.status === "available").map((item) =>
        {
            return {date: item.date, startTime: item.startTime, endTime: item.endTime}
        });
        setAvailableTimes(available);
    }, [classes]);

    //need to take from the DB
    const price = getVal(items, "studentDetails").price;


    let [fontsLoaded] = useFonts({
        "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
        "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf")
    });

    if (!fontsLoaded)
        return (
            <View>
                <Text>loading</Text>
            </View>
        );

    const handleLessonsConfermation = () => {
        navigation.navigate("ConfirmLessons");
    };

    const handleEditTeacher = () => {
        navigation.navigate("TeacherRegister");
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>
                היי {name}
            </Text>
            <Text style={styles.feutareLessons}>שיעורים קרובים</Text>
            {bookedClasses.length === 0 && (
                <Text style={styles.noClassesText}>אין לך שיעורים קרובים</Text>
            )}
            {bookedClasses.length > 0 && (
             <>
                <View style={styles.scrollView}>
                    <ClassesList classes={bookedClasses} horizantal={true} style={"row"} />
                </View>
            </>
            )}
            {/* <Text style={styles.waitingLessons}>
                שיעורים שמחכים לאישור
            </Text>
            <View style={styles.scrollView}>
                <ClassesList classes={pendingClasses} horizantal={true} style={"row"} width={160}/>
            </View> */}
            <Button style={styles.ConfirmLessonsButton}
                    leading={() => <AntDesign name="left" size={24}/>}
                    title="לאישור/דחיית שיעורים ממתינים"
                    variant="outlined"
                    color="black"
                    onPress={handleLessonsConfermation}/>
            <View style={styles.row}>
                <Button style={styles.editButton}
                        title="עריכת פרטים אישיים"
                        variant="outlined"
                        color="black"
                        onPress={handleEditTeacher}/>
                <Text style={styles.teacherCourses}>
                    קורסים שאני מלמד
                </Text>
            </View>
            <View style={styles.scrollView}>
                <TeacherCoursesList courses={teacherCourses}/>
            </View>
            <Text style={styles.aviableTimes}>
                הזמנים הפנויים שלי
            </Text>
            <View style={styles.scrollView}>
                <AviableTimesList availableTimes={availableTimes}/>
            </View>
            <Text style={styles.teacherPrice}>
                המחיר שלי לשיעור: {price} ש"ח
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        verticalAlign: "top",
    },
    header: {
        marginBottom: 20,
        fontFamily: "Heebo-Bold",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
    },
    feutareLessons: {
        fontSize: 20,
        fontFamily: "Heebo-Bold",
        right: 10,
        alignSelf: "flex-end",
        marginBottom: 20
    },
    noClassesText: {
        fontFamily: "Heebo-Bold",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 100,
        top: 30
    },
    scrollView: {
        alignSelf: "flex-end",
        width: "100%",
        marginBottom: 10
    },
    // waitingLessons: {
    //     fontSize: 20,
    //     fontFamily: "Heebo-Bold",
    //     right: 10,
    //     alignSelf: "flex-end",
    //     marginBottom: -15
    // },
    ConfirmLessonsButton: {
        position: "relative",
        marginBottom: 30,
    },
    row: {
        flexDirection: "row",
        marginBottom: 5,
    },
    editButton: {
        position: "relative",
        alignSelf: "flex-start",
        left: 10,
    },
    teacherCourses: {
        fontSize: 20,
        fontFamily: "Heebo-Bold",
        flex: 1,
        textAlign: "right",
        right: 10,
    },
    aviableTimes: {
        fontSize: 20,
        fontFamily: "Heebo-Bold",
        right: 10,
        alignSelf: "flex-end",
        marginBottom: 5
    },
    teacherPrice: {
        fontSize: 20,
        fontFamily: "Heebo-Bold",
        flex: 1,
        textAlign: "right",
        right: 10
    },

});
