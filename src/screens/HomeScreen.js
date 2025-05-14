import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

const HomeScreen = ({ navigation, route }) => {
  // Extract user info from route params
  const { userName = "Guest", email = "" } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Travel Survey</Text>
        <Text style={styles.subHeaderText}>Welcome, {userName}</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>
          Explore our travel survey and discover your perfect destination!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("TabNavigator", { userName, email })
          }
        >
          <Text style={styles.buttonText}>Go to Surveys</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.locationButton]}
          onPress={() =>
            navigation.navigate("TabNavigator", {
              screen: "Nearby",
              params: { userName, email },
            })
          }
        >
          <Text style={styles.buttonText}>Find Nearby Destinations</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 26,
  },
  button: {
    backgroundColor: "#2ECC71",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  locationButton: {
    backgroundColor: "#4A90E2",
    marginTop: 15,
  },
});

export default HomeScreen;
