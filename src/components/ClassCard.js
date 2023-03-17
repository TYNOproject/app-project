
import { textAlign } from "@mui/system";
import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import ClassContext from "../contexts/ClassContext";
import StudentContext from "../contexts/StudentContext";

const ClassCard = ({ classDetails, disabled, callback }) => {
  const { addToClass} = useContext(ClassContext);
  const [confirmed, setConfirmed] = useState(false);
  const [denied, setDenied] = useState(false);

  const handlePress = () => {
    addToClass('classId',classDetails.id);
    callback(classDetails.id).then((result) => {
      if (result === 1) {
        setDenied(false);
        setConfirmed(true);
      } else if (result === 2) {
        setConfirmed(false);
        setDenied(true);
      } else{
        setConfirmed(false);
        setDenied(false);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <TouchableOpacity disabled = {disabled} onPress={handlePress}>
    <Card containerStyle={[styles.cardContainer,
          confirmed && styles.cardSelected,
          denied && styles.cardDenied
        ]}>
      <Card.Title style={styles.courseName}> {classDetails.course.courseName} </Card.Title>
      <Text style={styles.subTitle}>
        {classDetails.teacher.name} מלמד/ת את {classDetails.student.name}
      </Text>
      <Card.Divider />
      <Text style={styles.date} numberOfLines={3}>
        {"תאריך: " + new Date(classDetails.date).toDateString()} {"\n"}
        {"שעת התחלה: " + classDetails.startTime} {"\n"}
        {"שעת סיום: " + classDetails.endTime}
      </Text>
    </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    width: "80%",
    borderColor: "#7521f3", // added purple border color
    borderWidth: 2, // increased border width for visibility
    alignContent: 'center',
    marginBottom: 10
  },
  cardSelected: {
    backgroundColor: "#8FBC8F",
  },
  cardDenied: {
    backgroundColor: "#FFC0CB",
  },
  courseName: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: 'Heebo-Bold',
    writingDirection: 'rtl',
  },
  subTitle: {
    fontSize: 12,
    fontFamily: 'Heebo-Regular',
    textAlign: 'center',
    writingDirection: 'rtl'
  },
  row: {
    flexDirection: "row"
  },
  date: {
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Heebo-Regular',
    fontSize: 12,
    color: 'black',
  }
});

export default ClassCard;
