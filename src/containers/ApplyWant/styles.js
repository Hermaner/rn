
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  listColor: {
    width: 44,
    marginTop: 2,
    marginBottom: 2,
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 22,
    ...st.jacenter,
  },
  listIcon: {
    fontSize: 22,
  },
  list: {
    ...st.frcenter,
    backgroundColor: '#fff',
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    padding: 10,
  },
  listMid: {
    flex: 1,
    paddingLeft: 10,
  },
  name: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    color: '#888',
  },
  arr: {
    fontSize: 18,
    color: '#666',
  },
});
export default styles;
