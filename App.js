import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LogInScreen from "./src/screens/LogInScreen";
import GoogleLogInScreen from "./src/screens/GoogleLogInScreen";
import CoursePageScreen from "./src/screens/CoursePageScreen";
import MainProfileScreen from "./src/screens/MainProfileScreen";
import TeacherProfileScreen from "./src/screens/TeacherProfileScreen";
import TeacherPageScreen from "./src/screens/TeacherPageScreen";
import TeacherSignUpScreen from "./src/screens/TeacherSignUpScreen";



const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    LogIn: LogInScreen,
    GoogleLogIn: GoogleLogInScreen,
    Register: RegisterScreen,
    CoursePage: CoursePageScreen,
    MainProfile: MainProfileScreen,
    TeacherProfile: TeacherProfileScreen,
    TeacherPage: TeacherPageScreen,
    TeacherSignUp: TeacherSignUpScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
