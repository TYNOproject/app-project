import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import EntranceScreen from "./src/screens/EntranceScreen";
import CoursePageScreen from "./src/screens/CoursePageScreen";
import MainProfileScreen from "./src/screens/MainProfileScreen";
import TeacherProfileScreen from "./src/screens/TeacherProfileScreen";
import TeacherPageScreen from "./src/screens/TeacherPageScreen";
import TeacherSignUpScreen from "./src/screens/TeacherSignUpScreen";
import StudentSignUpScreen from "./src/screens/StudentSignUpScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Entrance: EntranceScreen,
    SignUp: SignUpScreen,
    CoursePage: CoursePageScreen,
    MainProfile: MainProfileScreen,
    TeacherProfile: TeacherProfileScreen,
    TeacherPage: TeacherPageScreen,
    TeacherSignUp: TeacherSignUpScreen,
    StudentSignUp: StudentSignUpScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
