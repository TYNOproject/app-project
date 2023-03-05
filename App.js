
import * as React from 'react';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StudentProvider } from './StudentContext'; // Import StudentProvider from StudentContext file
import LoginScreen from './src/screens/LogInScreen';
import HomePageScreen from './src/screens/HomePageScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StudentProfileScreen from './src/screens/StudentProfileScreen';
import StudentSignUpScreen from './src/screens/StudentSignUpScreen';
import TeacherProfileScreen from './src/screens/TeacherProfileScreen';

const Tab = createBottomTabNavigator();

function BellIcon() {
  return (
    <View style={{ marginRight: 15 }}>
      <Ionicons name="notifications-outline" size={30} color="orange" />
    </View>
  );
}
=======
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LogInScreen from "./src/screens/LogInScreen";
import GoogleLogInScreen from "./src/screens/GoogleLogInScreen";
import CoursePageScreen from "./src/screens/CoursePageScreen";
import StudentProfileScreen from "./src/screens/StudentProfileScreen";
import TeacherProfileScreen from "./src/screens/TeacherProfileScreen";
import TeacherPageScreen from "./src/screens/TeacherPageScreen";
import TeacherSignUpScreen from "./src/screens/TeacherSignUpScreen";
import StudentSignUpScreen from "./src/screens/StudentSignUpScreen";
import HomePageScreen from "./src/screens/HomePageScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    HomePage: HomePageScreen,
    LogIn: LogInScreen,
    GoogleLogIn: GoogleLogInScreen,
    Register: RegisterScreen,
    CoursePage: CoursePageScreen,
    StudentProfile: StudentProfileScreen,
    TeacherProfile: TeacherProfileScreen,
    TeacherPage: TeacherPageScreen,
    TeacherSignUp: TeacherSignUpScreen,
    StudentSignUp: StudentSignUpScreen,
  },
  {
    initialRouteName: "HomePage",
    defaultNavigationOptions: {
      title: "BGU",
    },
  }
);


function App() {
  return (
    <StudentProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="LogIn"
          screenOptions={{
            tabBarActiveTintColor: 'orange',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
            tabBarStyle:[
              {
                display: 'flex'
              },
              null
            ]
          }}
        >
          <Tab.Screen
            name="LogOut"
            component={LoginScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="log-out-outline" size={40} color={color} />
              ),
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
            }}
          />
          <Tab.Screen
            name="Profile"
            component={StudentProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle-outline" size={40} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="LogIn"
            component={LoginScreen}
            options={{
              tabBarButton: () => null, // hides the button
            }}
          />

          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              tabBarButton: () => null, // hides the button

            }}
          />
          <Tab.Screen
            name="StudentSignUp"
            component={StudentSignUpScreen}
            options={{
              tabBarButton: () => null, // hides the button
            }}
          />
          <Tab.Screen
            name="HomePage"
            component={HomePageScreen}
            options={{
              tabBarButton: () => null, // hides the button
            }}
          />
          <Tab.Screen
            name="TeacherProfile"
            component={TeacherProfileScreen}
            options={{
              tabBarButton: () => null, // hides the button
              tabBarVisibilityAnimationConfig: () => null, 
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StudentProvider>
  );
}

export default App;
