import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { AirbnbRating } from '@rneui/themed';


const ReviewCard = ({ review }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={styles.name}>{review.studentName}</Card.Title>
      <Card.Divider />
      <Text style={styles.description}>
        {review.textReview}
      </Text>
      <View style={styles.reating}>
        <AirbnbRating reviewSize = {20} size = {20} defaultRating = {review.starsReview} style ={styles.reating}/>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 30,
    marginBottom: 10,
    height: 230,
    width: 220,
    borderColor: "#7521f3", // added purple border color
    borderWidth: 1, // increased border width for visibility
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    direction: "rtl", //???!?!?!?
    fontSize: 12,
    flex: 0,
  },
  reating: {
    position: 'absolute',
    top:100,
    alignSelf: 'center',
  },
});

export default ReviewCard;
