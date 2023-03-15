import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import ClassCard from "./ClassCard";

const HalfScreenClasses = ({classes, horizantal, style, width}) => {
    return (
        <ScrollView horizontal={horizantal}
                    showsHorizontalScrollIndicator={false}
                    style={styles.container}>
                {classes.map((classDetails, index) => (
                    <ClassCard width={width} classDetails={classDetails} key={index}/>
                ))}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
    },
});

export default HalfScreenClasses;
