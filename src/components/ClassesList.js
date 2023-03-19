import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import ClassCard from "./ClassCard";

const HalfScreenClasses = ({classes, horizantal, disabled, callback}) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const filteredClasses = classes.filter(
        (classDetails) => classDetails.date >= currentDate
      );
const sortedClasses = [...filteredClasses].sort((a, b) => new Date(a.date) - new Date(b.date));
    return (
        <ScrollView horizontal={horizantal}
                    showsHorizontalScrollIndicator={false}
                    style={styles.container}>
                {sortedClasses.map((classDetails, index) => (
                    <ClassCard classDetails={classDetails} key={index} disabled={disabled} callback={callback}/>
                ))}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // flexDirection: "row",
    },
});

export default HalfScreenClasses;
