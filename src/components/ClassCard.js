
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

const ClassCard = ({ classDetails }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={styles.name}>{classDetails.name}</Card.Title>
      <Card.Divider />
      <Text style={styles.date} numberOfLines={2}>
        {classDetails.date}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    fontSize: 10,
    flex: 0,
  },
});

export default ClassCard;
