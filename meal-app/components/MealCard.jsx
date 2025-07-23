import { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Pressable,
} from "react-native";
import { incrementVisitCount } from "../lib/visitTracker";
import { useNavigation } from "@react-navigation/native";

export function MealCard({ meal, score }) {
  const navigation = useNavigation();

  useEffect(() => {
    if (meal?.idMeal) {
      incrementVisitCount(meal.idMeal);
    }
  }, [meal?.idMeal]);

  return (
    <Pressable
      onPress={() => navigation.navigate("MealDetail", { meal })}
      style={styles.card}
    >
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.area}>{meal.strArea}</Text>
      <Text style={styles.instructions} numberOfLines={5}>
        {meal.strInstructions}
      </Text>
      <Text style={styles.counter}>Views: {score}</Text>
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
    paddingHorizontal: 16,
    backgroundColor: "#F0BF7C",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "brown",
    textAlign: "center",
  },
  area: {
    fontSize: 16,
    marginBottom: 5,
    color: "#F07114",
  },
  instructions: {
    fontSize: 16,
    color: "brown",
    marginTop: 8,
  },
  counter: {
    fontSize: 16,
    color: "#F07114",
    marginTop: 5,
    fontWeight: "bold",
  },
});
