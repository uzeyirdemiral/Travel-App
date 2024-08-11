import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {sortCategoryData} from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../theme';
import styles from './sortCategories.style';

export default function SortCategories({activeSort, onSortChange}) {
  return (
    <View style={styles.container}>
      {sortCategoryData.map((sort, index) => {
        let isActive = sort == activeSort;
        let activeButtonClass = isActive ? styles.button_active : '';
        return (
          <TouchableOpacity
            onPress={() => onSortChange(sort)}
            key={index}
            style={[styles.sort_button, activeButtonClass]}>
            <Text
              style={[
                {
                  fontSize: wp(4),
                  color: isActive ? theme.text : 'rgba(0,0,0,0.6)',
                },
                styles.sort_title,
              ]}>
              {sort}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
