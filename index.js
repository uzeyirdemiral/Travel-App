/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigation/index';
import {name as appName} from './app.json';
import ReservationSuccess from './src/components/Reservation/ReservationSuccess';

AppRegistry.registerComponent(appName, () => App);
