import { positions } from "@mui/system";
import React, { useState } from "react";
import { Text, View, StyleSheet,ScrollView,TouchableOpacity } from "react-native";
import { Card,Icon,Avatar,Button,ButtonGroup  } from "react-native-elements";
import ReviewCard from "./ReviewCard";


const TimeScrollBar = ({ times }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    
    return (
        <ScrollView contentContainerStyle={styles.container} horizontal={true}>
          <View style={styles.row}>
          <ButtonGroup style={styles.timeButton}
                buttons={times}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />
          </View>
        </ScrollView>
      );
    };


    const styles = StyleSheet.create({
        container: {
          flexDirection: "row",
          height:30,
          position:"relative"
        },
        row: {
          flexDirection: "row",
          flex: 1,
          padding: 10,
          position:"relative",
        },
        timeButton: {
            backgroundColor: 'lightgray',
            borderRadius: 4,
            padding: 8,
            marginVertical: 4,
            height:40,
            marginHorizontal:10,
            position:"relative"
          },
      });

export default TimeScrollBar;
