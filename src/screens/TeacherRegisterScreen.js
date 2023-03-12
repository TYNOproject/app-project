import React, { useState, useContext } from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import StudentContext from "../contexts/StudentContext";
import CoursesList from "../components/CoursesList";
import SelectOption from "../components/SelectOption";



export default function RegisterScreen({ navigation }) {
  const { addToStudent } = useContext(StudentContext);
  const { clearItems } = useContext(StudentContext);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [password, setPassword] = useState("");

  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  const courses = [
    {
      id:1,
      courseName: "תולדות היופי",
      description:
        "This course covers the fundamentals of computer programming and software development. Students will learn programming concepts such as data types, control structures, functions, and object-oriented programming.",
    },
    {
      id:2,
      courseName: "חדווא",
      description:
        "This course covers the basics of calculus, including limits, derivatives, and integrals. Topics include differentiation and integration of functions, optimization problems, and applications of calculus to physics and engineering.",
    },
    {
      id:3,
      courseName: "אלגברה",
      description:
        "This course focuses on developing writing skills through critical reading and analysis of texts. Students will learn how to write effective essays, research papers, and other types of academic writing.",
    },
    {
      id:4,
      courseName: "קומפי",
      description:
        "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
    },
    {
      id:5,
      courseName: "מודלים",
      description:
        "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
    },
    {
      id:6,
      courseName: "אלגו",
      description:
        "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
    },
    {
      id:7,
      courseName: "היסטוריה",
      description:
        "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
    },
  ];

  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  const handleRegister = () => {
    navigation.navigate("TeacherProfile");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        טוב שבאת! {"\n"}
        כמה פרטים וסיימנו
      </Text>
      <Text style= {styles.description}>
        תספר לתלמידים שלנו קצת עלייך: תואר,שנה.. {"\n"}
        התיאור יופיע בעמוד המורה שלך
      </Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="תספר לנו קצת עלייך"
        onChangeText={setDescription}
        value={description}
      />
      <Text style= {styles.price}>
        מה המחיר שלך לשיעור?
      </Text>
      <TextInput
        style={styles.priceinput}
        placeholder="מחיר לשיעור"
        onChangeText={setPrice}
        value={price}
      />
      <Text style= {styles.courses}>
        איזה קורסים אתה מעוניין ללמד?
      </Text>
      <View style={styles.dropdown}>
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="פקולטה" buttonStyle= {styles.dropdownButtonStyle} />
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="מחלקה" buttonStyle= {styles.dropdownButtonStyle} />
        <SelectOption options={["1", "2", "3", "4"]} defaultText="שנה" buttonStyle= {styles.dropdownButtonStyle} />
      </View>
        <View style={styles.bottomHalf}>
            <CoursesList courses={courses} navigation={navigation} changeColor = {true} callback = {()=> {}} />
        </View>
      <Button style = {styles.button}
        leading={() => <AntDesign name="left" size={24} />}
        title="אפשר להמשיך"
        variant="outlined"
        color="black"
        onPress={() => {
          clearItems();
          // addToStudent('username', name);
          handleRegister();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "80%",
    flex: 1
  },
  header: {
    fontSize: 30,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
    marginBottom:20
  },
  description: {
    fontSize: 16,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
    marginBottom: 10
  },
  descriptionInput: {
    width: 300,
    height: 90,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    fontFamily: "Heebo-Regular",
    marginBottom: 20
  },
  price: {
    fontSize: 16,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
    marginBottom: 10
  },
  priceinput: {
    width: 300,
    height: 40,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    fontFamily: "Heebo-Regular",
    marginBottom: 20
  },
  courses: {
    fontSize: 16,
    fontFamily: "Heebo-Bold",
    textAlign: "center",
  },
  dropdown: {
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdownButtonStyle: {
    flexDirection:"row",
    justifyContent : "center",
    width:110,
  },
  bottomHalf: {
    alignSelf: "flex-end",
    width: '100%',
    flex: 1,
    marginBottom: 20
  },
  button: {
    position: "relative",
    marginBottom: 10
  }
});
