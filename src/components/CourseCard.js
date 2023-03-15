import React, { useContext } from "react";
import { Text, View, StyleSheet,TouchableOpacity  } from "react-native";
import { Card } from "react-native-elements";
import ClassContext from "../contexts/ClassContext";


const CourseCard = ({course, navigation, changeColor, callback }) => {
  const { addToClass} = useContext(ClassContext);
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    addToClass('courseName',course.courseName);
    addToClass('courseId',course.id);
    callback();
    if(changeColor){
      setIsSelected(!isSelected);
    }
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card containerStyle={[styles.cardContainer,
          isSelected && styles.cardSelected, // add cardSelected style when selected
        ]}>
      <Card.Title style={styles.name}>{course.courseName}</Card.Title>
      <Card.Divider />
      <Text style={styles.description} numberOfLines={3}>
        {"שנה: " + course.year} {"\n"}
        {"מחלקה: " + course.department.departmentName}
      </Text>
    </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 10,
    height: 200,
    width: 150,
    borderColor: "#7521f3", // added purple border color
    borderWidth: 1, // increased border width for visibility
  },
  cardSelected: {
    backgroundColor: "#b27bf0", // set background color to purple when selected
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    flex: 0,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Heebo-Regular',
    color: 'black',
  },
});

export default CourseCard;
