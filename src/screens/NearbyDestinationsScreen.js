import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

// Sample destinations data with coordinates
const destinationData = [
  {
    name: "New York City",
    country: "USA",
    travelType: "Cultural",
    coordinates: { latitude: 40.7128, longitude: -74.006 },
  },
  {
    name: "Tokyo",
    country: "Japan",
    travelType: "Food",
    coordinates: { latitude: 35.6762, longitude: 139.6503 },
  },
  {
    name: "Rome",
    country: "Italy",
    travelType: "Cultural",
    coordinates: { latitude: 41.9028, longitude: 12.4964 },
  },
  {
    name: "Paris",
    country: "France",
    travelType: "Relaxation",
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
  },
  {
    name: "Sydney",
    country: "Australia",
    travelType: "Adventure",
    coordinates: { latitude: -33.8688, longitude: 151.2093 },
  },
  {
    name: "Bangkok",
    country: "Thailand",
    travelType: "Food",
    coordinates: { latitude: 13.7563, longitude: 100.5018 },
  },
];

const NearbyDestinationsScreen = ({ navigation, route }) => {
  // Extract user info from route params
  const {
    userName = "Guest",
    email = "",
    travelType = "",
  } = route.params || {};

  // State variables
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);

  // Calculate distance between two coordinates in kilometers using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Earth's radius in kilometers
    const R = 6371;

    // Convert latitude and longitude from degrees to radians
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    // Haversine formula calculations
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  // Get current location and calculate distances
  useEffect(() => {
    // Define async function to request location permissions and get location
    const getLocationAsync = async () => {
      try {
        // Request location permissions from the user
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Location permission was denied");
          setLoading(false);
          return;
        }

        // Get the current position
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation(currentLocation);

        // Calculate distance to each destination
        if (currentLocation) {
          const currentLat = currentLocation.coords.latitude;
          const currentLon = currentLocation.coords.longitude;

          const destinationsWithDistance = destinationData.map((dest) => {
            const distance = calculateDistance(
              currentLat,
              currentLon,
              dest.coordinates.latitude,
              dest.coordinates.longitude
            );

            return {
              ...dest,
              distance: distance,
            };
          });

          // Sort destinations by distance (closest first)
          destinationsWithDistance.sort((a, b) => a.distance - b.distance);

          setDestinations(destinationsWithDistance);
        }

        setLoading(false);
      } catch (error) {
        setErrorMsg(`Error getting location: ${error.message}`);
        setLoading(false);
      }
    };

    getLocationAsync();
  }, []);

  // Filter destinations by travel type if specified
  const filteredDestinations = travelType
    ? destinations.filter((dest) => dest.travelType === travelType)
    : destinations;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Nearby Destinations</Text>
        <Text style={styles.subHeaderText}>Welcome, {userName}</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        {/* Location Status Section */}
        <View style={styles.locationStatusContainer}>
          <Text style={styles.sectionTitle}>Your Location</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#4A90E2" />
          ) : errorMsg ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={24} color="#FF3B30" />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : location ? (
            <View style={styles.locationInfo}>
              <Ionicons name="location" size={24} color="#4A90E2" />
              <Text style={styles.locationText}>
                {location.coords.latitude.toFixed(4)}°,{" "}
                {location.coords.longitude.toFixed(4)}°
              </Text>
            </View>
          ) : (
            <Text style={styles.locationText}>Unknown location</Text>
          )}
        </View>

        {/* Destinations List Section */}
        <View style={styles.destinationsContainer}>
          <Text style={styles.sectionTitle}>
            {travelType ? `${travelType} Destinations` : "All Destinations"}
            {!loading && !errorMsg && ` (Ordered by Distance)`}
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#4A90E2" />
          ) : filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest, index) => (
              <TouchableOpacity
                key={`${dest.name}-${index}`}
                style={styles.destinationCard}
                onPress={() => {
                  Alert.alert(
                    `${dest.name}, ${dest.country}`,
                    `Distance: ${dest.distance.toFixed(0)} km\nTravel Type: ${
                      dest.travelType
                    }`
                  );
                }}
              >
                <View style={styles.destinationMain}>
                  <Text style={styles.destinationName}>{dest.name}</Text>
                  <Text style={styles.destinationCountry}>{dest.country}</Text>
                  <Text style={styles.destinationType}>{dest.travelType}</Text>
                </View>
                <View style={styles.distanceContainer}>
                  <Text style={styles.distanceText}>
                    {dest.distance.toFixed(0)} km
                  </Text>
                  <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDestinationsText}>
              No destinations found for {travelType} travel type
            </Text>
          )}
        </View>

        {/* Info Note */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            This feature uses the Expo Location API to calculate the distance
            between your current location and various travel destinations.
          </Text>
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  locationStatusContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 15,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  locationText: {
    fontSize: 16,
    color: "#2C3E50",
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    marginLeft: 8,
  },
  destinationsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  destinationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  destinationMain: {
    flex: 1,
  },
  destinationName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2C3E50",
  },
  destinationCountry: {
    fontSize: 15,
    color: "#7F8C8D",
    marginTop: 2,
  },
  destinationType: {
    fontSize: 14,
    color: "#4A90E2",
    marginTop: 2,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2C3E50",
    marginRight: 5,
  },
  noDestinationsText: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    padding: 20,
  },
  infoContainer: {
    backgroundColor: "#E1F5FE",
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 14,
    color: "#0288D1",
    lineHeight: 20,
    textAlign: "center",
  },
});

export default NearbyDestinationsScreen;
