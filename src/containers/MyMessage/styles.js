
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
  },
  list: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
  },
  top: {
    ...st.frcenter,
    height: 30,
  },
  title: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  content: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
});
export default styles;
