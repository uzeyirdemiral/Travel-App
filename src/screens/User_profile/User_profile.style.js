import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../../theme';

export default StyleSheet.create({
    
  info_container: {
    backgroundColor: 'rgb(245,245,245)',
    height: Dimensions.get('window').height / 5,
    margin: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_info: {
    flex: 3,
    marginLeft: 30,
    alignItems: 'center',
  },
  user_text1: {
    fontWeight: '500',
    fontSize: 25,
    color: "rgb(64,64,64)",
  },
  user_text2: {
    fontWeight: '500',
    fontSize: 18,
    color: "rgb(64,64,64)",
  },
  my_account: {
    margin: 20,
    height: Dimensions.get('window').height / 10,
    backgroundColor: 'rgb(245,245,245)',
    borderRadius: 10,
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  my_account_text: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft:20,
    color:theme.text
  },
  Icon: {
    justifyContent: 'flex-end',
  },
});
