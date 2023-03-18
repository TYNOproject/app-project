import * as React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Google } from "expo";
import * as Google from "expo-auth-session/providers/google";
//web: 689467618406-scpe9ik85l7uom2kelebldu2oh4uhpa2.apps.googleusercontent.com
//ios: 689467618406-q3u5gsnb3m1qq63cmggqvi2jm8kttli6.apps.googleusercontent.com
//android: 689467618406-5gbdh27531bd255eo0tvoder1nl3dg3m.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogInScreen() {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId:
        "689467618406-scpe9ik85l7uom2kelebldu2oh4uhpa2.apps.googleusercontent.com",
      iosClientId:
        "689467618406-a57tfca7b8d947s7e56amua171iuakhs.apps.googleusercontent.com",
      androidClientId:
        "689467618406-5gbdh27531bd255eo0tvoder1nl3dg3m.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      responseType: ResponseType.token,
      redirectUri: makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    } else {
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    let userInfo = await response.json();
    setUser(userInfo);
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View style={styles.welcomeContainer}>
          <Text style={styles.header}>Welcome</Text>
          <Image source={{ uri: user.picture }} style={styles.image} />
          <Text style={styles.subheader}>{user.name}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {user && <ShowUserInfo />}
      {user === null && (
        <>
          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.subheader}>Please sign in to continue</Text>
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              source={require("../../assets/images/google.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { fontSize: 35, fontWeight: "bold", marginBottom: 20 },
  subheader: { fontSize: 20, fontWeight: "bold" },
});
