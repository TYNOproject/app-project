import React, { useEffect, useState} from "react";
import {Button} from "@react-native-material/core";
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from "react-native";
import {useFonts} from "expo-font";
import {AntDesign, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
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
        <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
            <Text style={styles.title}>
                <FontAwesome5 name="chalkboard-teacher" size={30} color="black"/>{"\n"}
                פרופיל מורה{"\n"}
                {name}
            </Text>
            <Button
                title="עריכת פרטי מורה"
                variant="outlined"
                color="black"
                titleStyle={{fontFamily: "Heebo-Regular"}}
            />
            <Button
                title="אישור/דחיית שיעורים ממתינים"
                variant="outlined"
                color="black"
                titleStyle={{fontFamily: "Heebo-Regular"}}
                onPress = {()=> navigation.navigate("ConfirmLessons")}
            />
            <View style={styles.divider} />
            <Text style={styles.containerHeaderText}>השיעורים הקרובים שלי</Text>
            <View style={styles.upcomingLessonsContainer}>
                {bookedClasses.length === 0 && (
                    <Text style={{textAlign: 'center', fontFamily: 'Heebo-Regular'}}>אין לך שיעורים קרובים</Text>
                )}
                {bookedClasses.length > 0 && (
                    <>
                        <View>
                            <ClassesList classes={bookedClasses} horizantal={true} style={"row"} />
                        </View>
                    </>
                )}
            </View>
            <View style={styles.divider} />
            <Text style={styles.containerHeaderText}>הזמנים הפנויים שלי</Text>
            <View style={styles.mySlotsContainer}>
                <AviableTimesList availableTimes={availableTimes}/>
            </View>
            <View style={styles.divider} />
            <Text style={styles.containerHeaderText}>הקורסים שאני מלמד</Text>
            <View style={styles.myCoursesContainer}>
                <TeacherCoursesList courses={teacherCourses}/>
            </View>
            <View style={styles.divider} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: "5%",
    },
    containerHeaderText: {
        writingDirection: 'rtl',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: "Heebo-Bold",
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {height: 1, width: 0}
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: "Heebo-Bold",
        marginBottom: 20,
        textAlign: 'center',
    },
    upcomingLessonsContainer: {
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
        padding: 10,
    },
    mySlotsContainer: {
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
        paddingBottom: 10,
    },
    myCoursesContainer: {
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#c2bbbb',
        marginVertical: 10,
    },
});
