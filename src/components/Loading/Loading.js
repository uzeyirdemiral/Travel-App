import React from 'react';
import LottieView from 'lottie-react-native';
import {Dimensions} from 'react-native';

function Loading() {
  return (
    <LottieView
      style={{
        flex: 1,
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width / 2,
        alignSelf: 'center',
      }}
      source={require('../../../assets/Loading.json')}
      autoPlay
      loop
    />
  );
}

export default Loading;
