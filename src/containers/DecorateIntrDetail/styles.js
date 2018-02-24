
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  intrView: {
    paddingBottom: 20,
  },
  listView: {
    backgroundColor: '#fff',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
  },
  title: {
    fontSize: 14,
    color: '#444',
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
export default styles;
