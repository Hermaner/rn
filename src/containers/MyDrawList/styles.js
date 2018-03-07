
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  list: {
    ...st.frcenter,
    backgroundColor: '#fff',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  left: {
    flex: 1,
    ...st.fr,
    ...st.acenter,
  },
  img: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    color: '#666',
  },
  arr: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
});
export default styles;
