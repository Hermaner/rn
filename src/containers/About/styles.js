
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  content: {
    ...st.jacenter,
    backgroundColor: '#fff',
    flex: 1,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
  },
});
export default styles;
