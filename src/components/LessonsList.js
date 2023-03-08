import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar, Pressable } from "react-native";
import LessonCard from "./LessonCard";

const LessonsList = ({ lessons }) => { 
  return (
    <ScrollView horizontal={true} 
    showsHorizontalScrollIndicator = {false}
    contentContainerStyle={styles.container}>
      <View style={styles.scrollView}>
        {lessons.map((lesson) => (
          <LessonCard lesson={lesson} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
});
//   return (
//     <ScrollView horizontal = {true} contentContainerStyle = {styles.container}>
//       <View style={styles.lessons}>
//         {lessons.map((lesson) => (
//           <LessonCard lesson={lesson} />
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: 130
//   },
//   lessons: {
//     flex: 1,
//     // padding: 5,
//     flexDirection: "row",
//   },
// });

export default LessonsList;
