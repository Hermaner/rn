import { StyleSheet } from 'react-native';
import { Mcolor, Mred, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  list: {
    ...st.fr,
    paddingRight: 10,
    backgroundColor: '#fff',
    height: 45,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    ...st.jacenter,
  },
  mustText: {
    color: Mred,
    fontSize: 12,
  },
  unmustText: {
    color: '#888',
    fontSize: 12,
  },
  demandVal: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 10,
    ...st.jacenter,
    flex: 1,
  },
  mainText: {
    color: '#555',
    fontSize: 14,
  },
  listTitleText: {
    fontSize: 14,
    color: '#333',
  },
  listRight: {
    ...st.fr,
    ...st.jacenter,
  },
  listRightText: {
    fontSize: 14,
    color: '#666',
  },
  listLine: {
    fontSize: 20,
    color: '#333',
  },
  listPrice: {
    flex: 1,
    textAlign: 'center',
    ...st.jacenter,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
    color: '#333',
  },
  demandIcon: {
    fontSize: 18,
    marginLeft: 5,
    color: '#888',
  },
  frlist: {
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  frtop: {
    ...st.fr,
    paddingLeft: 10,
  },
  frBtnView: {
    ...st.fr,
    paddingTop: 10,
    paddingLeft: 5,
  },
  frBtn: {
    flex: 1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    height: 38,
    ...st.jacenter,
  },
  tabCur: {
    borderColor: Mcolor,
  },
  tabCurText: {
    color: Mcolor,
  },
  btn: {
    backgroundColor: Mcolor,
    borderRadius: 3,
  },
  selectType: {
    flexDirection: 'row',
    width: 0,
    height: 0,
    overflow: 'hidden',
    ...st.jacenter,
  },
});
export default styles;
