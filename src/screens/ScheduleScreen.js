import React, { Component, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ListItem, SearchBar, Card, Button } from "react-native-elements";
import { useFonts } from "expo-font";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import TimeScrollBar from "../components/TimeScrollBar";
import StudentContext from "../contexts/StudentContext";
import ClassContext from "../contexts/ClassContext";

export default function ScheduleScreen({ navigation }) {
  const { addToClass, itemsClass, getValClass } = useContext(ClassContext);
  const { addToStudent, items, getVal } = useContext(StudentContext);

  const name = getValClass(itemsClass, "teacherName");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [markedDates, setMarkedDates] = useState({});
  const [currday, setCurrday] = useState(1);
  const [chosenTime, setchosenTime] = useState({});

  const handleSchedule = () => {
    addToClass("selectedDate", chosenTime);
    addToClass("startTime", timeMap.get(currday)[selectedIndex]);
    addToClass("endTime", timeMap.get(currday)[selectedIndex] + 1);
    navigation.navigate("AfterSchedule");
  };

  const availableDays = [1, 3, 5];

  const timeMap = new Map();
  timeMap.set(1, ["13:00", "14:30", "16:20"]);
  timeMap.set(2, ["11:00", "12:30", "15:20"]);
  timeMap.set(3, ["10:00", "14:00", "18:20"]);
  timeMap.set(4, ["10:00", "14:00", "18:20"]);
  timeMap.set(5, ["10:00", "14:00", "18:20"]);
  timeMap.set(6, ["10:00", "14:00", "18:20"]);
  timeMap.set(7, ["10:00", "14:00", "18:20"]);

  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  function handelPossibleTimes(day) {
    const selectedDay = new Date(day.dateString);
    const dayOfWeek = selectedDay.getUTCDay() + 1;
    setchosenTime(selectedDay);
    setCurrday(dayOfWeek);
  }

  // Function to mark all available Days for a given year
  const markDays = (year, availableDays) => {
    const date = new Date(year, 0, 1); // January 1st of the year
    const endDate = new Date(year, 11, 31); // December 31st of the year
    const availableDates = {};

    while (date <= endDate) {
      const dayOfWeek = date.getDay();
      if (availableDays.includes(dayOfWeek)) {
        // Monday
        const dateString = date.toISOString().slice(0, 10);
        availableDates[dateString] = { marked: true };
      }
      date.setDate(date.getDate() + 1);
    }

    setMarkedDates(availableDates, availableDays);
  };

  // Call markMondays with the current year when the component mounts
  React.useEffect(() => {
    markDays(new Date().getFullYear(), availableDays);
  }, []);

  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Text style={styles.header}>למתי לתאם עם {name} ?</Text>
      </View>
      <View style={styles.bottomPart}>
        <Calendar
          style={styles.calenderStyle}
          markedDates={markedDates}
          markingType="simple"
          onDayPress={handelPossibleTimes}
        />
        <View style={styles.TimeScrollBar}>
          <TimeScrollBar times={timeMap.get(currday)}></TimeScrollBar>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSchedule}>
          <Text style={styles.textstyle}>לקביעת שיעור עם {name}</Text>
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
  calenderStyle: {
    top: 150,
    backgroundColor: "transparent",
    backgroundCalender: "transparent",
  },
  topPart: {
    alignItems: "center",
    position: "absolute",
    left: "10%",
    top: 0,
    width: 320,
    direction: "rtl",
    paddingTop: 50,
  },
  bottomPart: {
    alignItems: "center",
    position: "absolute",
    left: "10%",
    top: -50,
    width: 320,
    paddingTop: 50,
    height: 100,
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    top: 0,
    textAlign: "center",
  },
  timeButtonContainer: {
    maxHeight: 200,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    padding: 8,
    top: 100,
  },
  timeButton: {
    backgroundColor: "lightgray",
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
  },
  TimeScrollBar: {
    position: "relative",
    top: 180,
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
    alignItems: "center",
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
