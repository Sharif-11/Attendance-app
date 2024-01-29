// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import CalendarScreen from "./Components/CalendarScreen";
import Courses from "./Components/Courses";
import LoginScreen from "./Components/Login";
import store from "./Redux/store";
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="My Courses" component={Courses} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          {/* Add more screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
