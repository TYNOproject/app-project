import * as React from "react";
import { useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StudentProvider } from "./src/contexts/StudentContext";
import { ClassProvider } from "./src/contexts/ClassContext";
import LoginScreen from "./src/screens/LogInScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import StudentProfileScreen from "./src/screens/StudentProfileScreen";
import StudentSignUpScreen from "./src/screens/StudentSignUpScreen";
import TeacherProfileScreen from "./src/screens/TeacherProfileScreen";
import CoursePageScreen from "./src/screens/CoursePageScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import AfterScheduleScreen from "./src/screens/AfterScheduleScreen";
import ConfirmLessonsScreen from "./src/screens/ConfirmLessonsScreen";
import TeacherRegisterScreen from "./src/screens/TeacherRegisterScreen";
import HomePageScreen from "./src/screens/HomePageScreen";
const Tab = createBottomTabNavigator();

function BellIcon() {
  return (
    <View style={{ marginRight: 15 }}>
      <Ionicons name="notifications-outline" size={30} color="'orange'" />
    </View>
  );
}

function BackIcon({ pageName }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginRight: 50 }}>
      <TouchableOpacity onPress={() => navigation.navigate(pageName)}>
        <Ionicons name="arrow-back" size={40} color="orange" />
      </TouchableOpacity>
    </View>
  );
}

function App() {
  return (
    <StudentProvider>
      <ClassProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="LogIn"
            screenOptions={{
              tabBarActiveTintColor: "orange",
              tabBarInactiveTintColor: "purple",
              tabBarShowLabel: false,
              tabBarStyle: [
                {
                  display: "flex",
                },
                null,
              ],
            }}
          >
            <Tab.Screen
              name="LogOut"
              component={LoginScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="log-out-outline" size={40} color={color} />
                ),
                headerShown: false, // hide top title

              }}
            />
            <Tab.Screen
              name="Home"
              component={HomePageScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home-outline" size={40} color={color} />
                ),
                headerRight: () => <BellIcon />,
                headerShown: false, // hide top title
              }}
            />
            <Tab.Screen
              name="Profile"
              component={StudentProfileScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons
                    name="person-circle-outline"
                    size={40}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="LogIn"
              component={LoginScreen}
              options={{
                tabBarButton: () => null, // hides the button
                headerShown: false, // hide top title

              }}
            />

          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              tabBarButton: () => null, // hides the button
              headerShown: false, // hide top title
            }}
          />
          <Tab.Screen
            name="StudentSignUp"
            component={StudentSignUpScreen}
            options={{
              tabBarButton: () => null, // hides the button
              headerShown: false, // hide top title
            }}
          />
          <Tab.Screen
            name="HomePage"
            component={HomePageScreen}
            options={{
              tabBarButton: () => null, // hides the button
              headerShown: false, // hide top title
            }}
          />
          <Tab.Screen
            name="Schedule"
            component={ScheduleScreen}
            options={{
              tabBarButton: () => null, // hides the button
              headerShown: false, // hide top title
            }}
          />
          <Tab.Screen
            name="AfterSchedule"
            component={AfterScheduleScreen}
            options={{
              tabBarButton: () => null, // hides the button
              headerShown: false, // hide top title
            }}
          />
          <Tab.Screen
            name="TeacherProfile"
            component={TeacherProfileScreen}
            options={{
              tabBarButton: () => null, // hides the button
              tabBarVisibilityAnimationConfig: () => null,
              headerShown: false, // hide top title
            }}
          />
          <Tab.Screen
            name="ConfirmLessons"
            component={ConfirmLessonsScreen}
            options={{
              tabBarButton: () => null, // hides the button
              tabBarVisibilityAnimationConfig: () => null,
              headerShown: false, // hide top title
            }}
          />
          <Tab.Screen
            name="CoursePage"
            component={CoursePageScreen}
            options={{
              tabBarButton: () => null, // hides the button
              tabBarVisibilityAnimationConfig: () => null,
              headerShown: false, // hide top title
            }}
          />
          <Tab.Screen
            name="TeacherRegister"
            component={TeacherRegisterScreen}
            options={{
              tabBarButton: () => null, // hides the button
              tabBarVisibilityAnimationConfig: () => null,
              headerShown: false, // hide top title
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      </ClassProvider>
    </StudentProvider>
  );
}

export default App;
