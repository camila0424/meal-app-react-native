import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export function FilteredForm({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Obtenemos ancho de pantalla para estilos responsivos
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const handleChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const dynamicLabelStyle = {
    fontSize: isLargeScreen ? 20 : 16,
  };

  const dynamicPickerStyle = {
    inputIOS: {
      fontSize: isLargeScreen ? 20 : 18,
      paddingVertical: isLargeScreen ? 14 : 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "brown",
      borderRadius: 10,
      color: "brown",
      backgroundColor: "#F0BF7C",
      minWidth: 280, // Más ancho mínimo para móvil
      width: isLargeScreen ? 800 : "100%",
    },
    inputAndroid: {
      fontSize: isLargeScreen ? 20 : 18,
      paddingVertical: isLargeScreen ? 10 : 8,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "brown",
      borderRadius: 10,
      color: "brown",
      backgroundColor: "#F0BF7C",
      minWidth: 200,
      width: isLargeScreen ? 800 : "100%",
    },
    placeholder: {
      fontSize: isLargeScreen ? 20 : 18,
      color: "brown",
    },
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, dynamicLabelStyle]}>Filter by category:</Text>
      <RNPickerSelect
        value={selectedCategory}
        onValueChange={handleChange}
        style={dynamicPickerStyle}
        placeholder={{ label: "All", value: "" }}
        items={[
          { label: "Beef", value: "Beef" },
          { label: "Chicken", value: "Chicken" },
          { label: "Dessert", value: "Dessert" },
          { label: "Vegetarian", value: "Vegetarian" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0BF7C",
    paddingVertical: 30, // Más padding arriba y abajo
    paddingHorizontal: 40, // menos padding para más espacio
    maxWidth: 900, // Ancho máximo para que no ocupe toda la pantalla
    alignSelf: "center", // Centrar horizontalmente el contenedor
    alignItems: "center", // Centrar los hijos (label y picker)
    borderRadius: 12,
  },
  label: {
    color: "brown",
    fontWeight: "bold",
    marginBottom: 10, // Espacio entre label y picker
  },
});
