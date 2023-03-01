import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const PopupMenu = ({ navigation, hideMenu }) => {
  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
    hideMenu();
  };

  return (
    <View style={styles.popup}>
      <TouchableOpacity onPress={() => handleNavigation("CoursePage")}>
        <Text style={styles.popupItem}>Course Page</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("LogIn")}>
        <Text style={styles.popupItem}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("GoogleLogIn")}>
        <Text style={styles.popupItem}>Google Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("StudentProfile")}>
        <Text style={styles.popupItem}>StudentProfile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("Register")}>
        <Text style={styles.popupItem}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("TeacherPage")}>
        <Text style={styles.popupItem}>Teacher Page</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("TeacherProfile")}>
        <Text style={styles.popupItem}>Teacher Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("TeacherSignUp")}>
        <Text style={styles.popupItem}>Teacher Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("Review")}>
        <Text style={styles.popupItem}>Review</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={hideMenu}>
        <Text style={styles.popupItem}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    backgroundColor: "orange",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    top:-132,
    left: 130,
  },
  popupItem: {
    fontSize: 16,
    padding: 10,
    
  },
});

export default PopupMenu;
