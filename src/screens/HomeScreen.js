import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import SortCategories from '../components/sortCategories';
import Destinations from '../components/destinations';
import styles from './HomeScreen.style';
import {getFavorites, saveFavorites} from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const ios = Platform.OS == 'ios';
const topMargin = ios ? {marginTop: 3} : {marginTop: 10};
export default function HomeScreen({navigation}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [activeSort, setActiveSort] = useState('All');
  const [userData, setUserData] = useState(null);
  const [isImageError, setIsImageError] = useState(false);

  const fetchUserData = async () => {
    try {
      const jsonUserData = await AsyncStorage.getItem('userData');
      if (jsonUserData) {
        const parsedUserData = JSON.parse(jsonUserData);

        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
          const loggedInUser = parsedUserData.find(
            user => user.token === userToken,
          );
          setUserData(loggedInUser);
        }
      }
    } catch (error) {
      console.error('Kullanıcı bilgilerini alma hatası:', error);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    };

    loadFavorites();
  }, []);
  useEffect(() => {
    fetchUserData();

    const intervalId = setInterval(fetchUserData, 1000); // Her 1 saniyede bir kullanıcı bilgilerini güncelle

    return () => clearInterval(intervalId); // Bileşen unmount olduğunda interval'ı temizle
  }, []);

  useEffect(() => {
    setIsImageError(false);
  }, []);

  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  const handleToggleFavorite = async item => {
    const isFav = favorites.some(fav => fav._id === item._id);
    let updatedFavorites = [];

    if (isFav) {
      updatedFavorites = favorites.filter(fav => fav._id !== item._id);
    } else {
      updatedFavorites = [...favorites, item];
    }

    setFavorites(updatedFavorites);
    await saveFavorites(updatedFavorites);
  };

  const handleSortChange = sort => {
    setActiveSort(sort);
  };

  const handleImageError = () => {
    setIsImageError(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.home_scroll, topMargin]}>
        {/* avatar */}
        <View style={styles.avatar}>
          <Text style={[{fontSize: wp(7)}, styles.avatar_text]}>
            Let's Discover
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={
                isImageError || !userData
                  ? require('../../assets/images/avatar.png')
                  : {
                      uri: `${API_URL}/uploads/${userData.profileImage}`,
                    }
              }
              style={{height: wp(12), width: wp(12), borderRadius: 50}}
              onError={handleImageError}
            />
          </TouchableOpacity>
        </View>

        {/* search bar */}
        <View style={styles.search_bar}>
          <View style={styles.search_container}>
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder="Search destination"
              placeholderTextColor={'gray'}
              style={styles.search_input}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
        </View>

        {/* categories */}
        <View style={styles.categories}>
          <Categories
            onCategoryPress={handleCategoryPress}
            selectedCategory={selectedCategory}
          />
        </View>

        {/* sort categories */}
        <View style={styles.categories}>
          <SortCategories
            activeSort={activeSort}
            onSortChange={handleSortChange}
          />
        </View>

        {/* destinations */}
        <View>
          <Destinations
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            activeSort={activeSort}
          />
        </View>
      </ScrollView>
    </View>
  );
}
