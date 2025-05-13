import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

const SettingsScreen = ({ route }) => {
  // Extract user info from route params
  const { userName = "Guest", email = "" } = route.params || {};

  // In a real app, these would be connected to state and persistence
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [locationEnabled, setLocationEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <Text style={styles.subHeaderText}>{userName}</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notificationsEnabled ? "#4A90E2" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={darkModeEnabled ? "#4A90E2" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Location Services</Text>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={locationEnabled ? "#4A90E2" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account</Text>

          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingButton, styles.logoutButton]}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>About</Text>

          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Terms of Service</Text>
          </TouchableOpacity>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#4A90E2",
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 5,
  },
  emailText: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#F8F9FA",
    color: "#2C3E50",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  settingLabel: {
    fontSize: 16,
    color: "#2C3E50",
  },
  settingButton: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  settingButtonText: {
    fontSize: 16,
    color: "#2C3E50",
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "500",
  },
  versionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  versionText: {
    fontSize: 14,
    color: "#7F8C8D",
  },
});

export default SettingsScreen;
