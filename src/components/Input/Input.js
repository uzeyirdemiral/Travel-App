import React from 'react';
import {View, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Input.style';

function Input({
  placeholder,
  onChangeText,
  onBlur,
  value,
  isSecure,
  iconName,
  customInput,
  placeholderColor,
  costumIcon,
  error,
  inputMode,
}) {
  return (
    <View style={{flex: 1}}>
      <View style={[styles.container, customInput]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          secureTextEntry={isSecure}
          style={styles.text}
          inputMode={inputMode}
        />
        <Icon name={iconName} size={25} style={[styles.icon, costumIcon]} />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default Input;
