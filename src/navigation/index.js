import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DestinationScreen from '../screens/DestinationScreen';
import Login from '../screens/Login/Login';
import Booking from '../screens/Booking/Booking';
import SignUp from '../screens/Sıgn_up/Sıgn_up';
import UserProfile from '../screens/User_profile/User_profile';
import UserInfo from '../screens/User_info/User_info';
import Loading from '../components/Loading/Loading';
import About from '../screens/About/About';
import Help from '../screens/Help/Help';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={UserProfile} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Destination" component={DestinationScreen} />
      <Stack.Screen name="BookingPage" component={Booking} />
    </Stack.Navigator>
  );
}

function AppNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('AsyncStorage error:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const checkTokenOnChange = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(token ? true : false);
    };

    const intervalId = setInterval(checkTokenOnChange, 1000); // Her 1 saniyede bir token kontrolü yapar

    return () => clearInterval(intervalId); // Temizlik işlemi
  }, []);

  if (isLoggedIn === null) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="MainStack" component={MainStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
