import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";

export default function StudentProfileScreen() {
  return (
    <Button title="Click Me" onPress={() => alert("StudentProfileScreen")} />
  );
}

const styles = StyleSheet.create({});
