import React from "react";
import { Stack, Button } from "@react-native-material/core";

const HomeScreen = ({ navigation }) => (
  <Stack fill center spacing={10}>
    <Button
      title="go to CoursePage"
      onPress={() => navigation.navigate("CoursePage")}
    />
    <Button
      title="go to LogIn"
      onPress={() => navigation.navigate("LogIn")}
    />
    <Button
      title="go to GoogleLogIn"
      onPress={() => navigation.navigate("GoogleLogIn")}
    />
    <Button
      title="go to Main Profile"
      onPress={() => navigation.navigate("MainProfile")}
    />
    <Button
      title="go to Register"
      onPress={() => navigation.navigate("Register")}
    />
    <Button
      title="go to AfterRegistration"
      onPress={() => navigation.navigate("AfterRegistartion")}
    />
    <Button
      title="go to Teacher Page"
      onPress={() => navigation.navigate("TeacherPage")}
    />
    <Button
      title="go to Teacher profile page"
      onPress={() => navigation.navigate("TeacherProfile")}
    />
    <Button
      title="go to Teacher Sign up"
      onPress={() => navigation.navigate("TeacherSignUp")}
    />
    <Button title="button for Noam" onPress={() => alert("noam ya wanka")} />
  </Stack>
);

export default HomeScreen;
