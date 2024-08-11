import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LinearGradient} from 'react-native-linear-gradient';
import {HeartIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import styles from './destinations.style';
import axios from 'axios';
import {API_URL} from '@env';

export default function Destinations({
  selectedCategory,
  searchQuery,
  favorites,
  onToggleFavorite,
  activeSort,
}) {
  const navigation = useNavigation();

  const [allDestinations, setAllDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setAllDestinations(response.data);
        setFilteredDestinations(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allDestinations;
    if (selectedCategory) {
      filtered = filtered.filter(
        destination => destination.category === selectedCategory,
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        destination =>
          destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          destination.shortDescription
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    if (activeSort === 'Popular') {
      if (selectedCategory) {
        filtered = favorites.filter(
          destination => destination.category === selectedCategory,
        );
      } else {
        filtered = favorites;
      }
    }

    setFilteredDestinations(filtered);
  }, [selectedCategory, searchQuery, activeSort, favorites, allDestinations]);

  return (
    <View style={styles.container}>
      {filteredDestinations.map((item, index) => {
        const isFavourite = favorites.some(fav => fav._id === item._id);
        return (
          <DestinationCard
            navigation={navigation}
            item={item}
            key={index}
            isFavourite={isFavourite}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
    </View>
  );
}

const DestinationCard = ({item, navigation, isFavourite, onToggleFavorite}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Destination', {...item})}
      style={[{width: wp(44), height: wp(65)}, styles.destination]}>
      <Image
        source={{
          uri: `${API_URL}/uploads/${item.imageUrl}`,
        }}
        style={[
          {width: wp(44), height: wp(65), borderRadius: 35},
          styles.des_image,
        ]}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={[
          {
            width: wp(44),
            height: hp(15),
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
          },
          styles.des_linear,
        ]}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
      />
      <TouchableOpacity
        onPress={() => onToggleFavorite(item)}
        style={[{backgroundColor: 'rgba(255,255,255,0.4)'}, styles.des_button]}>
        <HeartIcon size={wp(5)} color={isFavourite ? 'red' : 'white'} />
      </TouchableOpacity>
      <Text style={[{fontSize: wp(4)}, styles.des_title]}>{item.title}</Text>
      <Text style={[{fontSize: wp(2.2)}, styles.des_description]}>
        {item.shortDescription}
      </Text>
    </TouchableOpacity>
  );
};
