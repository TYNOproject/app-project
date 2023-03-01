import * as React from 'react';
import { Pressable, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/screens/LogInScreen';
import HomePageScreen from './src/screens/HomePageScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StudentSignUpScreen from './src/screens/StudentSignUpScreen';

const Drawer = createDrawerNavigator();

function App() {
  return (
     <NavigationContainer>
      <Drawer.Navigator initialRouteName="LogIn">
        <Drawer.Screen name="HomePage" component={HomePageScreen} />
        <Drawer.Screen name="StudentSignUp" component={StudentSignUpScreen} />
        <Drawer.Screen name="LogIn" component={LoginScreen} 
          options={{ headerShown: false, drawerLockMode: 'locked-closed' }} 
        />
        <Drawer.Screen name="Register" component={RegisterScreen}           
            options={{ 
            drawerLabel: () => null,
            drawerItemStyle: { display: 'none' }
          }}  />
          
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
