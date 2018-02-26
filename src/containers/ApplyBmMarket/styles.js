import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  mainList: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  listView: {
    ...st.frcenter,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 50,
  },
  listLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  listRight: {
    flex: 1,
    ...st.frcenter,
  },
  listInput: {
    color: '#333',
    fontSize: 14,
  },
  memoView: {
    alignItems: 'flex-start',
  },
  memoLabel: {
    color: '#666',
    fontSize: 14,
    width: 80,
    marginTop: 10,
    lineHeight: 24,
  },
  listMemo: {
    color: '#333',
    fontSize: 14,
    textAlignVertical: 'top',
    height: 80,
    marginTop: 10,
    lineHeight: 24,
  },
  areaView: {
    ...st.frcenter,
    flex: 1,
  },
  areaText: {
    flex: 1,
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  arr: {
    fontSize: 16,
    color: '#666',
  },
  cardTips: {
    fontSize: 13,
    lineHeight: 18,
    margin: 10,
    marginBottom: 0,
    color: '#ff0000',
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
  sendBtn: {
    height: 35,
    width: 120,
    padding: 0,
    ...st.jacenter,
    backgroundColor: Mcolor,
  },
  sendBtnCur: {
    backgroundColor: '#aaa',
  },
  sendBtnText: {
    color: '#fff', ...st.font14,
  },
  list: {
  },
  title: {
    ...st.frcenter,
    height: 50,
  },
  listName: {
    color: '#444',
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  footer: {
    backgroundColor: '#f8f8f8',
    height: 70,
  },
});
export default styles;
