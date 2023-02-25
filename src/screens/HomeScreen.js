import React from "react";
import { Stack, Button } from "@react-native-material/core";
import { FetchResult } from "react-native";

const HomeScreen = ({ navigation }) => (
  <Stack fill center spacing={10}>
    <Button
      title="go to CoursePage"
      onPress={() => navigation.navigate("CoursePage")}
    />
    <Button
      title="go to Entrance"
      onPress={() => navigation.navigate("Entrance")}
    />
    <Button
      title="go to Main Profile"
      onPress={() => navigation.navigate("MainProfile")}
    />
    <Button
      title="go to Sign Up"
      onPress={() => navigation.navigate("SignUp")}
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
    <Button
      title="go to Student Sign up"
      onPress={() => navigation.navigate("StudentSignUp")}
    />
  </Stack>
);

export default HomeScreen;
