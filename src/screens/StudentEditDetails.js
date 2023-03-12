import React from "react";
import {useContext, useState, useCallback} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from "react-native";
import {AntDesign, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {useFonts} from "expo-font";
import StudentContext from "../contexts/StudentContext";
import SelectOption from "../components/SelectOption";
import * as constants from "../../constants";
import {Button} from "@react-native-material/core";
import {updatePersonalDetails} from "../api/serviceCalls";
import {FancyAlert} from "react-native-expo-fancy-alerts";

export default function StudentEditDetails({navigation}) {
    const {items, getVal, addToStudent} = useContext(StudentContext);
    const name = getVal(items, "studentDetails").name;
    const [privateInfo, setPrivateInfo] = useState("");
    const [visible, setVisible] = useState(false);

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
        <ScrollView contentContainerStyle={styles.container} automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>
                <MaterialCommunityIcons
                    name="card-account-details-outline"
                    size={50}
                    color="black"
                />
                {"\n"}
                עריכת פרטים אישיים
            </Text>
            <View style={styles.optionsContainer}>
                <SelectOption
                    options={constants.faculties.map((faculty) => faculty.faculty_name)}
                    defaultText="בחר פקולטה"
                    buttonStyle={styles.selectOptionStyle}
                    onSelectOption={(selectedItem) => {
                        let studentDetails = getVal(items, "studentDetails");
                        addToStudent("studentDetails", {
                            ...studentDetails,
                            faculty: selectedItem,
                        });
                    }}
                />
                <SelectOption
                    options={constants.departments.map((dep) => dep.department_name)}
                    defaultText="בחר מחלקה"
                    buttonStyle={styles.selectOptionStyle}
                    onSelectOption={(selectedItem) => {
                        let studentDetails = getVal(items, "studentDetails");
                        addToStudent("studentDetails", {
                            ...studentDetails,
                            department: selectedItem,
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

            </View>
            <TextInput
                value={privateInfo}
                onChangeText={(info) => setPrivateInfo(info)}
                placeholder={"הכנס תיאור אישי..."}
                style={styles.input}
                editable
                multiline
            />
            <Button
                title="לא רשום? לחץ כאן"
                titleStyle={{
                    fontSize: 18,
                    textAlign: "center",
                    fontFamily: "Heebo-Bold",
                }} // Add this line to center the title
                leading={() => <AntDesign name="left" size={24} color="white"/>}
                onPress={() => {
                    setVisible(!visible);
                    updatePersonalDetails({
                        studentId: getVal(items, "studentDetails").id,
                        privateInfo: privateInfo,
                    }).then(() => {
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    optionsContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
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
    selectOptionStyle: {
        margin: "3%",
        borderRadius: 8,
        borderColor: "#444",
        width: "80%",
        borderWidth: 2, // increased border width for visibility
        top: 20,
        paddingBottom: 0,
    },
    input: {
        width: "80%",
        height: "30%",
        margin: "10%",
        writingDirection: "rtl",
        borderWidth: 2,
        borderColor: "#444",
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
