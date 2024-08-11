import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../../theme';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    color: theme.bg(0.9),
    fontWeight: '700',
    alignSelf: 'center',
    marginVertical: 5,
  },
  image: {
    height: Dimensions.get('window').height * 0.45,
    width: Dimensions.get('window').width,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  date: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 10,
    width: windowWidth * 0.9,
    borderWidth: 1,
    borderRadius: 10,
  },
  check_in: {
    marginLeft: 20,
    borderRightWidth: 1,
    alignItems: 'center',
    flex: 1,
  },
  check_out: {
    marginRight: 20,
    flex: 1,
    alignItems: 'center',
  },
  check_in_text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  check_out_text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  price: {
    marginBottom: 10,
    fontSize: 25,
    color: '#000',
    fontWeight: '500',
    marginLeft: 10,
  },
  featuresContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  featureContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  featureIcon: {
    color: 'black',
    marginHorizontal: 5,
  },
  featureName: {
    fontSize: 18,
    color: 'black',
  },
  visitor: {
    fontSize: 20,
    marginLeft: 12,
    color: '#000',
    marginTop: 5,
  },
  map: {
    marginTop: 15,
    height: Dimensions.get('window').height / 3,
  },
  Button: {
    width: windowWidth * 0.6,
    backgroundColor: theme.bg(0.9),
    justifyContent: 'center',
    height: Dimensions.get('window').height / 13,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    marginRight: 5,
  },
  button_text: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
  },
  total_price: {
    width: windowWidth * 0.4,
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
  },

  personCountContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  personCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  personText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    fontSize: 20,
    color: '#000',
  },
  counterNumber: {
    fontSize: 18,
    marginHorizontal: 10,
    color: 'black',
  },
});
