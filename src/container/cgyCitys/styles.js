import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  maskerContentView: {
    backgroundColor: '#fff',
    flex: 1,
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
  usedCityView: {
    flexWrap: 'wrap',
    height: 40,
    ...st.jcenter,
  },
  nousedCity: {
    paddingLeft: 10,
    color: '#888',
    fontSize: 14,
  },
  addressLeftList: {
    height: 45,
    ...st.jcenter,
    borderLeftWidth: 3,
    paddingLeft: 20,
    borderLeftColor: '#f2f2f2',
  },
  addressLeftListCur: {
    borderLeftColor: Mcolor,
    backgroundColor: '#f9f9f9',
  },
  addressRightList: {
    height: 45,
    paddingLeft: 20,
    ...st.jcenter,
  },
  addressRightListCur: {
    backgroundColor: '#fff',
  },
  leftNavText: {
    color: '#555',
    fontSize: 14,
  },
  leftNavTextCur: {
    color: Mcolor,
  },
});
export default styles;
