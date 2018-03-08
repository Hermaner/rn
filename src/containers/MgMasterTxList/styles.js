
import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  listContent: {
    flex: 1,
  },
  list: {
    backgroundColor: '#fff',
    padding: 10,
  },
  top: {
    ...st.frcenter,
    height: 30,
  },
  num: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
  price: {
    color: Mcolor,
    fontSize: 14,
  },
  bom: {
    height: 24,
    ...st.jcenter,
  },
  date: {
    color: '#666',
    fontSize: 14,
  },
});
export default styles;
