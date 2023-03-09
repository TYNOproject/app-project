import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

const CourseNameCard = ({ course }) => {
  return (
    <Card containerStyle={styles.CardContainer}>
        <Text style = {styles.name}> {course.name} </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: 10,
    marginBottom: 1,
    height: 50,
    width: 140,
  },
  name: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },

});

export default CourseNameCard;
