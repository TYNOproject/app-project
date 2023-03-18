import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {Button, Icon} from "@react-native-material/core";
import {AntDesign} from "@expo/vector-icons";
import {useFonts} from "expo-font";
import StudentContext from "../contexts/StudentContext";
import {getTeacherCourses,getTeacherAvailableClasses, addNewClass} from "../api/serviceCalls";
import { Alert } from 'react-native';



export default function ChooseAvaibleTimes({navigation}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [markedTimes, setMarkedTimes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {items, getVal} = useContext(StudentContext);
  const name = getVal(items, "studentDetails").name;
  const teacherId = getVal(items, "studentDetails").id;

  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  useEffect(() => {
    getTeacherCourses(getVal(items, "studentDetails").id)
        .then((response) =>
            response !== undefined ? setTeacherCourses(response.data) : setTeacherCourses([])
        )
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
}, [name]);

useEffect(() => {
  getTeacherAvailableClasses(teacherId).then((timeResponse)=>
  {
    if (timeResponse !== undefined){
      timeResponse.data.forEach(item => {
        const date = item.date.split('T')[0];
        const startTime = item.startTime;
        const endTime = item.endTime;
        const selectedDateTime = {'date': date, 'startTime': startTime, 'endTime': endTime, 'new': false};
        setSelectedTimes([...selectedTimes, selectedDateTime]);
      })
    }
  }
  ).catch((error) => console.log(error)); 
},[]);



  function handleTimeSelect(date, time) {
    console.log("here");
    console.log(selectedTimes);
    const [startTime, endTime] = time.split("-");
    if (selectedTimes.some(dateTime => dateTime.date === date && dateTime.startTime === startTime)) {
      setSelectedTimes(selectedTimes.filter((dateTime) => dateTime.date !== date || dateTime.startTime !== startTime));
    } else {
      const selectedDateTime = {'date': date, 'startTime': startTime, 'endTime': endTime, 'new': true};
      setSelectedTimes([...selectedTimes, selectedDateTime]);
      console.log(selectedTimes);
    }
  };

  function handleRegister() {
    if(selectedCourse === null){
      Alert.alert('שכחת לבחור את הקורס אותו אתה רוצה ללמד','', [
        {
          text: 'חזרה',
          style: 'cancel',
        },
      ]);
    }
    else{
    selectedTimes.filter((dateTime) => dateTime.new === true).map((newTime) => (
      addNewClass({
        selectedCourse,
        teacherId,
        date: newTime.date,
        startTime: newTime.startTime,
        endTime: newTime.endTime
      })
      .then((response) => {
        response !== undefined ? {} : alert("error!");
      })
      .catch((error) => console.log(error))
    ));
    navigation.navigate("TeacherProfile");
    }
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
          const formattedDate = new Date(date).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
          setSelectedDate(formattedDate);
          }
        }
      />
      {selectedDate && (
        <View>
          <Text style={styles.subtitle}>זמנים פנויים:</Text>
          <View style={styles.timeContainer}>
            {hours.map((time) => (
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
            ))}
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
    </ScrollView>
  );
};

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
