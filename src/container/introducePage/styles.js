import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  row: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4BBE28',
    marginRight: 10,
    marginTop: 4,
  },
  listTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLabel: {
    fontSize: 14,
    color: '#666',
  },
  listLabelRight: {
    fontSize: 14,
    color: '#8ECD24',
    marginLeft: 2,
  },
});
export default styles;
