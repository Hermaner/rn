
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  content: {
  },
  listView: {
    ...st.frcenter,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#e6e6e6',
    height: 50,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listLabel: {
    fontSize: 16,
    color: '#666',
    width: 80,
  },
  listRight: {
    flex: 1,
    ...st.fr,
    ...st.acenter,
    justifyContent: 'space-between',
  },
  input: {
    color: '#666',
    fontSize: 14,
  },
  listText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#333',
  },
  arr: {
    color: '#888',
    fontSize: 18,
  },
});
export default styles;
