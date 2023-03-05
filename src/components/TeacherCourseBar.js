import React, { useState } from "react";
import { Text, View, StyleSheet,ScrollView } from "react-native";
import { Card,Icon,Avatar,Button  } from "react-native-elements";
import { Chip } from '@rneui/themed';


const TeacherCourseBar = ({ teacherCourses }) => {
    const avatarImage = require('../../assets/pics/avatarPic.png' );

  return (
    <View style={styles.viewcardContainer}>
        <ScrollView  horizontal={true} >
            <View style={styles.buttonContainer}>
        {teacherCourses.map((course) => (
            <Chip title={course.name} containerStyle={ styles.chipStyle} />
        ))}
        </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 10,
    height: 150,
    width: 370,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: "space-between",
  },
  chipStyle: {
    flexDirection: 'row',
    height: 50,
    marginHorizontal:10
  },
  viewcardContainer: {
    position: 'relative',
  },
  cardDivider: {
    marginHorizontal: 10,
    orientation:"vertical"
  },
  name: {
    left:100,
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    flex: 0,
    alignSelf: 'flex-start',
  },
  starContainer: {
    position: 'absolute',
    top: 30,
    left: 40,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  avatarContainer: {
    position: 'absolute',
    top: 30,
    left: '60%',
    transform: [{ translateX: -25 }],
    zIndex: 1,
  },
  starRatingText: {
    position: 'absolute',
    top:0,
    left:40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default TeacherCourseBar;
