import { StyleSheet, Dimensions } from 'react-native';
import { st, Mcolor, Mred } from '../../utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  ...st,
  rowBox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
export default styles;
