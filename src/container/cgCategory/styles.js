import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  maskerContentView: {
    ...st.fr,
    ...st.f1,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  mainText: {
    color: '#555',
    fontSize: 14,
  },
  contetnTabView: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    height: 40,
    ...st.jacenter,
    width: `${100 / 3}%`,
  },
});
export default styles;
