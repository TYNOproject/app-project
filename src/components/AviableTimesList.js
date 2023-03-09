import React from "react";
import {Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Card } from "react-native-elements";
import AviableTimeCard from "./AviableTimeCard";

const AviableTimesList = ({ availableTimes }) => {
  return (
    <ScrollView horizontal={true} 
    showsHorizontalScrollIndicator = {false}
    contentContainerStyle={styles.container}>
      <View style={styles.scrollView}>
        {availableTimes.map((t) => (
          <AviableTimeCard timeDetails={t} />
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
  scrollView: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
});

export default AviableTimesList;
