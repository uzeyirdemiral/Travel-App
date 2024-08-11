import {StyleSheet} from 'react-native';
import {theme} from '../theme';

export default StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    color: 'rgb(64 ,64 ,64)',
  },
  cat_scrool: {
    marginLeft: 16,
  },
  cat_data: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 5,
  },
  selectedCat: {
    opacity: 0.5,
  },
  cat_image: {
    borderRadius: 24,
  },
  cat_text: {
    borderRadius: 24,
    fontWeight: '500',
  },
});
