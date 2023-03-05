import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import TeacherCard from "./TeacherCard";

const TeachersList = ({ teachers }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.column}>
        {teachers.map((teacher) => (
          <TeacherCard teacher={teacher} />
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

export default TeachersList;
