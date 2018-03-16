
import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  listContent: {
    flex: 1,
  },
  row: {
    backgroundColor: '#fff',
    padding: 10,
  },
  rowOne: {
    ...st.frcenter,
    height: 30,
  },
  rowName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  rowStatus: {
    fontSize: 14,
    color: Mcolor,
  },
  rowTwo: {
    ...st.frcenter,
    height: 30,
  },
  rowText1: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  rowText: {
    fontSize: 14,
    color: '#666',
  },
});
export default styles;
