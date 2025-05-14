# Travel Survey App with Expo Location API

## Overview
This React Native application is a travel survey platform that collects user preferences for travel destinations and provides recommendations. It has been enhanced with the Expo Location API to add location-aware features, allowing users to find travel destinations relative to their current location.

## Features
- User login system
- Travel preference survey with multiple input types
- Location-based destination recommendations
- Distance calculation between user and potential destinations
- Filtering destinations by travel type
- Interactive UI with proper navigation

## Implementation Details

### Expo Location API Integration

The application demonstrates the use of the `expo-location` package from the Expo SDK. This implementation showcases several key functionalities:

1. **Location Permission Handling**: 
   - Requesting and managing user location permissions
   - Handling permission denial gracefully

2. **Getting Current Position**:
   - Using `Location.getCurrentPositionAsync()` to retrieve user coordinates
   - Setting appropriate accuracy levels through `Location.Accuracy.Balanced`

3. **Distance Calculation**:
   - Implementation of the Haversine formula to calculate distances between coordinates
   - Sorting destinations based on proximity to user

4. **Destination Filtering**:
   - Filtering destinations based on user's travel type preferences
   - Dynamically updating the UI based on the selected filters

5. **Unified UI Experience**:
   - Consistent design language with the rest of the application
   - Error handling and loading states

## Technical Implementation

### NearbyDestinationsScreen

The screen/component that implements the Expo Location API functionality:

```javascript
import * as Location from "expo-location";

// Request location permissions
const { status } = await Location.requestForegroundPermissionsAsync();

// Get current position with balanced accuracy
const currentLocation = await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.Balanced,
});

// Calculate distances with Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Earth's radius in kilometers
  const R = 6371;
  
  // Convert latitude and longitude from degrees to radians
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * 
    Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};
```

### Integration Points

The location functionality is integrated with the rest of the app through:

1. **Tab Navigation**:
   - Added as a dedicated tab in the TabNavigator
   - Accessible directly from the home screen

2. **Survey Flow**:
   - After completing the survey, users can view nearby destinations related to their selected travel type
   - Travel preferences are passed to the location screen

3. **Permission Management**:
   - Appropriate error messages when location access is denied
   - Alternative destination listing when location is unavailable

## Learning Insights

- **Expo Location API**: The package provides a simple, cross-platform way to access device location
- **Permission Handling**: Proper permission handling is essential for location-based features
- **Performance Considerations**: Location services can impact battery life, so balanced accuracy settings are important
- **Distance Calculations**: The Haversine formula provides accurate distance calculations across the globe
- **Error Handling**: Location services may not always be available, requiring robust fallback mechanisms

## Setup and Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Ensure expo-location is installed:
   ```
   npm install expo-location
   ```

3. Run the application:
   ```
   expo start
   ```

## Credits
This project demonstrates the integration of the Expo Location API as part of a learning exercise for mobile application development.
