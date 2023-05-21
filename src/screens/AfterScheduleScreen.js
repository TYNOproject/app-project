import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import * as Calendar from "expo-calendar";
import StudentContext from "../contexts/StudentContext";
import ClassContext from "../contexts/ClassContext";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
export default function AfterScheduleScreen({ navigation })
{
  const {items,getVal} = useContext(StudentContext);
  const {itemsClass,getValClass} = useContext(ClassContext);

  const name = getVal(items, "studentDetails").name;
  const course = getValClass(itemsClass, 'courseName');
  const teacherName = getValClass(itemsClass,'teacherName');
  const date = getValClass(itemsClass,'classDate');
  const fromTime = getValClass(itemsClass,'startTime');
  const endTime = addHourToTime(fromTime);
  
  function addHourToTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':'); // split the time string into hours, minutes, and seconds
    let hour = parseInt(hours); // convert hours to a number
    let minute = parseInt(minutes); // convert minutes to a number
    let second = parseInt(seconds); // convert seconds to a number
    hour = (hour + 1) % 24; // add an hour and wrap around to the next day if needed
    const newTimeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`; // format the new time as a string
    return (newTimeString);
  } 
  async function addToCalendar() {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const { status: remindersStatus } =
          await Calendar.requestRemindersPermissionsAsync();
        if (remindersStatus === "granted") {
          const calendars = await Calendar.getCalendarsAsync();
          const defaultCalendar =
            Platform.OS === "ios"
              ? calendars.find((cal) => cal.allowsModifications)
              : calendars.find((cal) => cal.isPrimary);
  
          const startDate = new Date(date);
          const endDate = new Date(date);
          const [startHour, startMinute] = fromTime.split(":");
          const [endHour, endMinute] = endTime.split(":");
          startDate.setHours(parseInt(startHour), parseInt(startMinute), 0);
          endDate.setHours(parseInt(endHour), parseInt(endMinute), 0);
  
          const eventDetails = {
            title: `שיעור עם ${teacherName}`,
            startDate,
            endDate,
            timeZone: "Asia/Jerusalem",
          };
  
          const eventId = await Calendar.createEventAsync(
            defaultCalendar.id,
            eventDetails
          );
          if (eventId) {
            alert("השיעור נוסף ליומן בהצלחה!");
          } else {
            alert("אירעה שגיאה בהוספת האירוע ליומן");
          }
        } else {
          alert("לא ניתן גישה להוספת תזכורות ליומן");
        }
      } else {
        alert("לא ניתן גישה ליומן");
      }
    } catch (error) {
      console.log("Error adding event to calendar:", error);
      alert("אירעה שגיאה בהוספת האירוע ליומן");
    }
  }
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Text style={styles.header}>בהצלחה {name}!</Text>
        <View>
          <Text style={styles.subHeaderText}>קבעת שיעור עם {teacherName} {"\n"} בקורס {course}</Text>
        </View>
      </View>
      <View style={styles.mainPart}>
        <Text style={styles.mainText}>בתאריך: {date}</Text>
        <Icon name="calendar" type="font-awesome" size={30} />
        <Text style={styles.mainText}>משעה: {fromTime}</Text>
        <Icon name="timer" style={{ right: 0 }}  size={40} />
        <Text style={styles.mainText}>עד שעה: {endTime}</Text>
        <Icon name="timer" style={{ right: 0 }} size={40} />
      </View>
      <Button
        title="סגור"
        onPress={() => navigation.navigate("HomePage")}
        titleStyle={{
          fontSize: 26,
          textAlign: "center",
          fontFamily: "Heebo-Bold",
        }}
        leading={() => <AntDesign name="left" size={24} color="white" />}
        style={{
          width: "80%",
          height: "7%",
          top: "85%",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addToCalendar}>
          <AntDesign name="calendar" size={24} color="white" />
          <Text style={styles.addButtonText}>הוספה ליומן</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
  topPart: {
    position: "absolute",
    width: "95%",
    direction: "rtl",
    paddingTop: 30,
  },

  mainPart: {
    position: "absolute",
    top: "35%",
    width: "80%",
    direction: "rtl",
    paddingTop: "10%",
    alignItems: "flex-start",
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    textShadowColor: "#A1B2C3",
    textShadowOffset: {width: 1},
    textShadowRadius: 2,
  },
  subHeaderText: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    top: "10%",
    textAlign: "center",
    textShadowColor: "#A1B2C3",
    textShadowOffset: {width: 1},
    textShadowRadius: 2,
  },
  mainText: {
    fontFamily: "Heebo-Bold",
    fontSize: 25,
    top: "20%",
    textAlign: "center",
    left: "20%",
  },
  textstyle: {
    fontFamily: "Heebo-Bold",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: "center",
    color: "#FFFFFF",
  },
  addButtonContainer: {
    position: "absolute",
    top: "72%",
    alignItems: "center",
  },
  
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E90FF",
    width: "80%",
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  
  addButtonText: {
    fontFamily: "Heebo-Bold",
    fontSize: 26,
    color: "white",
    marginLeft: 10,
  }
  
});
