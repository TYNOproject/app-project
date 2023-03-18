import React, {useEffect, useState} from "react";
import {useContext} from "react";
import {set} from "react-native-reanimated";
import {View, Text, StyleSheet, ActivityIndicator, Alert} from "react-native";
import {Button} from "@react-native-material/core";
import {AntDesign} from "@expo/vector-icons";
import {useFonts} from "expo-font";
import ClassesList from "../components/ClassesList";
import StudentContext from "../contexts/StudentContext";
import {getTeacherClasses, approveClass, rejectClass} from "../api/serviceCalls";
import {useIsFocused} from "@react-navigation/native";

export default function ConfirmLessonsScreen({navigation}) {
    const {items, getVal, addToStudent} = useContext(StudentContext);
    const name = getVal(items, "studentDetails").name;
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [changeFlag, setChangeFlag] = useState(false);
    const isFocused = useIsFocused();


    useEffect(() => {
        setIsLoading(true);
        addToStudent('confirmedClasses', new Set());
        addToStudent('deniedClasses', new Set());
        getTeacherClasses(getVal(items, "studentDetails").id)
            .then((response) =>
                response !== undefined ? setClasses(response.data) : setClasses([])
            )
            .catch((error) => console.log(error))
            .finally(() => {
                setChangeFlag(false);
                setIsLoading(false)
            });
    }, [name, changeFlag, isFocused]);

    const [pendingClasses, setPendingClasses] = useState([]);
    useEffect(() => setPendingClasses(classes.filter((item) => item.status === "pending" && item.over === false)), [isFocused]);

    let [fontsLoaded] = useFonts({
        "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
        "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
    });

    function modifyConfirmedSet(id) {
        let confirmedSet = getVal(items, 'confirmedClasses');
        let deniedSet = getVal(items, 'deniedClasses');
        if (confirmedSet.has(id)) {
            confirmedSet.delete(id);
        } else {
            confirmedSet.add(id);
        }
        if (deniedSet.has(id)) {
            deniedSet.delete(id);
        }
        addToStudent('confirmedClasses', confirmedSet);
        addToStudent('deniedClasses', deniedSet);
    }

    function modifyDeniedSet(id) {
        let confirmedSet = getVal(items, 'confirmedClasses');
        let deniedSet = getVal(items, 'deniedClasses');
        if (deniedSet.has(id)) {
            deniedSet.delete(id);
        } else {
            deniedSet.add(id);
        }
        if (confirmedSet.has(id)) {
            confirmedSet.delete(id);
        }
        addToStudent('confirmedClasses', confirmedSet);
        addToStudent('deniedClasses', deniedSet);
    }

    function cancel(id) {
        let confirmedSet = getVal(items, 'confirmedClasses');
        let deniedSet = getVal(items, 'deniedClasses');
        if (confirmedSet.has(id)) {
            confirmedSet.delete(id);
        }
        if (deniedSet.has(id)) {
            deniedSet.delete(id);
        }
        addToStudent('confirmedClasses', confirmedSet);
        addToStudent('deniedClasses', deniedSet);
    }

    function handleContinue() {
        const confirmedClasses = Array.from(getVal(items, 'confirmedClasses'));
        const deniedClasses = Array.from(getVal(items, 'deniedClasses'));
        const teacherId = getVal(items, "studentDetails").id;
        confirmedClasses.map((classId) => (
            approveClass({classId, teacherId}).then((response) => {
                    response !== undefined ? alert("working") : alert("error!");
                }
            ).catch((error) => console.log(error))
        ));
        deniedClasses.map((classId) => (
            rejectClass({classId, teacherId}).then((response) => {
                    response !== undefined ? alert("working") : alert("error!");
                }
            ).catch((error) => console.log(error))
        ));
        navigation.navigate("TeacherProfile");
    }

    function handlePress(id) {
        return new Promise((resolve) => {
            Alert.alert('האם תרצה לאשר או לדחות את השיעור?', '', [
                {
                    text: 'אישור',
                    onPress: () => {
                        modifyConfirmedSet(id);
                        resolve(1);
                    }
                },
                {
                    text: 'דחייה',
                    onPress: () => {
                        modifyDeniedSet(id);
                        resolve(2);
                    }
                },
                {
                    text: 'חזרה',
                    style: 'cancel',
                    onPress: () => {
                        cancel(id);
                        resolve(0);
                    }
                },
            ]);
        });
    }

    if (!fontsLoaded)
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                שיעורים שממתינים לאישור
            </Text>
            <View style={styles.content}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    pendingClasses.length > 0 ? (
                        <ClassesList classes={pendingClasses} horizantal={false} disabled={false}
                                     callback={(id) => handlePress(id)}/>
                    ) : (
                        <Text style={styles.noClasses}>לא נמצאו שיעורים</Text>
                    )
                )}
            </View>
            <Button style={styles.button}
                    leading={() => <AntDesign name="left" size={24}/>}
                    title="אפשר להמשיך"
                    variant="outlined"
                    color="black"
                    onPress={() => {
                        setChangeFlag(true);
                        handleContinue();
                    }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
    },
    header: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: "Heebo-Bold",
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {height: 1, width: 0}
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    noClasses: {
        fontSize: 20,
        fontFamily: 'Heebo-Bold',
        textAlign: "center",
    },
    button: {
        position: "relative",
        marginBottom: 10
    },
});
