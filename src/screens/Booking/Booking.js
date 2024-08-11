import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './Booking.style';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL} from '@env';

function Booking({route}) {
  const {item} = route.params;

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [isCheckInDatePickerVisible, setCheckInDatePickerVisibility] =
    useState(false);
  const [isCheckOutDatePickerVisible, setCheckOutDatePickerVisibility] =
    useState(false);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 1);
  useEffect(() => {
    // Uygulama başlatıldığında çıkış tarihini bir sonraki güne ayarla
    setCheckOutDate(nextDay);
  }, []);

  const handleReservation = () => {
    Alert.alert(
      'Rezervasyon Oluşturuldu',
      'Rezervasyonunuz başarıyla oluşturulmuştur.',
      [{text: 'Tamam', onPress: () => console.log('Alert closed')}],
    );
  };

  const showCheckInDatePicker = () => {
    setCheckInDatePickerVisibility(true);
  };

  const hideCheckInDatePicker = () => {
    setCheckInDatePickerVisibility(false);
  };

  const handleCheckInDateConfirm = selectedDate => {
    hideCheckInDatePicker();
    setCheckInDate(selectedDate);
  };

  const showCheckOutDatePicker = () => {
    setCheckOutDatePickerVisibility(true);
  };

  const hideCheckOutDatePicker = () => {
    setCheckOutDatePickerVisibility(false);
  };

  const handleCheckOutDateConfirm = selectedDate => {
    hideCheckOutDatePicker();
    setCheckOutDate(selectedDate);
  };
  const incrementAdults = () => {
    setAdults(adults + 1);
  };

  const decrementAdults = () => {
    if (adults > 1) {
      setAdults(adults - 1);
    }
  };

  const incrementChildren = () => {
    setChildren(children + 1);
  };

  const decrementChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  const renderFeatures = () => {
    console.log('Item Features:', item.features); // Debug
    return item.features.map((feature, index) => (
      <View key={index} style={styles.featureContainer}>
        <Icon name={feature.icon} size={30} style={styles.featureIcon} />
        <Text style={styles.featureName}>{feature.name}</Text>
      </View>
    ));
  };
  console.log(renderFeatures);

  const calculatePrice = () => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(checkInDate);
    const secondDate = new Date(checkOutDate);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    const totalPrice = item.price * diffDays * (adults + children * 0.5);

    return totalPrice;
  };

  useEffect(() => {
    calculatePrice();
  }, [adults, children, checkInDate, checkOutDate]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          source={{
            uri: `${API_URL}/uploads/${item.imageUrl}`,
          }}
          resizeMode="cover"
          style={styles.image}></Image>
        <Text style={styles.price}>$ {item.price} Gece</Text>
        <View style={styles.featuresContainer}>{renderFeatures()}</View>
        <View style={styles.personCountContainer}>
          <View style={styles.personCount}>
            <Text style={styles.personText}>Yetişkin</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={decrementAdults}
                style={styles.counterButton}>
                <Icon name="minus" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.counterNumber}>{adults}</Text>
              <TouchableOpacity
                onPress={incrementAdults}
                style={styles.counterButton}>
                <Icon name="plus" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.personCount}>
            <Text style={styles.personText}>Çocuk</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={decrementChildren}
                style={styles.counterButton}>
                <Icon name="minus" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.counterNumber}>{children}</Text>
              <TouchableOpacity
                onPress={incrementChildren}
                style={styles.counterButton}>
                <Icon name="plus" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.date}>
          <View style={styles.check_in}>
            <Text style={styles.check_in_text}>Giriş</Text>
            <Text
              style={{fontSize: 20, color: '#000'}}
              onPress={showCheckInDatePicker}>
              {checkInDate.toLocaleDateString()}
            </Text>
            <DateTimePicker
              isVisible={isCheckInDatePickerVisible}
              mode="date"
              onConfirm={handleCheckInDateConfirm}
              onCancel={hideCheckInDatePicker}
              minimumDate={today}
            />
          </View>
          <View style={styles.check_out}>
            <Text style={styles.check_out_text}>Çıkış</Text>
            <Text
              style={{fontSize: 20, color: '#000'}}
              onPress={showCheckOutDatePicker}>
              {checkOutDate.toLocaleDateString()}
            </Text>
            <DateTimePicker
              isVisible={isCheckOutDatePickerVisible}
              mode="date"
              onConfirm={handleCheckOutDateConfirm}
              onCancel={hideCheckOutDatePicker}
              minimumDate={nextDay}
            />
          </View>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            title={item.title}
            description={item.shortDescription}
          />
        </MapView>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'rgb(245,245,245)',
          alignItems: 'center',
        }}>
        <Text style={styles.total_price}>Toplam Fiyat ${calculatePrice()}</Text>
        <TouchableOpacity style={styles.Button} onPress={handleReservation}>
          <Text style={styles.button_text}>Rezerve edin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Booking;
