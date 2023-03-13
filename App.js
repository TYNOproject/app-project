import * as React from "react";
import { useContext, useState } from "react";
import { View, Text,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderBackButton } from '@react-navigation/stack';
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
import StudentEditDetailsScreen from "./src/screens/StudentEditDetailsScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
const Tab = createBottomTabNavigator();


function BackIcon({ pageName }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginRight: 70 }}>
      <TouchableOpacity onPress={() => navigation.navigate(pageName)}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          style={{ paddingLeft: "15%" }}
        />
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
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "#7521f3",
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
                //headerShown: false, // hide top title

                tabBarStyle: { display: "none" }, // hide bottom tab
              }}
            />
            <Tab.Screen
              name="Home"
              component={HomePageScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home-outline" size={40} color={color} />
                ),
                headerShown: false, // hide top title
              }}
            />
            <Tab.Screen
              name="Profile"
              component={StudentProfileScreen}
              options={{
                headerShown: false, // hide top title
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
              headerShown: false,
              tabBarStyle: { display: "none" },
              tabBarButton: () => null, // hides the button
            }}
          />
            <Tab.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                tabBarStyle: { display: "none" }, // hide bottom tab
                tabBarButton: () => null, // hides the button
                headerBackground: () => null, // hide header
                headerTitle: () => null, // hide header title
                headerLeft: () => <BackIcon pageName="LogIn" />, // hide header back button
              }}
            />
            <Tab.Screen
              name="StudentSignUp"
              component={StudentSignUpScreen}
              options={{
                tabBarStyle: { display: "none" }, // hide bottom tab
                tabBarButton: () => null, // hides the button
                headerBackground: () => null, // hide header
                headerTitle: () => null, // hide header title
                headerLeft: () => <BackIcon pageName="Register" />, // hide header back button
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
              name="EditStudentDetails"
              component={StudentEditDetailsScreen}
              options={{
                tabBarStyle: { display: "none" }, // hide bottom tab
                tabBarButton: () => null, // hides the button
                headerBackground: () => null, // hide header
                headerTitle: () => null, // hide header title
                headerLeft: () => <BackIcon pageName="Profile" />, // hide header back button
              }}
            />
            <Tab.Screen
              name="Schedule"
              component={ScheduleScreen}
              options={{
                tabBarStyle: { display: "none" }, // hide bottom tab
                tabBarButton: () => null, // hides the button
                headerBackground: () => null, // hide header
                headerTitle: () => null, // hide header title
                headerLeft: () => <BackIcon pageName="CoursePage" />, // hide header back button
              }}
            />
            <Tab.Screen
              name="AfterSchedule"
              component={AfterScheduleScreen}
              options={{
                tabBarStyle: { display: "none" }, // hide bottom tab
                tabBarButton: () => null, // hides the button
                headerBackground: () => null, // hide header
                headerTitle: () => null, // hide header title
                headerLeft: () => <BackIcon pageName="Schedule" />, // hide header back button
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
                tabBarStyle: { display: "none" }, // hide bottom tab
                tabBarButton: () => null, // hides the button
                headerBackground: () => null, // hide header
                headerTitle: () => null, // hide header title
                headerLeft: () => <BackIcon pageName="HomePage" />, // hide header back button
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
            <Tab.Screen
              name="Review"
              component={ReviewScreen}
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