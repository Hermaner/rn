
import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

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
    height: 28,
  },
  num: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
  price: {
    color: Mcolor,
    flex: 1,
    fontSize: 14,
  },
});
export default styles;
