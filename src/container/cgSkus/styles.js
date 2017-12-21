import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  maskerContentView: {
    backgroundColor: '#fff',
  },
  maskerTitle: {
    backgroundColor: '#eee',
    paddingLeft: 10,
    height: 40,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    ...st.jcenter,
  },
  maskerTitleText: {
    fontSize: 14,
    color: '#444',
  },
  mainText: {
    color: '#555',
    fontSize: 14,
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
  btn: {
    backgroundColor: Mcolor,
    borderRadius: 3,
  },
  tabCur: {
    backgroundColor: Mcolor,
    borderColor: Mcolor,
  },
  tabCurText: {
    color: '#fff',
  },
});
export default styles;
