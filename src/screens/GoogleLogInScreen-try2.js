import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
//web: 689467618406-scpe9ik85l7uom2kelebldu2oh4uhpa2.apps.googleusercontent.com
//ios: 689467618406-q3u5gsnb3m1qq63cmggqvi2jm8kttli6.apps.googleusercontent.com
//android: 689467618406-5gbdh27531bd255eo0tvoder1nl3dg3m.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogInScreen() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [auth, setAuth] = React.useState(null);
  const [requireRefresh, setRequireRefresh] = React.useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "689467618406-scpe9ik85l7uom2kelebldu2oh4uhpa2.apps.googleusercontent.com",
    iosClientId:
      "689467618406-q3u5gsnb3m1qq63cmggqvi2jm8kttli6.apps.googleusercontent.com",
    androidClientId:
      "689467618406-5gbdh27531bd255eo0tvoder1nl3dg3m.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  React.useEffect(() => {
    console.log("first useEffect: " + response);
    if (response?.type === "success") {
      setAuth(response.authentication);

      const persistAuth = async () => {
        await AsyncStorage.setItem(
          "auth",
          JSON.stringify(response.authentication)
        );
      };
      persistAuth();
    }
  }, [response]);

  React.useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("auth");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        setAuth(authFromJson);
        console.log("authFromJson: " + authFromJson);

        setRequireRefresh(
          !AuthSession.TokenResponse.isTokenFresh({
            expiresIn: authFromJson.expiresIn,
            issuedAt: authFromJson.issuedAt,
          })
        );
      }
    };
    getPersistedAuth();
  }, []);

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      console.log("userInfoResponse: " + data);
      setUserInfo(data);
    });
  };

  const ShowUserData = () => {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  };

  const getClientId = () => {
    if (Platform.OS === "ios") {
      return "689467618406-q3u5gsnb3m1qq63cmggqvi2jm8kttli6.apps.googleusercontent.com";
    } else if (Platform.OS === "android") {
      return "689467618406-5gbdh27531bd255eo0tvoder1nl3dg3m.apps.googleusercontent.com";
    } else {
      console.log("Invalid platform - not handled");
    }
  };

  const refreshToken = async () => {
    const clientId = getClientId();
    console.log("auth: " + auth);
    const tokenResult = await AuthSession.refreshAsync(
      {
        clientId: clientId,
        refreshToken: auth.refreshToken,
      },
      {
        tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
      }
    );

    tokenResult.refreshToken = auth.refreshToken;

    setAuth(tokenResult);
    await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
    setRequireRefresh(false);
  };

  if (requireRefresh) {
    return (
      <View style={styles.container}>
        <Text>Token requires refresh...</Text>
        <Button title="Refresh Token" onPress={refreshToken} />
      </View>
    );
  }

  const logout = async () => {
    await AuthSession.revokeAsync(
      {
        token: auth.accessToken,
      },
      {
        revocationEndpoint: "https://oauth2.googleapis.com/revoke",
      }
    );

    setAuth(undefined);
    setUserInfo(undefined);
    await AsyncStorage.removeItem("auth");
  };

  return (
    <View style={styles.container}>
      {ShowUserData()}
      <Button
        title={auth ? "Get User Data" : "Login"}
        onPress={
          auth
            ? getUserData
            : () => promptAsync({ useProxy: false, showInRecents: true })
        }
      />
      {auth ? <Button title="Logout" onPress={logout} /> : undefined}
      <StatusBar style="auto" />
    </View>
  );
  // return (
  //   <View style={styles.container}>
  //     {user && <ShowUserData />}
  //     {user === null && (
  //       <>
  //         <Text style={styles.header}>Welcome</Text>
  //         <Text style={styles.subheader}>Please sign in to continue</Text>
  //         <TouchableOpacity
  //           disabled={!request}
  //           onPress={() => {
  //             promptAsync();
  //           }}
  //         >
  //           <Image
  //             source={require("../../assets/images/google.png")}
  //             style={styles.image}
  //           />
  //         </TouchableOpacity>
  //       </>
  //     )}
  //   </View>
  // );
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
