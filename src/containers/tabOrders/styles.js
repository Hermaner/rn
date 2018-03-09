
import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  fixTop: {
  },
  conditions: {
    height: 45,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    ...st.fr,
  },
  cdsList: {
    flex: 1,
    ...st.fr,
    ...st.jacenter,
  },
  rightLine: {
    position: 'absolute',
    right: 0,
    top: 12,
    height: 16,
    width: 0.7,
    backgroundColor: '#ccc',
  },
  cddown: {
    color: '#666',
    fontSize: 12,
    marginLeft: 3,
  },
  cddownCur: {
    color: Mcolor,
  },
  cdsListText: {
    color: '#444',
    fontSize: 13,
  },
  cdsCurText: {
    color: Mcolor,
  },
  mainView: {
    flex: 1,
    ...st.fr,
  },
  listContent: {
    flex: 1,
  },
});
export default styles;
