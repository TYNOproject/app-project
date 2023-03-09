import React, { useState ,useContext } from "react";
import { Text, View, StyleSheet ,TouchableOpacity} from "react-native";
import { Card,Icon,Avatar  } from "react-native-elements";
import StudentContext from "../contexts/StudentContext";
import ClassContext from "../contexts/ClassContext";

const TeacherCard = ({ teacher, navigation }) => {
  const avatarImage = require("../../assets/pics/avatarPic.png");
  const { addToClass } = useContext(ClassContext);

  const handlePress = () => {
    alert(teacher.name);
    addToClass("teacherName", teacher.name);
    addToClass("teacherId", teacher.id);
    navigation.navigate("Schedule");
  };

  return (
    <TouchableOpacity onPress={handlePress}>
    <View style={styles.viewcardContainer}>
    <Avatar
    rounded
    source={{uri: 'https://via.placeholder.com/150'}}
    containerStyle={styles.avatarContainer}
    />
  <Icon
    name="star"
    type="font-awesome"
    color="#FFD700"
    containerStyle={styles.starContainer}/>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.name}>
            {teacher.name}, {"\n"}
            {teacher.year}{" "}
          </Card.Title>
          <Text style={styles.starRatingText}>{teacher.rate}/5</Text>

      <Card.Divider style={styles.cardDivider}/>
      <Text style={styles.description} numberOfLines={6}>
        {teacher.privateInfo}
      </Text>
    </Card>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 10,
    height: 150,
    width: 370,
  },
  viewcardContainer: {
    position: "relative",
  },
  cardDivider: {
    marginHorizontal: 10,
    orientation: "vertical",
  },
  name: {
    left: 100,
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    fontSize: 10,
    flex: 0,
  },
  starContainer: {
    position: "absolute",
    top: 30,
    left: 40,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  avatarContainer: {
    position: "absolute",
    top: 30,
    left: "60%",
    transform: [{ translateX: -25 }],
    zIndex: 1,
  },
  starRatingText: {
    position: "absolute",
    top: 0,
    left: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TeacherCard;
