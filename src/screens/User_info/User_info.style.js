const {StyleSheet} = require('react-native');
import { theme } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgb(245,245,245)',
  },
  inputContainer: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 60,
  },
  icon: {
    marginRight: 8,
    marginLeft: 5,
  },
  input: {
    width: '100%',
    fontWeight: '500',
    fontSize: 18,
  },
  inputLabel: {
    marginBottom: 5,
    color: 'gray',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: 'black',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: theme.bg(1),
    borderWidth:0.5,
    borderRadius:10
  },
  buttonText: {
    textAlign: 'center',
    lineHeight: 50,
    fontSize:28,
    fontWeight:"400",
    color:"black"
  },
});
