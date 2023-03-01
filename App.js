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
import StudentSignUpScreen from "./src/screens/StudentSignUpScreen";
<<<<<<< HEAD
import ReviewScreen from "./src/screens/ReviewScreen";
=======
import HomePageScreen from "./src/screens/HomePageScreen";

>>>>>>> 944b3da80fe4dbad1c89d7a669d17eae3ba8d795

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    HomePage: HomePageScreen,
    LogIn: LogInScreen,
    GoogleLogIn: GoogleLogInScreen,
    Register: RegisterScreen,
    CoursePage: CoursePageScreen,
    MainProfile: MainProfileScreen,
    TeacherProfile: TeacherProfileScreen,
    TeacherPage: TeacherPageScreen,
    TeacherSignUp: TeacherSignUpScreen,
    StudentSignUp: StudentSignUpScreen,
<<<<<<< HEAD
    AfterRegistration: AfterRegistrationScreen,
    Review: ReviewScreen
=======
>>>>>>> 944b3da80fe4dbad1c89d7a669d17eae3ba8d795
  },
  {
    initialRouteName: "HomePage",
    defaultNavigationOptions: {
      title: "BGU",
    },
  }
);

export default createAppContainer(navigator);
