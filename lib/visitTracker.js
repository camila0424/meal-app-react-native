import AsyncStorage from "@react-native-async-storage/async-storage";

// Incrementa el contador de visitas para una receta
export async function incrementVisitCount(idMeal) {
  const key = `visits_${idMeal}`;
  const current = await AsyncStorage.getItem(key);
  const newCount = current ? parseInt(current) + 1 : 1;
  await AsyncStorage.setItem(key, newCount.toString());
}

// Obtiene el número de visitas actuales
export async function getVisitCount(idMeal) {
  const key = `visits_${idMeal}`;
  const count = await AsyncStorage.getItem(key);
  return count ? parseInt(count) : 0;
}
