import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as MailComposer from "expo-mail-composer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [pdfUri, setPdfUri] = useState(null);
  const [pdfName, setPdfName] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.type === "success") {
        setPdfUri(result.uri);
        setPdfName(result.name);
      } else {
        setPdfUri(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendEmail = async () => {
    try {
      const options = {
        recipients: ["michalnkedar@gmail.com"],
        subject: "PDF file from Expo app",
        body: "Please see the attached PDF file",
        attachments: [pdfUri],
      };
      await MailComposer.composeAsync(options);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome
        name="upload"
        size={!pdfUri ? 100 : 50}
        color={!pdfUri ? "black" : "grey"}
        onPress={pickDocument}
      />
      {pdfName && (
        <Text style={{ fontFamily: "Heebo-Regular", textAlign: "center" }}>
          בחרת להעלות את: {"\n"}
          {pdfName}
        </Text>
      )}
      <MaterialCommunityIcons
        name="email-send"
        size={!pdfUri ? 50 : 100}
        color={!pdfUri ? "grey" : "black"}
        onPress={sendEmail}
        disabled={!pdfUri}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 30,
    height: 200,
    justifyContent: "space-between",
  },
});
