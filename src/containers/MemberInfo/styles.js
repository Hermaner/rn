
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  content: {
    backgroundColor: '#fff',
    padding: 30,
    flex: 1,
  },
  listView: {
    ...st.frcenter,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  listRight: {
    flex: 1,
    ...st.fr,
    ...st.acenter,
    justifyContent: 'space-between',
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
  selectType: {
    width: 0,
    height: 0,
    overflow: 'hidden',
  },
});
export default styles;
