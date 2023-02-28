// import React from "react";
// import { Button } from "@react-native-material/core";

// const ReviewScreen = () => (
//     <Button title="Click Me" onPress={() => alert("Review")}/>
//   );

// export default ReviewScreen;

import React, { useState,Component } from "react";
import { Stack, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView,
  Platform,Keyboard ,StyleSheet,ScrollView} from "react-native";
import { withNavigation } from "react-navigation";
import PopUpMenu from "../components/PopUpMenu";

import { Button } from "@react-native-material/core";

const ReviewScreen = ({ navigation }) => {
  const name = navigation.getParam("username");
  const teacherName = navigation.getParam("teacherName");
  const [numReview, setNumReview] = useState("");
  const [wordReview, setWordReview] = useState("");

const handleReview = () => {
// handle review logic here
navigation.navigate("HomeScreen", {name});
};


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: 72,
            width: 300,
            left: 0,
            position: "absolute",
            top: 70,
            left: "50%",
            marginLeft: -106.5,
            borderRadius: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <Text style={{ fontSize: 30, justifyContent: "center", marginBottom: 10, right: 40}}>
            כל הכבוד {name}!
          </Text>
        <Text style={{ fontSize: 20, marginBottom: 20, right: 15 }}>
             סיימת שיעור עם {teacherName}
          </Text>
        </View>
        
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 20, marginBottom: 8, right: -50,top: -100 }}>
            נשמח שתספר לנו איך היה השיעור עם {teacherName} 
          </Text>
          <Text style={{ fontSize: 20, marginBottom: 4, right: -60,top: -100 }}>
            זה יכול לעזור ל{teacherName} ולסטודנטים הבאים
          </Text>
          <TextInput multiline
            style={{
              height: 100,
              width: 327,
              top: -50,
              borderRadius: 5,
              borderWidth: 1,
              marginBottom: 8,
              textAlign: "center",
              textAlignVertical: "center",
            }}
            placeholder="הוסף הערה"
            onChangeText={setWordReview}
            value={wordReview} />
        </View>
      </View>
  );
};

export default ReviewScreen;