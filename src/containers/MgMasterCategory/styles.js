
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
  tabCur: {
    backgroundColor: Mcolor,
    borderBottomColor: Mcolor,
    borderRightColor: Mcolor,
  },
  tabText: {
    color: '#444',
    fontSize: 14,
  },
  tabTextCur: {
    color: '#fff',
  },
  btnView: {
    backgroundColor: Mcolor,
    flex: 1,
    margin: 10,
    height: 50,
    ...st.jacenter,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    backgroundColor: '#f8f8f8',
    height: 70,
  },
});
export default styles;
