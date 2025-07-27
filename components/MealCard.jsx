import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { incrementVisitCount } from "../lib/visitTracker";
import { useNavigation } from "@react-navigation/native";

export function MealCard({ meal, score }) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768; // puedes ajustar este valor

  useEffect(() => {
    if (meal?.idMeal) {
      incrementVisitCount(meal.idMeal);
    }
  }, [meal?.idMeal]);

  const dynamicStyles = {
    image: {
      width: "100%",
      height: isLargeScreen ? 250 : 180,
      borderRadius: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: isLargeScreen ? 24 : 20,
    },
    area: {
      fontSize: isLargeScreen ? 18 : 16,
    },
    instructions: {
      fontSize: isLargeScreen ? 18 : 16,
    },
    counter: {
      fontSize: isLargeScreen ? 18 : 16,
    },
    card: {
      paddingHorizontal: isLargeScreen ? 32 : 16,
    },
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("MealDetail", { meal })}
      style={[styles.card, dynamicStyles.card]}
    >
      <Image source={{ uri: meal.strMealThumb }} style={dynamicStyles.image} />
      <Text style={[styles.title, dynamicStyles.title]}>{meal.strMeal}</Text>
      <Text style={[styles.area, dynamicStyles.area]}>{meal.strArea}</Text>
      <Text
        style={[styles.instructions, dynamicStyles.instructions]}
        numberOfLines={5}
      >
        {meal.strInstructions}
      </Text>
      <Text style={[styles.counter, dynamicStyles.counter]}>
        Views: {score}
      </Text>
    </Pressable>
  );
}

export function AnimatedMealCard({ meal, score, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 700,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <MealCard meal={meal} score={score} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 55,
    backgroundColor: "#F0BF7C",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "brown",
    textAlign: "center",
  },
  area: {
    color: "#F07114",
    marginBottom: 5,
  },
  instructions: {
    color: "brown",
    marginTop: 8,
  },
  counter: {
    color: "#F07114",
    marginTop: 5,
    fontWeight: "bold",
  },
});
