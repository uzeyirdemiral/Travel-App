import React from 'react';
import {ImageBackground, View, KeyboardAvoidingView, Alert} from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './Sıgn_up.style';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {API_URL} from '@env';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçersiz email formatı')
    .required('Email gereklidir'),
  password: yup
    .string()
    .min(8, 'Parola en az 8 karakter olmalıdır')
    .required('Parola gereklidir'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Parolalar eşleşmiyor')
    .required('Parolayı doğrulayın'),
});

function Sıgn_up({navigation}) {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async values => {
    console.log(values);
    try {
      const response = await axios.post(`${API_URL}/auths/register`, values);

      if (response.status === 200) {
        Alert.alert(
          'Kayıt Başarılı',
          'Başarıyla kayıt oldunuz. Şimdi giriş yapabilirsiniz.',
          [
            {
              text: 'Tamam',
              onPress: () => navigation.navigate('Login'),
            },
          ],
        );
      } else {
        console.error('Sunucu hatası:', response.data);
      }
    } catch (error) {
      console.error('İstek hatası:', error);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/beach-sunset-thailand.jpg')}
        style={styles.image}
        resizeMode="cover">
        <KeyboardAvoidingView enabled style={styles.body}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              values,
              handleSubmit,
              handleBlur,
              errors,
              touched,
            }) => (
              <>
                <Input
                  placeholder={'Email'}
                  customInput={styles.input}
                  placeholderColor="white"
                  iconName="account"
                  costumIcon={styles.icon}
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
                  costumIcon={styles.icon}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={touched.password && errors.password}
                />
                <Input
                  placeholder={'Tekrar Şifre'}
                  customInput={styles.input}
                  placeholderColor="white"
                  iconName="key"
                  isSecure
                  costumIcon={styles.icon}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  error={touched.confirmPassword && errors.confirmPassword}
                />
                <Button
                  name={'KAYDOL'}
                  customButton={styles.button}
                  customTexT={styles.text}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

export default Sıgn_up;
