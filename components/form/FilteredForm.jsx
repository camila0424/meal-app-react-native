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
          paddingTop: isLargeScreen ? 20 : 4,
          paddingBottom: isLargeScreen ? 20 : 4,
          paddingHorizontal: isLargeScreen ? 30 : 10,
          marginTop: Platform.OS === "web" ? 20 : 0,
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
          height: isLargeScreen ? 50 : 38,
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
              paddingVertical: 0, // para evitar altura extra
              paddingHorizontal: 0,
            },
            inputAndroid: {
              fontSize: isLargeScreen ? 20 : 16,
              color: "brown",
              paddingVertical: 0,
              paddingHorizontal: 0,
            },
            placeholder: {
              fontSize: isLargeScreen ? 20 : 16,
              color: "brown",
            },
            iconContainer: {
              top: isLargeScreen ? 15 : 12,
              right: 10,
            },
          }}
          useNativeAndroidPickerStyle={false} // para que tome estilos personalizados en Android
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
  },
  label: {
    color: "brown",
    fontWeight: "bold",
  },
});
