import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ReservationSuccess() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/success.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>Rezervasyon Oluşturuldu!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: wp(80),
    height: hp(40),
  },
  text: {
    fontSize: wp(6),
    fontWeight: 'bold',
    marginTop: hp(2),
    color: 'black',
  },
});
