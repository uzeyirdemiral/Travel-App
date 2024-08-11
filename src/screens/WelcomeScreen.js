import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LinearGradient} from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../theme';
import styles from './WelcomeScreen.style';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* background image */}
      <Image
        source={require('../../assets/images/welcome.png')}
        style={styles.welcome_image}
      />

      {/* content & gradient */}
      <View style={styles.content}>
        <LinearGradient
          colors={['transparent', 'rgba(3,105,161,0.8)']}
          style={[{width: wp(100), height: hp(60)}, styles.content_linear]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
        />
        <View style={styles.content_div}>
          <Text style={[{fontSize: wp(10)}, styles.div_text1]}>
            Traveling made easy!
          </Text>
          <Text style={[{fontSize: wp(4)}, styles.div_text2]}>
            Experience the world's best adventure around the world with us
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[{backgroundColor: theme.bg(1)}, styles.button]}>
          <Text style={[{fontSize: wp(5.5)}, styles.button_text]}>
            Let's go!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
