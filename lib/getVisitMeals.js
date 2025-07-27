import { getVisitCount } from "@/utils/visitTracker";

export async function getLatestMeals() {
  const LATEST_MEALS =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken";

  const rawData = await fetch(LATEST_MEALS);
  const json = await rawData.json();

  const { meals } = json;

  if (!meals) return [];

  const results = await Promise.all(
    meals.map(async (meal) => {
      const {
        strMeal: title,
        strInstructions: description,
        strMealThumb,
        idMeal,
      } = meal;

      const score = await getVisitCount(idMeal);
      const slug = title.toLowerCase().replace(/\s+/g, "-");

      return {
        description,
        score,
        slug,
        title,
        image: strMealThumb,
      };
    })
  );

  return results;
}
