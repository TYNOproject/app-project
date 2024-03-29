import React from "react";
import {useContext, useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator} from "react-native";
import {AntDesign, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {useFonts} from "expo-font";
import StudentContext from "../contexts/StudentContext";
import SelectOption from "../components/SelectOption";
import * as constants from "../../constants";
import {Button} from "@react-native-material/core";
import {updatePersonalDetails} from "../api/serviceCalls";
import {FancyAlert} from "react-native-expo-fancy-alerts";


export default function StudentEditDetailsScreen({navigation}) {
    const {items, getVal, addToStudent} = useContext(StudentContext);
    const name = getVal(items, "studentDetails").name;
    const [privateInfo, setPrivateInfo] = useState("");
    const [visible, setVisible] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [departments, setDepartments] = useState([]);

    let [fontsLoaded] = useFonts({
        "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
        "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
    });

    useEffect(() => {
        if (selectedFaculty) {
            const filteredDepartments = constants.departments.filter(
                dep => dep.faculty_id === selectedFaculty.id
            );
            setDepartments(filteredDepartments);
        } else {
            setDepartments([]);
        }
    }, [selectedFaculty]);


    if (!fontsLoaded)
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );



    return (
        <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
            <Text style={styles.header}>
                <MaterialCommunityIcons
                    name="card-account-details-outline"
                    size={50}
                    color="black"
                />
                {"\n"}
                עריכת פרטים אישיים
            </Text>
                <SelectOption
                    options={constants.faculties.map((faculty) => faculty.faculty_name)}
                    defaultText="בחר פקולטה"
                    buttonStyle={styles.selectOptionStyle}
                    onSelectOption={(selectedItem) => {
                        const selectedFaculty = constants.faculties.find(
                            (faculty) => faculty.faculty_name === selectedItem
                        );
                        setSelectedFaculty(selectedFaculty)
                        let studentDetails = getVal(items, "studentDetails");
                        addToStudent("studentDetails", {
                            ...studentDetails,
                            faculty: selectedFaculty,
                        });
                    }}
                />
                <SelectOption
                    options={departments.map(dep => dep.department_name)}
                    defaultText="בחר מחלקה"
                    buttonStyle={styles.selectOptionStyle}
                    onSelectOption={(selectedItem) => {
                        const selectedDepartment = departments.find(
                            (dep) => dep.department_name === selectedItem
                        );
                        let studentDetails = getVal(items, "studentDetails");
                        addToStudent("studentDetails", {
                            ...studentDetails,
                            department: selectedDepartment,
                        });
                    }}
                />
                <SelectOption
                    options={constants.degrees}
                    defaultText="בחר תואר"
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
                    defaultText="בחר שנה"
                    buttonStyle={styles.selectOptionStyle}
                    onSelectOption={(selectedItem) => {
                        let studentDetails = getVal(items, "studentDetails");
                        addToStudent("studentDetails", {
                            ...studentDetails,
                            year: selectedItem,
                        });
                    }}
                />
                <TextInput
                    value={privateInfo}
                    onChangeText={(info) => setPrivateInfo(info)}
                    placeholder={"הכנס תיאור אישי..."}
                    style={styles.input}
                    editable
                    multiline
                />

            <Button
                title="שלח"
                titleStyle={{
                    fontSize: 18,
                    textAlign: "center",
                    fontFamily: "Heebo-Bold",
                }} // Add this line to center the title
                leading={() => <AntDesign name="left" size={24} color="white"/>}
                onPress={() => {
                    updatePersonalDetails({
                        studentId: getVal(items, "studentDetails").id,
                        faculty: getVal(items, "studentDetails").faculty.id,
                        department: getVal(items, "studentDetails").department.id,
                        degree: getVal(items, "studentDetails").degree,
                        year: getVal(items, "studentDetails").year,
                        privateInfo: privateInfo,
                    }).then(() => {
                        setVisible(!visible);
                        navigation.navigate("Profile")
                    })
                        .catch((err) => console.log(err))
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
                <Text style={styles.alertText}>המידע עודכן בהצלחה!</Text>
                <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
                    <Text style={styles.alertText}>המשך</Text>
                </TouchableOpacity>
            </FancyAlert>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%",
        padding: "5%",
    },
    header: {
        fontSize: 30,
        fontFamily: "Heebo-Bold",
        textAlign: "center",
    },
    selectOptionStyle: {
        margin: "3%",
        borderRadius: 8,
        borderColor: "#7521f3",
        width: "80%",
        borderWidth: 2, // increased border width for visibility
    },
    input: {
        width: "80%",
        height: "30%",
        margin: "3%",
        writingDirection: "rtl",
        textAlign: "right",
        borderWidth: 2,
        borderColor: "#7521f3",
        backgroundColor: "#e8e8e8",
        borderRadius: 8,
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
