import React, {useEffect, useState} from "react";
import {useContext} from "react";
import { set } from "react-native-reanimated";
import {View, Text, StyleSheet, ActivityIndicator, Alert} from "react-native";
import {Button, Dialog, DialogHeader, DialogContent, DialogActions} from "@react-native-material/core";
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useFonts} from "expo-font";
import ClassesList from "../components/ClassesList";
import StudentContext from "../contexts/StudentContext";
import ClassContext from "../contexts/ClassContext";
import {getTeacherClasses} from "../api/serviceCalls";

export default function ConfirmLessonsScreen({navigation}) {
    const {items, getVal, addToStudent} = useContext(StudentContext);
    const name = getVal(items, "studentDetails").name;
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      addToStudent('confirmedClasses',new Set());
      addToStudent('deniedClasses',new Set());
      getTeacherClasses(getVal(items, "studentDetails").id)
          .then((response) =>
              response !== undefined ? setClasses(response.data) : setClasses([])
          )
          .catch((error) => console.log(error))
          .finally(() => setIsLoading(false));
  }, [name]);

    const [pendingClasses, setPendingClasses] = useState([]);
    useEffect(() => setPendingClasses(classes.filter((item) => item.status === "pending")), [classes]);

    let [fontsLoaded] = useFonts({
        "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
        "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
    });

    function modifyConfirmedSet(id) {
      let set = getVal(items,'confirmedClasses');
      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
      }
      addToStudent('confirmedClasses',set);
    }

    function modifyDeniedSet(id) {
      let set = getVal(items,'deniedClasses');
      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
      }
      addToStudent('deniedClasses',set);
    }

    function handleRegister() {
      const confirmedClasses = Array.from(getVal(items,'confirmedClasses'));
      const deniedClasses = Array.from(getVal(items,'deniedClasses'));
      const studentId = getVal(items, "studentDetails").id;
      console.log(confirmedClasses);
      console.log(deniedClasses);
      navigation.navigate("TeacherProfile");
    }

    function handlePress(id) {
      return new Promise((resolve) => {
        Alert.alert('האם תרצה לאשר או לדחות את השיעור?','', [
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
            onPress: () => resolve(0),
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
            <Button style = {styles.button}
                leading={() => <AntDesign name="left" size={24} />}
                title="אפשר להמשיך"
                variant="outlined"
                color="black"
                onPress={() => {
                  // clearItems();
                  // addToStudent('username', name);
                  handleRegister();
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
