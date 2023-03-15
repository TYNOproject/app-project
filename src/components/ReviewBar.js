import React, { useState } from "react";
import { Text, View, StyleSheet,ScrollView } from "react-native";
import { Card,Icon,Avatar,Button  } from "react-native-elements";
import ReviewCard from "./ReviewCard";


const ReviewBar = ({ reviews }) => {
    
    return (
        <ScrollView contentContainerStyle={styles.container} horizontal={true}>
          <View style={styles.row}>
            {reviews.map((review,index) => (
              <ReviewCard review={review} key={index} />
            ))}
          </View>
        </ScrollView>
      );
    };


    const styles = StyleSheet.create({
        container: {
          flexDirection: "row",
          paddingBottom: 20,
        },
        row: {
          flexDirection: "row",
          flex: 1,
          padding: 10,
        },
      });

export default ReviewBar;
