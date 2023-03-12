import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

const AviableTimeCard = ({ timeDetails }) => {
  return (
    <Card containerStyle={styles.CardContainer}>
        <Text style = {styles.time}> {timeDetails.time} </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: 10,
    height: 60,
    width: 140,
  },
  time: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

});

export default AviableTimeCard;
