import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: 'rgb(245, 245 ,245)',
    borderRadius: 9999,
    padding: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  sort_button: {
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 9999,
    display: 'flex',
  },
  sort_title: {
    fontWeight: '600',
  },
  button_active: {
    backgroundColor: 'rgb(255,255 ,255)',
    elevation: 5,
    shadowColor: '#000', // gölge rengi
    shadowOffset: {width: 0, height: 1}, // Gölge konumu (x, y)
    shadowOpacity: 0.3, // Gölge opaklığı
    shadowRadius: 3, // Gölge yarıçapı
  },
});
