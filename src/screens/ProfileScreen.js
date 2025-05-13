import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";

const ProfileScreen = ({ route }) => {
  // Extract user info from route params
  const { userName = "Guest", email = "" } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userName ? userName.charAt(0).toUpperCase() : "G"}
          </Text>
        </View>

        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoHeader}>Account Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{userName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Member Since:</Text>
            <Text style={styles.infoValue}>
              {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>
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
  profileContainer: {
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 40,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  infoLabel: {
    width: "40%",
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  infoValue: {
    width: "60%",
    fontSize: 16,
    color: "#2C3E50",
  },
});

export default ProfileScreen;
