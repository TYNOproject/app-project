import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import HomePageScreen from "./src/screens/HomePageScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LogInScreen from "./src/screens/LogInScreen";
import GoogleLogInScreen from "./src/screens/GoogleLogInScreen";
import CoursePageScreen from "./src/screens/CoursePageScreen";
import StudentProfileScreen from "./src/screens/StudentProfileScreen";
import TeacherProfileScreen from "./src/screens/TeacherProfileScreen";
import TeacherPageScreen from "./src/screens/TeacherPageScreen";
import TeacherSignUpScreen from "./src/screens/TeacherSignUpScreen";
import StudentSignUpScreen from "./src/screens/StudentSignUpScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import ConfirmLessonsScreen from "./src/screens/ConfirmLessonsScreen";
import EditTeacherScreen from "./src/screens/EditTeacherScreen";

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
    ConfirmLessons: ConfirmLessonsScreen,
    EditTeacher: EditTeacherScreen,
    TeacherPage: TeacherPageScreen,
    TeacherSignUp: TeacherSignUpScreen,
    StudentSignUp: StudentSignUpScreen,
    Review: ReviewScreen
  },
  {
    initialRouteName: "TeacherProfile",
    defaultNavigationOptions: {
      title: "BGU",
    },
  }
);

export default createAppContainer(navigator);
