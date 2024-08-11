import React from 'react';
import {
  ImageBackground,
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './Login.style';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçersiz email formatı')
    .required('Email gereklidir'),
  password: yup.string().required('Parola gereklidir'),
});

function Login() {
  const navigation = useNavigation();
  const initialValues = {
    email: '',
    password: '',
  };
  const handleSubmit = async values => {
    try {
      const response = await axios.post(`${API_URL}/auths/login`, values);
      const {token} = response.data;

      if (response.status === 200) {
        await AsyncStorage.setItem('token', token);
        // navigation.navigate('Home');
        // navigation.navigate('MainStack', {screen: 'Home'});
        console.log(token);

        // Kullanıcı bilgilerini almak için yeni bir API çağrısı yap
        const userResponse = await axios.get(`${API_URL}/auths/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Token ile kimlik doğrulama
          },
        });
        const userData = userResponse.data; // Kullanıcı bilgileri

        // Kullanıcı bilgilerini sakla
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        // navigation.navigate('Home');
        // navigation.navigate('MainStack', {screen: 'Home'});
        console.log(userData);
      } else {
        console.error('Sunucu hatası:', response.data);
      }
    } catch (error) {
      if (error.response) {
        // Sunucu, 200 aralığı dışında bir durum kodu ile yanıt verdi
        console.error('Sunucu hatası:', error.response.data);
      } else if (error.request) {
        // İstek yapıldı ama yanıt alınamadı
        console.error('Ağ hatası:', error.request);
      } else {
        // İsteğin ayarlanması sırasında bir hata oluştu
        console.error('İstek hatası:', error.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/Login.png')}
        style={styles.image}
        resizeMode="cover">
        <KeyboardAvoidingView enabled style={styles.body}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <>
                <Input
                  placeholder={'Email'}
                  customInput={styles.input}
                  placeholderColor="white"
                  iconName="account"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={touched.email && errors.email}
                  inputMode={'email'}
                />
                <Input
                  placeholder={'Şifre'}
                  customInput={styles.input}
                  placeholderColor="white"
                  iconName="key"
                  isSecure
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={touched.password && errors.password}
                />
                <Button
                  name={'GİRİŞ'}
                  customButton={styles.button}
                  customTexT={styles.text}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
          <View style={styles.member_text}>
            <Text style={{color: 'white'}}>Hala Üye Değil misiniz?</Text>
            <TouchableOpacity
              style={styles.linkText}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Üye Ol</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

export default Login;
