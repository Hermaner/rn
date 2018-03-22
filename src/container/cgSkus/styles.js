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
  grayBtn: {
    backgroundColor: '#666',
  },
  tabCur: {
    backgroundColor: Mcolor,
    borderColor: Mcolor,
  },
  tabCurText: {
    color: '#fff',
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  modalBigBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  modalBox: {
    flex: 1,
    backgroundColor: Mcolor,
    height: 45,
    ...st.jacenter,
    borderRadius: 5,
  },
});
export default styles;
