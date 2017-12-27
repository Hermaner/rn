import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  memoView: {
    backgroundColor: '#fff',
  },
  memoInput: {
    fontSize: 13,
    lineHeight: 22,
    color: Mcolor,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    height: 160,
  },
  btn: {
    backgroundColor: Mcolor,
    borderRadius: 3,
  },
});
export default styles;
