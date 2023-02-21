import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import LogInScreen from "./src/screens/LogInScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    LogIn: LogInScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
