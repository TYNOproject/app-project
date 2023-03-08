import React, { Component,useState } from "react";
import { StyleSheet, Text, View, FlatList ,TouchableOpacity} from "react-native";
import { ListItem, SearchBar,Card,Icon  } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import TeacherCard from "../components/TeacherCard";
import TeachersList from "../components/TeachersList";


export default function AfterScheduleScreen({ navigation })
{
  const [search, setSearch] = useState("");
  // const name = navigation.getParam("name");
  // const teacherName = navigation.getParam("teacherName");

  const name = "נועם";
  const teacherName = "יותם";
  const date = "18/01";
  const fromTime = "18:00";
  const toTime = "19:00";



  return (
    <View style={styles.container}>
        <View style={styles.topPart}>
            <Text style={styles.header}>
            בהצלחה {name} !
            </Text>
            <View>
                <Text style={styles.subHeaderText}>
                קבעת שיעור עם {teacherName}
                </Text>
            </View>
        </View>
        <View style={styles.mainPart}>
            <Text style={styles.mainText}>
                 בתאריך:                 {date}
            </Text>
            <Icon name="calendar" type="font-awesome" />
            <Text style={styles.mainText}>
                 משעה:                   {fromTime}
            </Text>
            <Icon name='timer' style={{right:0}}/>
            <Text style={styles.mainText}>
                עד שעה:                {toTime}
            </Text>
            <Icon name='timer' style={{right:0}}/>
        </View>
        <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.textstyle}>
                     סגור
                </Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems:"center",
      flexDirection: "column",
      flex: 1,
    },
    topPart: {
        position: "absolute",
        left: "10%",
        top: 0,
        width: 320,
        direction: "rtl",
        paddingTop: 40,
      },
      mainPart: {
        position: "absolute",
        left:20,
        top: 150,
        width: 320,
        direction: "rtl",
        paddingTop: 50,
        alignItems:"flex-start"
      },
      header: {
        fontFamily: "Heebo-Bold",
        fontWeight: "bold",
        fontSize: 30,
        top: 0,
        textAlign: "center",
      },
      subHeaderText: {
        fontFamily: "Heebo-Bold",
        fontWeight: "bold",
        fontSize: 25,
        top: 40,
        textAlign: "center",
      },
      mainText: {
        fontFamily: "Heebo-Bold",
        fontSize: 20,
        top: 20,
        textAlign: "center",
        left:40,
      },
      iconStyle: {
        position: "abs",
        right:60,
      },
      submitButton: {
        height: 53,
        width: 326,
        left: 0,
        top: 600,
        borderRadius: 5,
        padding: 16,
        backgroundColor: "#006699",
        justifyContent: "center",
        alignItems: "center"
    },
    textstyle: {
        fontFamily: "Rubik",
        fontSize: 24,
        fontWeight: "400",
        lineHeight: 28,
        letterSpacing: 0,
        textAlign: "center",
        color: "#FFFFFF",
    },
});