
import * as React from 'react';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StudentProvider } from './StudentContext'; // Import StudentProvider from StudentContext file
import LoginScreen from './src/screens/LogInScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomePageScreen from './src/screens/homePageScreen';
import StudentProfileScreen from './src/screens/StudentProfileScreen';
import StudentSignUpScreen from './src/screens/StudentSignUpScreen';
import TeacherProfileScreen from './src/screens/TeacherProfileScreen';
import CoursePageScreen from './src/screens/CoursePageScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import AfterScheduleScreen from './src/screens/AfterScheduleScreen';


const Tab = createBottomTabNavigator();

function BellIcon() {
  return (
    <View style={{ marginRight: 15 }}>
      <Ionicons name="notifications-outline" size={30} color="orange" />
    </View>
  );
}

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
            name="Schedule"
            component={ScheduleScreen}
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
          <Tab.Screen
            name="CoursePage"
            component={CoursePageScreen}
            options={{
              tabBarButton: () => null, // hides the button
              tabBarVisibilityAnimationConfig: () => null, 
            }}
          />
          <Tab.Screen
            name="AfterSchedule"
            component={AfterScheduleScreen}
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
