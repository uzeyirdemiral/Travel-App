import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './User_profile.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';

const User_profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [isImageError, setIsImageError] = useState(false);

  // AsyncStorage'den kullanıcı bilgilerini al
  const fetchUserData = async () => {
    try {
      const jsonUserData = await AsyncStorage.getItem('userData');
      if (jsonUserData) {
        const parsedUserData = JSON.parse(jsonUserData);
        // console.log('Parsed User Data:', parsedUserData); // Kullanıcı bilgilerini console'da görüntüle

        // Giriş yapan kullanıcının token'ını al
        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
          // Kullanıcı dizisini döngüye al ve token'ı eşleşen kullanıcıyı bul
          const loggedInUser = parsedUserData.find(
            user => user.token === userToken,
          );
          // console.log('Logged In User:', loggedInUser); // Giriş yapan kullanıcının bilgilerini görüntüle
          setUserData(loggedInUser); // Giriş yapan kullanıcının bilgilerini state'e set et
        }
      }
    } catch (error) {
      console.error('Kullanıcı bilgilerini alma hatası:', error);
    }
  };

  useEffect(() => {
    fetchUserData();

    const intervalId = setInterval(fetchUserData, 1000); // Her 1 saniyede bir kullanıcı bilgilerini güncelle

    return () => clearInterval(intervalId); // Bileşen unmount olduğunda interval'ı temizle
  }, []);

  useEffect(() => {
    setIsImageError(false); // Her seferinde userData değiştiğinde resim hatasını sıfırla
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      /*  navigation.navigate('Login'); */
      // navigation.navigate('AuthStack', {screen: 'Login'});
    } catch (error) {
      console.error('Çıkış yapma hatası:', error);
    }
  };

  const handleImageError = () => {
    setIsImageError(true);
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: theme.bg(0.9),
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          marginBottom: 25,
        }}>
        <TouchableOpacity style={styles.info_container}>
          <Image
            source={
              isImageError || !userData
                ? require('./../../../assets/images/avatar.png')
                : {
                    uri: `${API_URL}/uploads/${userData.profileImage}`,
                  }
            }
            style={{width: 80, height: 80, borderRadius: 100}}
            onError={handleImageError}
          />
          <View style={styles.user_info}>
            <Text style={styles.user_text1}>
              {userData ? userData.fullName : ''}
            </Text>
            <Text style={styles.user_text2}>
              {userData ? userData.email : ''}
            </Text>
          </View>
          <Icon name="chevron-right" size={50} color="rgb(64,64,64)" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.my_account}
          onPress={() => navigation.navigate('UserInfo')}>
          <Text style={styles.my_account_text}>Kişisel Bilgilerim</Text>
          <Icon
            name="chevron-right"
            size={50}
            color={theme.text}
            style={styles.Icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.my_account}
          onPress={() => {
            navigation.navigate('About');
          }}>
          <Text style={styles.my_account_text}>Hakkında</Text>
          <Icon
            name="chevron-right"
            size={50}
            color={theme.text}
            style={styles.Icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.my_account}
          onPress={() => {
            navigation.navigate('Help');
          }}>
          <Text style={styles.my_account_text}>Yardım</Text>
          <Icon
            name="chevron-right"
            size={50}
            color={theme.text}
            style={styles.Icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.my_account}>
          <Text style={styles.my_account_text}>Çıkış</Text>
          <Icon
            name="chevron-right"
            size={50}
            color={theme.text}
            style={styles.Icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default User_profile;
