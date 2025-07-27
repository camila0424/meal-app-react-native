import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
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
  const { width } = useWindowDimensions();

  const isLargeScreen = width > 768; //A partir de aquí se aplican 3 columnas-----

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const url = category
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken";

      try {
        const res = await fetch(url);
        const data = await res.json();
        const basicMeals = data.meals || [];

        const fullMeals = await Promise.all(
          basicMeals.map(async (meal) => {
            const detailRes = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            const detailData = await detailRes.json();
            return detailData.meals[0];
          })
        );

        const visitsObj = {};
        await Promise.all(
          fullMeals.map(async (meal) => {
            const count = await getVisitCount(meal.idMeal);
            visitsObj[meal.idMeal] = count;
          })
        );

        setMeals(fullMeals);
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
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40,
            paddingHorizontal: 16,
          }}
        >
          <View style={[styles.grid, isLargeScreen && styles.gridLarge]}>
            {meals.map((item) => (
              <View
                key={item.idMeal}
                style={[styles.cardWrapper, isLargeScreen && styles.cardLarge]}
              >
                <MealCard meal={item} score={visits[item.idMeal] || 0} />
              </View>
            ))}
          </View>
        </ScrollView>
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
  grid: {
    flexDirection: "column",
    gap: 16,
  },
  gridLarge: {
    flexDirection: "row", // activa el layout horizontal---------
    flexWrap: "wrap", // permite múltiples filas-----------
    justifyContent: "space-between",
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 24,
  },
  cardLarge: {
    width: "31%", //  fuerza 3 columnas (3 * 31% + espacio)-------------
    minWidth: 220,
  },
});
