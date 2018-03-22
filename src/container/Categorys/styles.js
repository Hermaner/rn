import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  content: {
    ...st.fr,
    flex: 1,
  },
  leftNav: {
    width: 90,
    backgroundColor: '#f2f2f2',
  },
  listContent: {
    flex: 1,
  },
  mainText: {
    color: '#555',
    fontSize: 14,
  },
  leftNavList: {
    height: 45,
    ...st.jacenter,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#f2f2f2',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
  },
  leftNavListCur: {
    borderLeftColor: Mcolor,
    borderRightColor: '#fff',
    backgroundColor: '#fff',
  },
  leftNavText: {
    color: '#555',
    fontSize: 14,
  },
  leftNavTextCur: {
    color: Mcolor,
  },
  rightContent: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  rightAll: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
    ...st.jacenter,
    height: 35,
  },
  rightContentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftColor: '#ddd',
    borderLeftWidth: 1,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  contetnTabView: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    height: 40,
    ...st.jacenter,
    width: `${100 / 3}%`,
  },
});
export default styles;
