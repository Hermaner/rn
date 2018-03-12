
import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  titleColor: {
    width: 20,
    height: 20,
    backgroundColor: Mcolor,
    borderRadius: 10,
    ...st.jacenter,
  },
  titleIcon: {
    fontSize: 14,
    color: '#fff',
  },
  content: {
    padding: 10,
    paddingBottom: 30,
  },
  list: {
  },
  title: {
    ...st.frcenter,
    height: 50,
  },
  listLabel: {
    color: '#444',
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  tabs: {
    flexWrap: 'wrap',
    ...st.fr,
  },
  tab: {
    width: '25%',
    borderRightWidth: 1,
    borderRightColor: '#e3e3e3',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#e3e3e3',
    height: 45,
    ...st.jacenter,
  },
  tabAll: {
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    height: 45,
    ...st.jacenter,
  },
  tabText: {
    color: '#444',
    fontSize: 14,
  },
});
export default styles;
