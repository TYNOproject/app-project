import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

const AviableTimeCard = ({ timeDetails }) => {
  return (
    <Card containerStyle={styles.CardContainer}>
        <Text style = {styles.time}>
          {"תאריך: " + new Date(timeDetails.date).toDateString()} {"\n"}
          {"שעת התחלה: " + timeDetails.startTime} {"\n"}
          {"שעת סיום: " + timeDetails.endTime}
        </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: 10,
    height: "auto",
    width: "auto",
  },
  time: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

});

export default AviableTimeCard;
