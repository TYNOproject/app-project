import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {Button, Icon} from "@react-native-material/core";
import {AntDesign} from "@expo/vector-icons";
import {useFonts} from "expo-font";
import StudentContext from "../contexts/StudentContext";
import {getTeacherCourses,getTeacherAvailableClasses, addNewClass, getTeacherClasses} from "../api/serviceCalls";
import { Alert } from 'react-native';
import {useIsFocused} from "@react-navigation/native";




export default function ChooseAvailableTimes({navigation}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [takenTimes, setTakenTimes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {items, getVal} = useContext(StudentContext);
  const name = getVal(items, "studentDetails").name;
  const teacherId = getVal(items, "studentDetails").id;
  const isFocused = useIsFocused();


  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  useEffect(() => {
    setIsLoading(true);
    getTeacherCourses(getVal(items, "studentDetails").id)
        .then((response) =>
            response !== undefined ? setTeacherCourses(response.data) : setTeacherCourses([])
        )
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
}, [name]);

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
  const available = classes.filter((item) => item.status === "available").map((item) => {
      return {date: item.date, startTime: item.startTime, endTime: item.endTime}
  });
  setTakenTimes(available);
}, [isFocused, classes]);


  function handleTimeSelect(date, time) {
    const [startTime, endTime] = time.split("-");
    if (selectedTimes.some(dateTime => dateTime.date === date && dateTime.startTime === startTime)) {
      setSelectedTimes(selectedTimes.filter((dateTime) => dateTime.date !== date || dateTime.startTime !== startTime));
    } else {
      const selectedDateTime = {'date': date, 'startTime': startTime, 'endTime': endTime};
      setSelectedTimes([...selectedTimes, selectedDateTime]);
      console.log(selectedTimes);
    }
  };

  function handleRegister() {
    selectedTimes
      .map((newTime) => {
        if (selectedCourse === null) {
          Alert.alert(
            'שכחת לבחור את הקורס אותו אתה רוצה ללמד',
            '',
            [
              {
                text: 'חזרה',
                style: 'cancel',
              },
            ],
          );
        } else {
          addNewClass({
            courseId: selectedCourse,
            teacherId,
            date: newTime.date,
            startTime: newTime.startTime,
            endTime: newTime.endTime,
          })
            .then((response) => {
              response !== undefined ? {} : alert('error!');
            })
            .catch((error) => console.log(error));
            navigation.navigate('TeacherProfile');
        }
      });
  }
  
  

  const hours = [
    '10:00:00-11:00:00',
    '11:00:00-12:00:00',
    '12:00:00-13:00:00',
    '13:00:00-14:00:00',
    '14:00:00-15:00:00',
    '15:00:00-16:00:00',
    '16:00:00-17:00:00',
    '17:00:00-18:00:00',
  ];

  if (!fontsLoaded)
  return (
      <View>
          <ActivityIndicator size="large" color="#0000ff"/>
      </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
      {teacherCourses.length === 0 ? (
        <Text style={styles.title}>עוד לא בחרת קורסים ללמד,{'\n'}ניתן להוסיף קורסים בעמוד "עריכת פרטים אישיים"</Text>
      ) : (
        <View>
          <Text style={styles.title}>איזה קורס אתה רוצה ללמד?</Text>
          <View style={styles.coursesContainer}>
            {teacherCourses.map((course, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.courseButton, selectedCourse === course.id && styles.selectedcourseButton]}
                onPress={() => setSelectedCourse(course.id)}
              >
              <Text style={[
                  styles.courseButtonText, selectedCourse === course.id && styles.selectedCourseText
                ]}>{course.courseName}</Text>
              </TouchableOpacity>
            ))}
        </View>
      <Text style={styles.title}>מתי?</Text>
      <CalendarPicker
        onDateChange={(date) => {
        const formattedDate = new Date(date).toISOString().slice(0, 10);
        setSelectedDate(formattedDate);
        }}
      />
      {selectedDate && (
        <View>
          <Text style={styles.subtitle}>זמנים פנויים:</Text>
          <View style={styles.timeContainer}>
            {hours.map((time) => {
              if(takenTimes.some(takenTime => (
                takenTime.date === selectedDate &&
                takenTime.startTime === time.split('-')[0]))) {
                  return(
                  <TouchableOpacity disabled={true}
                  key={time}
                  style={[styles.timeButton,styles.takenTimeButton]}
                >
                  <Text style={[styles.timeButtonText, styles.takenTimeButtonText,]}>
                    {time}</Text>
                </TouchableOpacity>
                  )
                }
                else{
                  return(
                  <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeButton,
                    selectedTimes.some(selectedDateTime => 
                      selectedDateTime.date === selectedDate &&
                      selectedDateTime.startTime === time.split('-')[0]) &&
                      styles.selectedTimeButton,
                  ]}
                  onPress={() => handleTimeSelect(selectedDate, time)}
                >
                  <Text style={[
                    styles.timeButtonText,
                    selectedTimes.some(selectedDateTime =>
                      selectedDateTime.date === selectedDate &&
                      selectedDateTime.startTime === time.split('-')[0]) &&
                    styles.selectedTimeButtonText,
                    ]}>{time}</Text>
                </TouchableOpacity>
                  )
                }
            })}
          </View>
        </View>
      )}
      <Button style = {styles.button}
                leading={() => <AntDesign name="left" size={24} />}
                title="אפשר להמשיך"
                variant="outlined"
                color="black"
                onPress={() => {
                  handleRegister();
                }}
            />
      </View>
    )}
  </ScrollView>
)};

const styles = StyleSheet.create({
  container: {
    padding: "10%",
},
  myCoursesContainer: {
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
    width: '100%'
  },
  noCourses: {
    textAlign: 'center',
    fontFamily: 'Heebo-Regular',
    padding: 10
  },
  divider: {
    height: 1,
    backgroundColor: '#c2bbbb',
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: "Heebo-Bold",
    marginBottom: 20,
    textAlign: 'center',
    top: 10
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'flex-end'
  },
  coursesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  courseButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ddd',
    margin: 8,
    alignItems: 'center'
  },
  selectedcourseButton: {
    backgroundColor: "#b27bf0",
  },
  courseButtonText: {
    fontSize: 14,
  },
  selectedCourseText: {
    color: '#fff',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  timeButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginBottom: 8,
    marginHorizontal: 4
  },
  takenTimeButton: {
    backgroundColor: "#FFC0CB",
  },
  takenTimeButtonText: {
    color: '#fff',
  },
  selectedTimeButton: {
    backgroundColor: "#b27bf0",
  },
  timeButtonText: {
    fontSize: 14,
  },
  selectedTimeButtonText: {
    color: '#fff',
  },
  button: {
    position: "relative",
    marginBottom: 10
  },
});
