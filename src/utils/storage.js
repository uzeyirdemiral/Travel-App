
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites from AsyncStorage:', error);
    return [];
  }
};

export const saveFavorites = async favorites => {
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to AsyncStorage:', error);
  }
};
