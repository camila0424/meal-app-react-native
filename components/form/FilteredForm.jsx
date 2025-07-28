import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export function FilteredForm({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const handleChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const dynamicLabelStyle = {
    fontSize: isLargeScreen ? 20 : 16,
    marginBottom: isLargeScreen ? 10 : 6,
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: isLargeScreen ? 8 : 0, // Reducido aún más
          paddingBottom: isLargeScreen ? 10 : 5,
          paddingHorizontal: isLargeScreen ? 30 : 10,
          marginTop: Platform.OS === "web" ? 5 : -15, // Más negativo en móvil
        },
      ]}
    >
      <Text style={[styles.label, dynamicLabelStyle]}>Filter by category:</Text>

      {/* Contenedor visual con borde y fondo para el desplegable */}
      <View
        style={{
          backgroundColor: "white",
          borderColor: "brown",
          borderWidth: 1,
          borderRadius: 20,
          width: isLargeScreen ? 800 : 250,
          height: isLargeScreen ? 45 : 40,
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <RNPickerSelect
          value={selectedCategory}
          onValueChange={handleChange}
          placeholder={{ label: "All", value: "" }}
          items={[
            { label: "Beef", value: "Beef" },
            { label: "Chicken", value: "Chicken" },
            { label: "Dessert", value: "Dessert" },
            { label: "Vegetarian", value: "Vegetarian" },
          ]}
          style={{
            inputIOS: {
              fontSize: isLargeScreen ? 20 : 16,
              color: "brown",
              paddingVertical: 0,
              paddingHorizontal: 0,
            },
            inputAndroid: {
              fontSize: isLargeScreen ? 20 : 16,
              color: "brown",
              paddingVertical: 0,
              paddingHorizontal: 0,
            },
            inputWeb: {
              fontSize: isLargeScreen ? 20 : 16,
              color: "brown",
              outline: "none",
              paddingVertical: 0,
              paddingHorizontal: 0,
              borderWidth: 0,
              backgroundColor: "transparent",
            },
            placeholder: {
              fontSize: isLargeScreen ? 20 : 16,
              color: "brown",
            },
            iconContainer: {
              top: isLargeScreen ? 12 : 10,
              right: 10,
              height: "100%",
              justifyContent: "center",
            },
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0BF7C",
    maxWidth: 900,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: Platform.OS === "web" ? 5 : 3,
  },
  label: {
    color: "brown",
    fontWeight: "bold",
  },
});
