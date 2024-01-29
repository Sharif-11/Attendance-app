// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CalendarScreen from "./Components/CalendarScreen";
import Courses from "./Components/Courses";
import LoginScreen from "./Components/Login";
import Semesters from "./Components/Semesters";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Semesters" component={Semesters} />
        <Stack.Screen name="Courses" component={Courses} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
