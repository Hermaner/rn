import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceW } from '../../utils';

const leftWidth = 70;
const styles = StyleSheet.create({
  ModalStyle: {
    marginLeft: leftWidth / 2,
    width: deviceW - leftWidth,
    backgroundColor: '#f6f6f6',
  },
  modalView: {
    margin: 10,
    marginTop: 40,
    marginBottom: 20,
  },
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
  tabs: {
    flexWrap: 'wrap',
    ...st.fr,
  },
  tab: {
    width: '33.3%',
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
    borderColor: Mcolor,
  },
  tabText: {
    color: '#444',
    fontSize: 14,
  },
  tabTextCur: {
    color: '#fff',
  },
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
  footer: {
    backgroundColor: '#f8f8f8',
    height: 70,
  },
});
export default styles;
