import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

export function FilteredForm({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by Category:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={handleChange}
          style={styles.picker}
          dropdownIconColor="brown"
          mode="dropdown"
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="Beef" value="Beef" />
          <Picker.Item label="Chicken" value="Chicken" />
          <Picker.Item label="Dessert" value="Dessert" />
          <Picker.Item label="Vegetarian" value="Vegetarian" />
          {/* Agrega más si quieres */}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#F0BF7C",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "brown",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "brown",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    ...Platform.select({
      android: {
        justifyContent: "center",
      },
    }),
  },
  picker: {
    height: Platform.OS === "android" ? 48 : undefined,
    color: "black",
  },
});
