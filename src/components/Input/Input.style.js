import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    color: 'white',
  },
  icon: {
    alignSelf: 'center',
    marginRight: 10,
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    // marginTop: 3,
    marginLeft: 18,
  },
});
