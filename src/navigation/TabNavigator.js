import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import SurveyScreen from "../screens/SurveyScreen";
import ResultsScreen from "../screens/ResultsScreen";

// Create stack navigators for each tab
const SurveyStack = createNativeStackNavigator();
const ResultsStack = createNativeStackNavigator();

// SurveyStack component
const SurveyStackScreen = ({ route }) => {
  // Extract user info from route params
  const { userName, email } = route.params || {};

  return (
    <SurveyStack.Navigator>
      <SurveyStack.Screen
        name="SurveyForm"
        component={SurveyScreen}
        options={{ headerShown: false }}
        initialParams={{ userName, email }}
      />
    </SurveyStack.Navigator>
  );
};

// ResultsStack component
const ResultsStackScreen = ({ route }) => {
  // Extract user info from route params
  const { userName, email } = route.params || {};

  return (
    <ResultsStack.Navigator>
      <ResultsStack.Screen
        name="SurveyResults"
        component={ResultsScreen}
        options={{ headerShown: false }}
        initialParams={{ userName, email }}
      />
    </ResultsStack.Navigator>
  );
};

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  // Extract user info from route params
  const { userName, email } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Survey") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Results") {
            iconName = focused ? "list" : "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4A90E2",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Survey"
        component={SurveyStackScreen}
        initialParams={{ userName, email }}
      />
      <Tab.Screen
        name="Results"
        component={ResultsStackScreen}
        initialParams={{ userName, email }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
