import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ClockIcon, MapPinIcon, SunIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../theme';
import styles from './DestinationScreen.style';
import {
  requestLocationPermission,
  getCurrentLocation,
} from '../services/locationService';
import {getDistance} from 'geolib';
import {API_URL} from '@env';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : {marginTop: 10};

export default function DestinationScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
          const location = await getCurrentLocation();
          setCurrentLocation(location);
          if (location && item.latitude && item.longitude) {
            const distance = getDistance(
              {latitude: location.latitude, longitude: location.longitude},
              {latitude: item.latitude, longitude: item.longitude},
            );
            setDistance((distance / 1000).toFixed(2)); // Distance in kilometers
          }
        } else {
          console.log('Konum izni reddedildi');
        }
      } catch (error) {
        console.error('Konum alma hatası:', error);
      }
    };

    fetchLocation();
  }, [item]);

  useEffect(() => {
    console.log('Current Location:', currentLocation);
    console.log('Distance:', distance);
  }, [currentLocation, distance]);

  const handleBooking = () => {
    navigation.navigate('BookingPage', {item});
  };

  return (
    <View style={styles.container}>
      {/* destination image */}
      <Image
        source={{
          uri: `${API_URL}/uploads/${item.imageUrl}`,
        }}
        style={{width: wp(100), height: hp(55)}}
      />

      <View
        style={[
          {borderTopLeftRadius: 40, borderTopRightRadius: 40},
          styles.booking_container,
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.booking_scroll}>
          <View style={styles.booking_div}>
            <Text style={[{fontSize: wp(7)}, styles.booking_title]}>
              {item?.title}
            </Text>
            <Text
              style={[
                {fontSize: wp(7), color: theme.text},
                styles.booking_price,
              ]}>
              $ {item?.price}
            </Text>
          </View>
          <Text style={[{fontSize: wp(3.7)}, styles.booking_description]}>
            {item?.longDescription}
          </Text>
          <View style={styles.info_div}>
            <View style={styles.info_div2}>
              <ClockIcon size={wp(7)} color="skyblue" />
              <View style={styles.info_div3}>
                <Text style={[{fontSize: wp(4.5)}, styles.info_text]}>
                  {item.duration}
                </Text>
                <Text style={styles.info_text2}>Duration</Text>
              </View>
            </View>
            <View style={styles.info_div2}>
              <MapPinIcon size={wp(7)} color="#f87171" />
              <View style={styles.info_div3}>
                <Text style={[{fontSize: wp(4.5)}, styles.info_text]}>
                  {distance ? `${distance} km` : 'Calculating...'}
                </Text>
                <Text style={styles.info_text2}>Distance</Text>
              </View>
            </View>
            <View style={styles.info_div2}>
              <SunIcon size={wp(7)} color="orange" />
              <View style={styles.info_div3}>
                <Text style={[{fontSize: wp(4.5)}, styles.info_text]}>
                  {item.weather}
                </Text>
                <Text style={styles.info_text2}>Sunny</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleBooking}
          style={[
            {
              backgroundColor: theme.bg(0.8),
              height: wp(15),
              width: wp(50),
            },
            styles.booking_button,
          ]}>
          <Text style={[{fontSize: wp(5.5)}, styles.booking_button_text]}>
            Book now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
