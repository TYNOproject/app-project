import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as MailComposer from "expo-mail-composer";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
    <View>
      <FontAwesome.Button
        name="upload"
        size={24}
        color="black"
        onPress={pickDocument}
      />
      {pdfName && (
        <Text style={{ fontFamily: "Heebo-Regular", textAlign: "center" }}>
          בחרת להעלות את: {"\n"}
          {pdfName}
        </Text>
      )}
      <FontAwesome.Button
        name="send"
        size={24}
        color="black"
        onPress={sendEmail}
        disabled={!pdfUri}
      />
    </View>
  );
}
