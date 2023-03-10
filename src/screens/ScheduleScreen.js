import React, { Component,useState,useContext,useEffect } from "react";
import { StyleSheet, Text, View, FlatList,TouchableOpacity,ScrollView } from "react-native";
import { ListItem, SearchBar,Card, Button,ButtonGroup } from "react-native-elements";
import { useFonts } from "expo-font";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import TimeScrollBar from "../components/TimeScrollBar";
import StudentContext from "../contexts/StudentContext";
import ClassContext from "../contexts/ClassContext";
import { getTeacherAvailableClasses,bookClass } from "../api/serviceCalls.js";




export default function ScheduleScreen({ navigation })
{


  const {addToClass} = useContext(ClassContext);
  const {itemsClass} = useContext(ClassContext);
  const {getValClass} = useContext(ClassContext);
  
  const {items,getVal} = useContext(StudentContext);
  const studentId = getVal(items, "studentDetails").id;

  const name = getValClass(itemsClass,'teacherName');
  const teacherId = getValClass(itemsClass,'teacherId');

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [markedDates, setMarkedDates] = useState({});
  const [timeButtons, setTimeButtons] = useState([]);
  const [chosenTime, setchosenTime] = useState([]);
  const [chosenCourseId, SetchosenCourseId] = useState([]);
  const [timeMap, setTimeMap] = useState({});
  const [classMap, setClassMap] = useState({});


  const getTimes = () => {
    useEffect(() => {
      async function fetchData() {
        console.log(teacherId);
        timeResponse = await getTeacherAvailableClasses(teacherId); //need to catch
        dates = timeResponse.data.map(item => new Date(item.startTime));
          // extract startTime value and convert to Date object
        const datestoMark = dates.reduce((obj, date) => {
          const dateString = new Date(date).toISOString().split('T')[0];
          obj[dateString] = { marked: true };
          return obj;
        }, {});

        setMarkedDates(datestoMark);
        updateMaps(timeResponse.data);
      }
      fetchData();
    },[]);
  };
  getTimes();
    // const name = "מנש";

  const updateMaps = (dates) => {
    const myTimeMap = new Map();
    const myClassMap = new Map();
    
    dates.forEach(item => {
      const date = item.startTime.split('T')[0];
      const time = item.startTime.split('T')[1];
      const classId = item.id;

      if (myTimeMap.has(date)) {
        const times = myTimeMap.get(date);
        times.push(time);
        myTimeMap.set(date, times);
      } else {
        myTimeMap.set(date, [time]);
      } 

      if (myClassMap.has(date)) {
        const classIds = myClassMap.get(date);
        classIds.push(classId);
        myClassMap.set(date, classIds);
      } else {
        myClassMap.set(date, [classId]);
      }

      setTimeMap(myTimeMap);
      setClassMap(myClassMap);
    });
  }
 

  function handelPossibleTimes(day) {
    setchosenTime(day.dateString);
    setTimeButtons(timeMap.get(day.dateString));
  }


  async function handleScheduale () {
    SetchosenCourseId(classMap.get(chosenTime)[selectedIndex]);
    console.log("student: " + studentId);
    console.log("course: " + chosenCourseId);
    bookResponse = await bookClass({chosenCourseId,studentId});
    
    if (bookResponse == 200)
    {
      addToClass('startTime', timeButtons[selectedIndex]);
      addToClass('classDate', chosenTime);
      navigation.navigate("AfterSchedule");
    }
    else{
      alert("error!");
      return;
    }   
  };

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

    return(
        <View style={styles.container}>
            <View style={styles.topPart}>
                <Text style={styles.header}>
                  למתי לתאם עם {name} ?
                </Text>
            </View>
            <View style={styles.bottomPart}>
                <Calendar style={styles.calenderStyle}
                    markedDates={markedDates}
                    markingType="simple"
                    onDayPress={handelPossibleTimes}
                />
                            <View style={styles.TimeScrollBar}>
                            <ScrollView contentContainerStyle={styles.containerTime} horizontal={true}>
                              <View style={styles.row}>
                              <ButtonGroup style={styles.timeButton}
                                    buttons={timeButtons}
                                    selectedIndex={selectedIndex}
                                    onPress={(value) => {
                                        setSelectedIndex(value);
                                    }}
                                    containerStyle={{ marginBottom: 20 }}
                                />
                              </View>
                          </ScrollView>
            </View>
            </View>
            <View>
            <TouchableOpacity style={styles.submitButton} onPress={handleScheduale}>
                <Text style={styles.textstyle}>
                     לקביעת שיעור עם {name}
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems:"center",
      flexDirection: "column",
      flex: 1,
      
    },
    calenderStyle: {
        top:150,
        backgroundColor:"transparent",
        backgroundCalender:"transparent",
      },
    topPart: {
        alignItems:"center",
        position: "absolute",
        left: "10%",
        top: 0,
        width: 320,
        direction: "rtl",
        paddingTop: 50,
      },
    bottomPart: {
        alignItems:"center",
        position: "absolute",
        left: "10%",
        top: -50,
        width: 320,
        paddingTop: 50,
        height:100
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
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 4,
        padding: 8,
        top:100,
      },
      TimeScrollBar: {
        position:"relative",
        top:180
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
        fontFamily: "Heebo-Bold",
        fontSize: 24,
        fontWeight: "400",
        lineHeight: 28,
        letterSpacing: 0,
        textAlign: "center",
        color: "#FFFFFF",
    },
    containerTime: {
      flexDirection: "row",
      height:30,
      position:"relative"
    },
    row: {
      flexDirection: "row",
      flex: 1,
      padding: 10,
      position:"relative",
    },
    timeButton: {
        backgroundColor: 'lightgray',
        borderRadius: 4,
        padding: 8,
        marginVertical: 4,
        height:40,
        marginHorizontal:10,
        position:"relative"
      },
});