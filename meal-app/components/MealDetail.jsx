import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function MealDetail({ route }) {
  const { meal } = route.params;
  const insets = useSafeAreaInsets();

  // Extraer ingredientes + medidas
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16,
        backgroundColor: "#F0BF7C",
      }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.detail}>Category: {meal.strCategory}</Text>
        <Text style={styles.detail}>Origin: {meal.strArea}</Text>

        {meal.strTags && (
          <Text style={styles.detail}>
            Tags: {meal.strTags.split(",").join(", ")}
          </Text>
        )}

        <Text style={styles.section}>Ingredients</Text>
        {ingredients.map((item, idx) => (
          <Text key={idx} style={styles.ingredient}>
            • {item}
          </Text>
        ))}

        <Text style={styles.section}>Instructions</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>

        {meal.strYoutube && (
          <TouchableOpacity onPress={() => Linking.openURL(meal.strYoutube)}>
            <Text style={styles.link}>📺 See video in YouTube</Text>
          </TouchableOpacity>
        )}

        {meal.strSource && (
          <TouchableOpacity onPress={() => Linking.openURL(meal.strSource)}>
            <Text style={styles.link}>🌐 See original source</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "brown",
    marginBottom: 10,
    textAlign: "center",
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
    color: "#555",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#8B4513",
  },
  ingredient: {
    fontSize: 16,
    color: "#333",
    marginBottom: 2,
  },
  instructions: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
});
