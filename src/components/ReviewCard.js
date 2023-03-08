import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { AirbnbRating } from '@rneui/themed';


const ReviewCard = ({ review }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={styles.name}>{review.name}</Card.Title>
      <Card.Divider />
      <Text style={styles.description}>
        {review.description}
      </Text>
      <View style={styles.reating}>
        <AirbnbRating reviewSize = {20} size = {20} defaultRating = {review.reat} style ={styles.reating}/>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 30,
    marginBottom: 10,
    height: 200,
    width: 200,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    direction: "rtl", //???!?!?!?
    fontSize: 10,
    flex: 0,
  },
  reating: {
    position: 'absolute',
    top:100,
    alignSelf: 'center',
  },
});

export default ReviewCard;
