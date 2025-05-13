import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Import screens and navigators
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TabNavigator from "./TabNavigator";

// Create stack navigators for each drawer item
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

// HomeStack component
const HomeStackScreen = ({ route }) => {
  // Extract user info from route params
  const { userName, email } = route.params || {};

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ userName, email }}
      />
      <HomeStack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
        initialParams={{ userName, email }}
      />
    </HomeStack.Navigator>
  );
};

// ProfileStack component
const ProfileStackScreen = ({ route }) => {
  // Extract user info from route params
  const { userName, email } = route.params || {};

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
        initialParams={{ userName, email }}
      />
    </ProfileStack.Navigator>
  );
};

// SettingsStack component
const SettingsStackScreen = ({ route }) => {
  // Extract user info from route params
  const { userName, email } = route.params || {};

  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
        initialParams={{ userName, email }}
      />
    </SettingsStack.Navigator>
  );
};

// Create drawer navigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ route }) => {
  // Extract user info from route params
  const { userName, email } = route.params || {};

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#4A90E2",
        drawerInactiveTintColor: "#7F8C8D",
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStackScreen}
        initialParams={{ userName, email }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStackScreen}
        initialParams={{ userName, email }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStackScreen}
        initialParams={{ userName, email }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
