import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";

const travelTypes = ["Adventure", "Relaxation", "Cultural", "Food"];
const countries = [
  "USA",
  "Japan",
  "Italy",
  "France",
  "Australia",
  "Thailand",
  "Spain",
  "Brazil",
];

const SurveyScreen = ({ navigation, route }) => {
  // Extract user info from route params
  const { userName = "Guest", email = "" } = route.params || {};

  const [formData, setFormData] = useState({
    name: userName, // Pre-fill with user's name
    age: "",
    travelType: "",
    country: "",
    budget: 2750,
    comments: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age || isNaN(formData.age))
      newErrors.age = "Valid age is required";
    if (!formData.travelType) newErrors.travelType = "Travel type is required";
    if (!formData.country) newErrors.country = "Country is required";
    return newErrors;
  };

  const getRecommendation = () => {
    const recommendations = {
      Adventure: {
        USA: "hiking in the Grand Canyon",
        Japan: "climbing Mount Fuji",
        Italy: "hiking in the Dolomites",
        France: "skiing in the Alps",
        Australia: "diving in the Great Barrier Reef",
        Thailand: "jungle trekking in Chiang Mai",
        Spain: "hiking the Camino de Santiago",
        Brazil: "exploring the Amazon rainforest",
      },
      Relaxation: {
        USA: "beach resort in Hawaii",
        Japan: "onsen retreat in Hakone",
        Italy: "wellness spa in Tuscany",
        France: "luxury resort in French Riviera",
        Australia: "beach holiday in Gold Coast",
        Thailand: "island hopping in Phuket",
        Spain: "beach resort in Ibiza",
        Brazil: "beachfront stay in Copacabana",
      },
      Cultural: {
        USA: "museums in New York City",
        Japan: "temple tour in Kyoto",
        Italy: "historical sites in Rome",
        France: "art galleries in Paris",
        Australia: "aboriginal cultural tours",
        Thailand: "temple exploration in Bangkok",
        Spain: "architectural tour in Barcelona",
        Brazil: "cultural festivals in Salvador",
      },
      Food: {
        USA: "food tour in New Orleans",
        Japan: "sushi making in Tokyo",
        Italy: "cooking class in Bologna",
        France: "wine tasting in Bordeaux",
        Australia: "food markets in Melbourne",
        Thailand: "street food tour in Bangkok",
        Spain: "tapas crawl in Madrid",
        Brazil: "food festival in São Paulo",
      },
    };
    return (
      recommendations[formData.travelType]?.[formData.country] ||
      "a custom travel experience"
    );
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const recommendation = getRecommendation();
    Alert.alert(
      "Thanks for Submitting!",
      `Thanks, ${formData.name}! Based on your preferences:\n\n` +
        `${formData.age}-year-old fan of ${formData.travelType}\n` +
        `Dreaming of ${formData.country}\n` +
        `Budget: $${formData.budget}\n\n` +
        `We recommend trying ${recommendation}!`,
      [
        {
          text: "View Survey Results",
          onPress: () =>
            navigation.navigate("Results", {
              formData,
              recommendation,
              userName,
              email,
            }),
        },
        {
          text: "Find Nearby Destinations",
          onPress: () => {
            // Navigate to the Nearby tab with the selected travel type
            navigation.navigate("Nearby", {
              userName,
              email,
              travelType: formData.travelType,
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Travel Preferences Survey</Text>
        <Text style={styles.subHeaderText}>Welcome, {userName}</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.errorInput]}
            value={formData.name}
            onChangeText={(text) => {
              setFormData({ ...formData, name: text });
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            placeholder="Enter your name"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={[styles.input, errors.age && styles.errorInput]}
            value={formData.age}
            onChangeText={(text) => {
              setFormData({ ...formData, age: text });
              if (errors.age) setErrors({ ...errors, age: null });
            }}
            keyboardType="numeric"
            placeholder="Enter your age"
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Favorite Travel Type</Text>
          <View style={styles.radioGroup}>
            {travelTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.radioButton,
                  formData.travelType === type && styles.radioButtonSelected,
                ]}
                onPress={() => {
                  setFormData({ ...formData, travelType: type });
                  if (errors.travelType)
                    setErrors({ ...errors, travelType: null });
                }}
              >
                <Text
                  style={[
                    styles.radioText,
                    formData.travelType === type && styles.radioTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.travelType && (
            <Text style={styles.errorText}>{errors.travelType}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dream Destination</Text>
          <View style={styles.pickerContainer}>
            {countries.map((country) => (
              <TouchableOpacity
                key={country}
                style={[
                  styles.countryButton,
                  formData.country === country && styles.countryButtonSelected,
                ]}
                onPress={() => {
                  setFormData({ ...formData, country: country });
                  if (errors.country) setErrors({ ...errors, country: null });
                }}
              >
                <Text
                  style={[
                    styles.countryText,
                    formData.country === country && styles.countryTextSelected,
                  ]}
                >
                  {country}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.country && (
            <Text style={styles.errorText}>{errors.country}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Travel Budget (USD)</Text>
          <Text style={styles.budgetText}>${formData.budget}</Text>
          <Slider
            style={styles.slider}
            minimumValue={500}
            maximumValue={5000}
            step={50}
            value={formData.budget}
            onValueChange={(value) =>
              setFormData({ ...formData, budget: value })
            }
            minimumTrackTintColor="#4A90E2"
            maximumTrackTintColor="#D1D1D6"
            thumbTintColor="#4A90E2"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>$500</Text>
            <Text style={styles.sliderLabel}>$5000</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional Comments</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.comments}
            onChangeText={(text) =>
              setFormData({ ...formData, comments: text })
            }
            placeholder="Any special requests or preferences?"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Survey</Text>
        </TouchableOpacity>
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
  form: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E1E8ED",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  errorInput: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  radioButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    borderWidth: 1,
    borderColor: "#E1E8ED",
  },
  radioButtonSelected: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  radioText: {
    color: "#2C3E50",
    fontSize: 14,
  },
  radioTextSelected: {
    color: "#FFFFFF",
  },
  pickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  countryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    borderWidth: 1,
    borderColor: "#E1E8ED",
  },
  countryButtonSelected: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  countryText: {
    color: "#2C3E50",
    fontSize: 14,
  },
  countryTextSelected: {
    color: "#FFFFFF",
  },
  slider: {
    height: 40,
  },
  budgetText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#4A90E2",
    marginBottom: 8,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -8,
  },
  sliderLabel: {
    color: "#8E8E93",
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#2ECC71",
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default SurveyScreen;
