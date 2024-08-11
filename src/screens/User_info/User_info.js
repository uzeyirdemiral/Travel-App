import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import styles from './User_info.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const User_info = () => {
  const [userData, setUserData] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
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
            console.log('Logged In User:', loggedInUser); // Giriş yapan kullanıcının bilgilerini görüntüle
            setUserData(loggedInUser); // Giriş yapan kullanıcının bilgilerini state'e set et
            setFullName(loggedInUser.fullName);
            setEmail(loggedInUser.email);
            setPhoneNumber(loggedInUser.phoneNumber);
            setBirthDate(formatDate(loggedInUser.birthDate));
            setProfileImage(loggedInUser.profileImage);
          }
        }
      } catch (error) {
        console.error('Kullanıcı bilgilerini alma hatası:', error);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay değeri 0'dan başladığı için 1 eklenir
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleImagePicker = () => {
    const options = {
      title: 'Profil Fotoğrafı Seç',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Kullanıcı seçimi iptal etti');
      } else if (response.error) {
        console.log('Fotoğraf seçilirken bir hata oluştu:', response.error);
      } else {
        const uri = response.assets[0].uri;
        setProfileImage(uri);
      }
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('birthDate', birthDate);
    if (profileImage) {
      const uriParts = profileImage.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('profileImage', {
        uri: profileImage,
        name: `profile.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const userId = userData ? userData._id : null;
      console.log(userData._id);
      if (userId) {
        const response = await axios.put(
          `${API_URL}/auths/update/${userId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        // Backend'den gelen güncel veriyi AsyncStorage'e kaydet
        const updatedUserData = response.data;
        const jsonUserData = await AsyncStorage.getItem('userData');
        if (jsonUserData) {
          const parsedUserData = JSON.parse(jsonUserData);
          const newUserData = parsedUserData.map(user =>
            user._id === userId ? updatedUserData : user,
          );
          await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
          setUserData(updatedUserData); // State'i güncelle
        }
        Alert.alert(
          'Başarılı',
          'Bilgileriniz başarıyla güncellendi!',
          [{text: 'Tamam'}],
          {cancelable: false},
        );
        console.log('Güncelleme başarılı:', response.data);
      } else {
        console.error('Kullanıcı ID bulunamadı');
      }
    } catch (error) {
      if (error.response) {
        // Sunucu yanıtı ile ilgili bir hata var
        console.error('Güncelleme sırasında hata oluştu:', error.response.data);
      } else {
        // Başka tür bir hata
        console.error('Güncelleme sırasında hata oluştu:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePicker}>
        {profileImage ? (
          <Image
            source={{uri: `${API_URL}/uploads/${profileImage}`}}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text>Profil Fotoğrafı Yükle</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.inputLabel}>Ad Soyad</Text>
      <View style={styles.inputContainer}>
        <Icon name="account" size={30} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
      </View>
      <Text style={styles.inputLabel}>E-Posta</Text>
      <View style={styles.inputContainer}>
        <Icon name="email" size={30} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <Text style={styles.inputLabel}>Telefon Numarası</Text>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={30} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
      </View>
      <Text style={styles.inputLabel}>Doğum Tarihi</Text>
      <View style={styles.inputContainer}>
        <Icon
          name="calendar-month"
          size={30}
          color="black"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={birthDate}
          onChangeText={text => setBirthDate(text)}
          keyboardType="numeric"
          // placeholder="YYYY-MM-DD formatında girin"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User_info;
