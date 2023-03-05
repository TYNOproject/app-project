
import React from "react";
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import ClassesList from "../components/ClassesList";
import StudentContext from "../../StudentContext";


const classes = [
  {
    name: "Introduction to Computer Science",
    date: "01-01-2024, 08:00",
  },
  {
    name: "Introduction to Computer Science",
    date: "01-01-2024, 08:00",
  },
  {
    name: "Introduction to Computer Science",
    date: "01-01-2024, 08:00",
  },
];

export default function StudentProfileScreen({ navigation }) {

    const {items} = useContext(StudentContext);
    const {getVal} = useContext(StudentContext)
    const name = getVal(items,"name")
    const lastName = getVal(items,"lastname")

  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  function handleRegisterPress() {
    navigation.navigate('Register');
  }

  function handleTeacherPress() {
    navigation.navigate('TeacherProfile');
  }

  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>
          פרופיל אישי{"\n"}
          {name} {lastName}
        </Text>
        <Button
          leading={() => (
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={30}
              color="black"
            />
          )}
          title="עריכת פרטים אישיים"
          variant="outlined"
          color="black"
          onPress={handleRegisterPress}
        />
        <Button
          leading={() => (
            <FontAwesome5 name="chalkboard-teacher" size={24} color="black" />
          )}
          title="עבור לפרופיל מורה"
          variant="outlined"
          color="black"
          style={{ position: "relative", top: 10 }}
          onPress={handleTeacherPress}

        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.bottomHalf}>
        <ClassesList classes={classes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 90,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
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
    top:-120,
    right:-20
  },
});
