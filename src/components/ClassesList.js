import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ClassCard from "./ClassCard";

const HalfScreenClasses = ({ classes }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.column}>
        {classes.map((classDetails) => (
          <ClassCard classDetails={classDetails} key={classDetails.name} />
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
  column: {
    flex: 1,
    padding: 10,
  },
});

export default HalfScreenClasses;
