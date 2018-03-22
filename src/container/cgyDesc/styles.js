import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  memoView: {
    backgroundColor: '#fff',
  },
  memoInput: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    textAlignVertical: 'top',
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
