
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  list: {
    height: 50,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    ...st.frcenter,
  },
  listLast: {
    marginTop: 10,
  },
  name: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  right: {
    ...st.frcenter,
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  arr: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  androidBox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  androidText: {
    fontSize: 14,
    color: '#666',
  },
});
export default styles;
