import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import StudentContext from "../contexts/StudentContext.js";
import { signIn, signInWithGoogle } from "../api/serviceCalls.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const { addToStudent, items, getVal, clearItems } =
    useContext(StudentContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "689467618406-8toie32jg1ef47frm598uognap6hgmfc.apps.googleusercontent.com",
    iosClientId:
      "689467618406-ke3kpj2krhu3sl9g59l240t8o8n230vp.apps.googleusercontent.com",
    expoClientId:
      "689467618406-scpe9ik85l7uom2kelebldu2oh4uhpa2.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo()
        .then((res) => {
          addToStudent("studentDetails", res.data);
          navigation.navigate("HomePage");
        })
        .catch((err) => {});
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      console.log(user);
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });
  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  const handleGoogleLogin = async () => {
    try {
      let signInResponse = await signIn({ email: userInfo.email }); // use token as password
      if (signInResponse.status === 200) {
        addToStudent("studentDetails", signInResponse.data);
        navigation.navigate("HomePage");
      } else {
        // If sign-in fails, navigate to RegisterScreen
        addToStudent("studentDetails", {
          name: userInfo.given_name + " " + userInfo.family_name,
          email,
        });
        navigation.navigate("Register");
      }
    } catch (error) {
      alert("אירעה שגיאה, אנא נסה שנית");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      style={{ flex: 1 }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: "50%",
        }}
        resizeMode="contain"
      />
      <Text style={styles.header}>
        {"\n"}
        היי,{"\n"}
        טוב לראות אותך :)
      </Text>
      {userInfo === null ? (
        <>
          <View style={styles.inputFields}>
            <TextInput
              style={styles.inputField1}
              placeholder="כתובת מייל"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={styles.inputField2}
              placeholder="סיסמא"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="התחבר"
              titleStyle={{
                fontSize: 18,
                textAlign: "center",
                fontFamily: "Heebo-Bold",
              }} // Add this line to center the title
              leading={() => <AntDesign name="left" size={24} color="white" />}
              onPress={() => {
                clearItems();
                signIn({ email, password })
                  .then((res) => {
                    addToStudent("studentDetails", res.data);
                    navigation.navigate("HomePage");
                  })
                  .catch((err) => alert("אירעה שגיאה, אנא נסה שנית"));
              }}
            />

            <Button
              title="לא רשום? לחץ כאן"
              titleStyle={{
                fontSize: 18,
                textAlign: "center",
                fontFamily: "Heebo-Bold",
              }} // Add this line to center the title
              leading={() => <AntDesign name="left" size={24} color="white" />}
              onPress={() => {
                clearItems();
                navigation.navigate("Register");
              }}
            />
          </View>
          <Button
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
        </>
      ) : (
        navigation.navigate("HomePage")
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    padding: "10%",
    height: "50%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "15%",
  },
  inputFields: {
    width: "80%",
    flex: 1,
    justifyContent: "space-evenly",
    marginTop: "10%",
  },
  header: {
    fontSize: 30, // use responsive font size
    fontFamily: "Heebo-Bold",
    textAlign: "center",
    textShadowColor: "#A1B2C3",
    textShadowOffset: { width: 1 },
    textShadowRadius: 7,
  },
  inputField1: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#7521f3",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    fontFamily: "Heebo-Regular",
  },

  inputField2: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#7521f3",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    fontFamily: "Heebo-Regular",
  },
  buttonContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: "30%",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
