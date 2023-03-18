import React, {useEffect, useState} from "react";
import {useContext} from "react";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import {Button} from "@react-native-material/core";
import {FontAwesome5} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useFonts} from "expo-font";
import ClassesList from "../components/ClassesList";
import StudentContext from "../contexts/StudentContext";
import {getStudentClasses} from "../api/serviceCalls";

export default function StudentProfileScreen({navigation}) {
    const {items} = useContext(StudentContext);
    const {getVal} = useContext(StudentContext);
    const name = getVal(items, "studentDetails").name;
    const isTeacher = getVal(items, "studentDetails").isTeacher;
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let [fontsLoaded] = useFonts({
        "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
        "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
    });

    function handleRegisterPress() {
        navigation.navigate("EditStudentDetails");
    }

    function handleTeacherPress() {
        isTeacher ? navigation.navigate("TeacherProfile") : navigation.navigate("TeacherSignUp")
    }

    useEffect(() => {
        getStudentClasses(getVal(items, "studentDetails").id)
            .then((response) =>
                response !== undefined ? setClasses(response.data) : setClasses([])
            )
            .catch((error) => {
                setClasses([])
            })
            .finally(() => setIsLoading(false));
    }, [name]);

    if (!fontsLoaded)
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    פרופיל אישי{"\n"}
                    {name}
                </Text>
                <Button
                    leading={() => (
                        <MaterialCommunityIcons
                            name="card-account-details-outline"
                            size={30}
                            color="black"
                        />
                    )}
                    title="עריכת פרטים אישיים"
                    variant="outlined"
                    color="black"
                    onPress={handleRegisterPress}
                />
                <Button
                    leading={() => (
                        <FontAwesome5 name="chalkboard-teacher" size={24} color="black"/>
                    )}
                    title="עבור לפרופיל מורה"
                    variant="outlined"
                    color="black"
                    style={{position: "relative", top: 10}}
                    onPress={handleTeacherPress}
                />
            </View>
            <View style={styles.content}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    classes.length > 0 ? (
                        <ClassesList classes={classes} disabled={true}/>
                    ) : (
                        <Text style={{fontSize: 20, fontFamily: 'Heebo-Bold', textAlign: "center"}}>לא נמצאו שיעורים</Text>
                    )
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
    },
    header: {
        alignItems: "center",
        height: "40%",
        justifyContent: "center",
    },
    headerText: {
        fontSize: 30,
        fontFamily: "Heebo-Bold",
        textAlign: "center",
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        right: "-5%"
    },
});
