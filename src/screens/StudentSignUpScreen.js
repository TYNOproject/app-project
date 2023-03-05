import React from "react";
import { useContext } from "react";
import StudentContext from "../../StudentContext";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// const sendToServer = () =>
//   fetch("https://app-db-service.azurewebsites.net/api/db/add", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: "johndoe@example.com",
//       name: "ogobo",
//       degree: 1,
//       departmentId: 1,
//       year: 2022,
//       isTeacher: false,
//       price: 0.0,
//       privateInfo: "Some private info",
//     }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         console.log("Success motherfucka");
//       } else {
//         throw new Error("Network response was not ok");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });

export default function StudentSignUpScreen({navigation}) {
   const {items} = useContext(StudentContext);
   const {getVal} = useContext(StudentContext)
   const name = getVal(items,"name")
  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Light": require("../../assets/fonts/Heebo-Light.ttf"),
    "Heebo-Medium": require("../../assets/fonts/Heebo-Medium.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
    "Heebo-SemiBold": require("../../assets/fonts/Heebo-SemiBold.ttf"),
    "Heebo-Thin": require("../../assets/fonts/Heebo-Thin.ttf"),
    "Heebo-Black": require("../../assets/fonts/Heebo-Black.ttf"),
    "Heebo-ExtraBold": require("../../assets/fonts/Heebo-ExtraBold.ttf"),
    "Heebo-ExtraLight": require("../../assets/fonts/Heebo-ExtraLight.ttf"),
  });

  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  return (
    <View style={styles.whole}>
      <View style={styles.topPart}>
        <Text style={styles.header}>
          היי {name}, {"\n"}
          נעים להכיר! {"\n"}
        </Text>
        <Text style={styles.subheader}>נשאר לך רק לספר לנו על התואר שלך</Text>
      </View>
      <View style={styles.dropdown}>
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="פקולטה"
          buttonStyle={styles.selectOptionStyle}
        />
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="מחלקה"
          buttonStyle={styles.selectOptionStyle}
        />
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="תואר"
          buttonStyle={styles.selectOptionStyle}
        />
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="שנה"
          buttonStyle={styles.selectOptionStyle}
        />
        <Button
          leading={() => <AntDesign name="left" size={24} />}
          title="זהו, סיימנו"
          variant="outlined"
          color="black"
          style={{ position: "relative", top: 10 }}
          onPress={() => navigation.navigate('HomePage')}
          //onPress={sendToServer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  whole: {
    flexDirection: "column",
    alignItems: "center",
  },
  topPart: {
    position: "absolute",
    left: "10%",
    top: 20,
    width: 320,
    direction: "rtl",
    paddingTop: 50,
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  subheader: {
    fontFamily: "Heebo-Regular",
    fontWeight: "normal",
    textAlign: "center",
    fontSize: 20,
  },
  dropdown: {
    position: "relative",
    top: 290,
    height: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectOptionStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
    width: 250,
  },
});