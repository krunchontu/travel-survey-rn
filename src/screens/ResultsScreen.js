import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";

const ResultsScreen = ({ route }) => {
  // Extract user info from route params
  const { userName = "Guest", email = "" } = route.params || {};

  // Mock survey results (in a real app, these would come from an API or storage)
  const surveyResults = [
    {
      id: "1",
      date: "May 10, 2025",
      travelType: "Adventure",
      destination: "USA",
      recommendation: "hiking in the Grand Canyon",
      budget: "$2,800",
    },
    {
      id: "2",
      date: "April 22, 2025",
      travelType: "Cultural",
      destination: "Japan",
      recommendation: "temple tour in Kyoto",
      budget: "$3,500",
    },
    {
      id: "3",
      date: "March 15, 2025",
      travelType: "Relaxation",
      destination: "Thailand",
      recommendation: "island hopping in Phuket",
      budget: "$2,200",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Survey Results</Text>
        <Text style={styles.subHeaderText}>Welcome, {userName}</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      <ScrollView style={styles.content}>
        {surveyResults.length > 0 ? (
          <>
            <Text style={styles.introText}>
              Here are your previous travel survey results:
            </Text>

            {surveyResults.map((result) => (
              <View key={result.id} style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultDate}>{result.date}</Text>
                </View>

                <View style={styles.resultContent}>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Travel Type:</Text>
                    <Text style={styles.resultValue}>{result.travelType}</Text>
                  </View>

                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Destination:</Text>
                    <Text style={styles.resultValue}>{result.destination}</Text>
                  </View>

                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Budget:</Text>
                    <Text style={styles.resultValue}>{result.budget}</Text>
                  </View>

                  <View style={styles.recommendationContainer}>
                    <Text style={styles.recommendationLabel}>
                      Recommendation:
                    </Text>
                    <Text style={styles.recommendationText}>
                      {result.recommendation}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You haven't completed any travel surveys yet.
            </Text>
            <Text style={styles.emptySubText}>
              Complete a survey to see your personalized travel recommendations!
            </Text>
          </View>
        )}
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
  introText: {
    fontSize: 18,
    color: "#2C3E50",
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  resultHeader: {
    backgroundColor: "#F8F9FA",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  resultDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F8C8D",
  },
  resultContent: {
    padding: 15,
  },
  resultRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  resultLabel: {
    width: "40%",
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  resultValue: {
    width: "60%",
    fontSize: 16,
    color: "#2C3E50",
  },
  recommendationContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F1F1",
  },
  recommendationLabel: {
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "500",
    marginBottom: 5,
  },
  recommendationText: {
    fontSize: 16,
    color: "#2C3E50",
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    color: "#95A5A6",
    textAlign: "center",
  },
});

export default ResultsScreen;
