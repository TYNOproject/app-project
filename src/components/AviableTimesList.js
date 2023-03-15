import React from "react";
import {Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Card } from "react-native-elements";
import AviableTimeCard from "./AviableTimeCard";

const AviableTimesList = ({ availableTimes }) => {
  return (
    <ScrollView horizontal={true} 
    showsHorizontalScrollIndicator = {false}
    contentContainerStyle={styles.container}>
        {availableTimes.map((t, index) => (
          <AviableTimeCard timeDetails={t} key={index} />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  }
});

export default AviableTimesList;
