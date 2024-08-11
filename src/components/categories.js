import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../theme';
import styles from './categories.style';
import axios from 'axios';
import {API_URL} from '@env';

export default function Categories({onCategoryPress, selectedCategory}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(` ${API_URL}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, {fontSize: wp(4)}]}>Categories</Text>
        <TouchableOpacity onPress={() => onCategoryPress(null)}>
          <Text style={{fontSize: wp(4), color: theme.text}}>Clear</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 15}}
        style={styles.cat_scrool}
        showsHorizontalScrollIndicator={false}>
        {categories.map((cat, index) => {
          const isSelected = cat.name === selectedCategory;
          return (
            <TouchableOpacity
              key={index}
              style={styles.cat_data}
              onPress={() => onCategoryPress(cat.name)}>
              <Image
                source={{
                  uri: `${API_URL}/uploads/${cat.imageUrl}`,
                }}
                style={[
                  styles.cat_image,
                  {width: wp(20), height: wp(19)},
                  isSelected && styles.selectedCat,
                ]}
              />
              <Text style={[styles.cat_text, {fontSize: wp(3)}]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
