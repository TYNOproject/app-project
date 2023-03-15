import React from "react";
import {useContext, useState} from "react";
import StudentContext from "../contexts/StudentContext";
import {Button} from "@react-native-material/core";
import {AntDesign} from "@expo/vector-icons";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {useFonts} from "expo-font";
import SelectOption from "../components/SelectOption";
import * as constants from "../../constants";
import {FancyAlert} from "react-native-expo-fancy-alerts";
import {addNewUser} from "../api/serviceCalls";


export default function StudentSignUpScreen({navigation}) {
    const {addToStudent, items, getVal, clearItems} = useContext(StudentContext);
    const [visible, setVisible] = useState(false);

    const name = getVal(items, "studentDetails").name;

    let [fontsLoaded] = useFonts({
        "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
        "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
    });

    if (!fontsLoaded)
        return (
            <View>
                <Text>loading</Text>
            </View>
        );

    return (
        <View style={styles.whole}>

            <View style={styles.topPart}>
                <Text style={styles.header}>
                    היי {name}, {"\n"}
                    נעים להכיר! {"\n"}
                </Text>
                <Text style={styles.subheader}>נשאר לך רק לספר לנו על התואר שלך</Text>
            </View>
            <View style={styles.dropdown}>
                <SelectOption
                    options={constants.faculties.map((faculty) => faculty.faculty_name)}
                    defaultText="פקולטה"
                    buttonStyle={styles.selectOptionStyle}
                    onSelectOption={(selectedItem) => {
                        let facId = constants.faculties.find(
                            (faculty) => faculty.faculty_name === selectedItem
                        ).id;
                        let studentDetails = getVal(items, "studentDetails");
                        addToStudent("studentDetails", {
                            ...studentDetails,
                            faculty: facId,
                        });
                    }}
                />
                <SelectOption
                    options={constants.departments.map(
                        (department) => department.department_name
                    )}
                    defaultText="מחלקה"
                    buttonStyle={styles.selectOptionStyle}
                    onSelectOption={(selectedItem) => {
                        let depId = constants.departments.find(
                            (department) => department.department_name === selectedItem
                        ).id;
                        let studentDetails = getVal(items, "studentDetails");
                        console.log("selectedItem" + selectedItem);
                        addToStudent("studentDetails", {
                            ...studentDetails,
                            department: depId,
                        });
                    }}
                />
                <SelectOption
                    options={constants.degrees}
                    defaultText="תואר"
                    buttonStyle={styles.selectOptionStyle}
                    onSelectOption={(selectedItem) => {
                        let studentDetails = getVal(items, "studentDetails");
                        addToStudent("studentDetails", {
                            ...studentDetails,
                            degree: selectedItem,
                        });
                    }}
                />
                <SelectOption
                    options={constants.years}
                    defaultText="שנה"
                    buttonStyle={styles.selectOptionStyle}
                    onSelectOption={(selectedItem) => {
                        let studentDetails = getVal(items, "studentDetails");
                        addToStudent("studentDetails", {
                            ...studentDetails,
                            year: selectedItem,
                        });
                    }}
                />

                <Button
                    title="אפשר להמשיך"
                    titleStyle={{fontSize: 18, textAlign: "center"}} // Add this line to center the title
                    leading={() => <AntDesign name="left" size={24} color="white"/>}
                    style={{
                        width: 250,
                        height: 50,
                        top: 120,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => {
                        addNewUser(getVal(items, "studentDetails"))
                            .then(() => {
                                setVisible(true);
                                navigation.navigate("LogIn");
                            })
                            .catch((err) => alert("אירעה שגיאה, אנא נסה שנית"))
                    }}
                />
                <FancyAlert visible={visible}
                            icon={
                                <View style={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#b8dea5',
                                    borderRadius: 50,
                                    width: '100%',
                                    shadowOpacity: 0.2,
                                }}>
                                    <Text>✅</Text>
                                </View>

                            }
                            style={
                                {backgroundColor: 'white',}
                            }
                            onRequestClose={() => setVisible(false)}>
                    <Text style={styles.alertText}>
                        נרשמת בהצלחה!
                        כעת תוכל להתחבר לאפליקציה
                    </Text>
                    <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
                        <Text style={styles.alertText}>אוקיי, הבנתי</Text>
                    </TouchableOpacity>
                </FancyAlert>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    whole: {
        flexDirection: "column",
        alignItems: "center",
    },
    topPart: {
        position: "absolute",
        left: "10%",
        top: 20,
        width: 320,
        direction: "rtl",
        paddingTop: 50,
    },
    header: {
        fontFamily: "Heebo-Bold",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
    },
    subheader: {
        fontFamily: "Heebo-Bold",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    dropdown: {
        position: "relative",
        top: 290,
        height: 300,
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 0, // add some padding to the bottom
    },
    selectOptionStyle: {
        borderRadius: 8,
        borderColor: "#444",
        width: 250,
        borderWidth: 2, // increased border width for visibility
        top: 20,
        paddingBottom: 0,
    },
    btn: {
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: "5%",
        backgroundColor: '#b8dea5',
        marginBottom: 16,
        shadowOpacity: 0.1,
    },
    alertText: {fontFamily: 'Heebo-Bold', fontSize: 18, margin: "5%"}
});
