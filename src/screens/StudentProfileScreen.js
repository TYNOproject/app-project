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
        navigation.navigate("TeacherProfile");
    }

    useEffect(() => {
        getStudentClasses(getVal(items, "studentDetails").id)
            .then((response) =>
                response !== undefined ? setClasses(response.data) : setClasses([])
            )
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    if (!fontsLoaded)
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.header}>
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
            <View style={styles.spacer}/>
            <View style={styles.bottomHalf}>
                {isLoading ? (<ActivityIndicator size="large" color="#0000ff"/>) : (
                    <ClassesList classes={classes}/>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 90,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
    },
    topContainer: {
        flex: 2,
        height: 200,
    },
    header: {
        fontSize: 30,
        fontFamily: "Heebo-Bold",
        textAlign: "center",
    },
    spacer: {
        flex: 1,
    },
    bottomHalf: {
        alignSelf: "flex-end",
        width: "100%",
        flex: 4,
        top: -80,
        right: -20,
    },
});
