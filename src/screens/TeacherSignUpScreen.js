import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import FileUploader from "../components/FileUploader";
import StudentContext from "../contexts/StudentContext";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";

export default function TeacherSignUpScreen({ navigation }) {
  const { items, getVal, addToStudent } = useContext(StudentContext);
  const name = getVal(items, "studentDetails").name;
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
        <Text style={styles.subheader}>
          על מנת להירשם כמורה, עליך להעלות גליון ציונים
        </Text>
      </View>
      <View style={styles.dropdown}>
        <FileUploader />
      </View>
      <Button
                        title="המשך להרשמה"
                        titleStyle={{
                            fontSize: 18,
                            textAlign: "center",
                            fontFamily: "Heebo-Bold",
                        }} // Add this line to center the title
                        leading={() => <AntDesign name="left" size={24} color="white"/>}
                        style={{top: "100%"}}
                        onPress={() => {
                            navigation.navigate("TeacherRegister")
                        }}
                    />
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
});
