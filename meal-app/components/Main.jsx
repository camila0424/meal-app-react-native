import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getVisitCount } from "../lib/visitTracker";
import { MealCard } from "./MealCard";
import { FilteredForm } from "./form/FilteredForm";

export function Main() {
  const [meals, setMeals] = useState([]);
  const [visits, setVisits] = useState({});
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  // Cargar comidas según categoría
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const url = category
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken";

      try {
        const res = await fetch(url);
        const data = await res.json();
        const mealsArray = data.meals || [];

        // Obtener visitas de cada receta
        const visitsObj = {};
        await Promise.all(
          mealsArray.map(async (meal) => {
            const count = await getVisitCount(meal.idMeal);
            visitsObj[meal.idMeal] = count;
          })
        );

        setMeals(mealsArray);
        setVisits(visitsObj);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [category]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#F0BF7C",
      }}
    >
      <FilteredForm onCategoryChange={(cat) => setCategory(cat)} />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="brown"
          style={{ marginTop: 20 }}
        />
      ) : meals.length === 0 ? (
        <Text style={styles.empty}>No meals found.</Text>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(meal) => meal.idMeal}
          contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <MealCard meal={item} score={visits[item.idMeal] || 0} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: "center",
    color: "brown",
    fontSize: 18,
    marginTop: 40,
  },
});
