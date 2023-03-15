
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ClassCard from "./ClassCard";

const HalfScreenClasses = ({ classes, horizantal, style, width}) => {
  return (
    <ScrollView horizontal = {horizantal}
    showsHorizontalScrollIndicator = {false}
     contentContainerStyle={styles.container}>
      <View style={{flex: 1, padding: 10, flexDirection: style}}>
        {classes.map((classDetails, index) => (
          <ClassCard width = {width} classDetails={classDetails} key={index}/>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
      alignItems: "center",
      marginRight: "10%",
  },
});

export default HalfScreenClasses;
