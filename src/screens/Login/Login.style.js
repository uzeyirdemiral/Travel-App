import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    width: Dimensions.get('screen').width / 2,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'white',
  },
  input: {
    height: Dimensions.get('screen').height / 17,
    paddingLeft: 5,
    margin: 10,
    marginHorizontal: 15,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  member_text: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  linkText: {
    paddingLeft: 10,
  },
});
