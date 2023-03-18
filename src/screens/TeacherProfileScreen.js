import React, {useEffect, useState} from "react";
import {Button} from "@react-native-material/core";
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from "react-native";
import {useFonts} from "expo-font";
import {AntDesign, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {useContext} from "react";
import TeacherCoursesList from "../components/TeacherCoursesList";
import StudentContext from "../contexts/StudentContext";
import ClassesList from "../components/ClassesList";
import AviableTimesList from "../components/AviableTimesList";
import {getTeacherClasses, getTeacherCourses, getTeacherPrice} from "../api/serviceCalls";
import {useIsFocused} from '@react-navigation/native';


export default function TeacherProfileScreen({navigation}) {
    const isFocused = useIsFocused();
    const {items, getVal} = useContext(StudentContext);
    const name = getVal(items, "studentDetails").name;
    const teacherPrice = getVal(items, "studentDetails").price;
    const [classes, setClasses] = useState([]);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        getTeacherClasses(getVal(items, "studentDetails").id)
            .then((response) =>
                response !== undefined ? setClasses(response.data) : setClasses([])
            )
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [isFocused]);

    useEffect(() => {
        setIsLoading(true);
        getTeacherCourses(getVal(items, "studentDetails").id)
            .then((response) =>
                response !== undefined ? setTeacherCourses(response.data) : setTeacherCourses([])
            )
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [isFocused]);

    const [bookedClasses, setBookedClasses] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    useEffect(() => setBookedClasses(classes.filter((item) => item.status === "booked")), [isFocused]);
    useEffect(() => setPendingClasses(classes.filter((item) => item.status === "pending")), [isFocused]);
    useEffect(() => {
        const available = classes.filter((item) => item.status === "available").map((item) => {
            return {date: item.date, startTime: item.startTime, endTime: item.endTime}
        });
        setAvailableTimes(available);
    }, [isFocused]);

    //need to take from the DB
    const price = getVal(items, "studentDetails").price;


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
                onPress={() => navigation.navigate("TeacherRegister")}
            />
            <Button
                title="אישור/דחיית שיעורים ממתינים"
                variant="outlined"
                color="black"
                titleStyle={{fontFamily: "Heebo-Regular"}}
                onPress={() => navigation.navigate("ConfirmLessons")}
            />
            <View style={styles.divider}/>
            <Text style={styles.containerHeaderText}>השיעורים הקרובים שלי</Text>
            <View style={styles.upcomingLessonsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <>
                        {bookedClasses.length === 0 && (
                            <Text style={{textAlign: 'center', fontFamily: 'Heebo-Regular'}}>אין לך שיעורים
                                קרובים</Text>
                        )}
                        {bookedClasses.length > 0 && (
                            <View>
                                <ClassesList classes={bookedClasses} horizantal={true} disabled={true}/>
                            </View>
                        )}
                    </>
                )}
            </View>
            <View style={styles.divider}/>
            <Text style={styles.containerHeaderText}>הזמנים הפנויים שלי</Text>
            <View style={styles.mySlotsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    {availableTimes.length === 0 && (
                    <Text style={styles.noAviableTimes}>אין לך זמנים פנויים</Text>
                )}
                {availableTimes.length > 0 && (
                    <>
                        <View>
                            <AviableTimesList availableTimes={availableTimes}/>
                )}
                        </View>

                    </>
                )}
            </View>
            <View style={styles.divider}/>
            <Text style={styles.containerHeaderText}>הקורסים שאני מלמד</Text>
            <View style={styles.myCoursesContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    {teacherCourses.length === 0 && (
                    <Text style={styles.noCourses}>עוד לא בחרת קורסים ללמד</Text>
                )}
                {teacherCourses.length > 0 && (
                    <>
                        <View>
                        <TeacherCoursesList courses={teacherCourses}/>
                )}
                        </View>
                    </>
                )}
            </View>
            <View style={styles.divider} />
            <Text style={styles.containerHeaderText}>המחיר שלי לשיעור</Text>
            <View style={styles.myPriceContainer}>
                {teacherPrice === 0 && (
                    <Text style={styles.noPrice}>עוד לא בחרת את המחיר שלך לשיעור</Text>
                )}
                {teacherPrice > 0 && (
                    <>
                        <Text style = {styles.price}>{teacherPrice} ש"ח</Text>
                    </>
                )}
            </View>
            <View style={styles.divider}/>
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
    noClasses: {
        textAlign: 'center',
        fontFamily: 'Heebo-Regular',
        padding: 10
    },
    mySlotsContainer: {
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
        paddingBottom: 10,
    },
    noAviableTimes: {
        textAlign: 'center',
        fontFamily: 'Heebo-Regular',
        padding: 10
    },
    myCoursesContainer: {
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
    },
    noCourses: {
        textAlign: 'center',
        fontFamily: 'Heebo-Regular',
        padding: 10
    },
    myPriceContainer: {
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
    },
    price: {
        textAlign: 'center',
        fontFamily: 'Heebo-Regular',
        fontSize: 16,
        padding: 10
    },
    noPrice: {
        textAlign: 'center',
        fontFamily: 'Heebo-Regular',
        padding: 10
    },
    divider: {
        height: 1,
        backgroundColor: '#c2bbbb',
        marginVertical: 10,
    },
});
