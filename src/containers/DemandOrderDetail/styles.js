
import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceW } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  address: {
    ...st.frcenter,
    padding: 15,
    backgroundColor: '#fff',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 10,
  },
  addressRight: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
    color: '#333',
  },
  userAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  listView: {
    ...st.frcenter,
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    minHeight: 50,
    marginTop: 4,
  },
  listLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  listRight: {
    flex: 1,
  },
  listText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#333',
  },
  listType: {
    height: 35,
    ...st.fr,
    ...st.acenter,
    justifyContent: 'space-between',
  },
  listTypeBg: {
    backgroundColor: '#009ACD',
    padding: 6,
    borderRadius: 3,
  },
  listTypeName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  priceText: {
    color: Mcolor,
    fontSize: 12,
  },
  price: {
    backgroundColor: Mcolor,
    height: 30,
    ...st.frcenter,
    borderRadius: 15,
    paddingRight: 10,
    paddingLeft: 10,
  },
  priceIcon: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 4,
    marginRight: 3,
  },
  priceValue: {
    color: '#fff',
    fontSize: 15,
  },
  footer: {
    backgroundColor: '#f8f8f8',
    ...st.fr,
    ...st.jcenter,
  },
  footTips: {
    flex: 1,
    ...st.jacenter,
  },
  footTipsText: {
    color: '#666',
    fontSize: 14,
  },
  footBtn: {
    backgroundColor: Mcolor,
    ...st.jacenter,
    width: 120,
  },
  footBtnView: {
  },
  footBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  ModalStyle: {
    backgroundColor: '#fff',
    height: 300,
  },
  modalView: {
    flex: 1,
  },
  modalTitle: {
    height: 45,
    marginBottom: 1,
    backgroundColor: Mcolor,
    ...st.jacenter,
  },
  modalTitleText: {
    fontSize: 14,
    color: '#fff',
  },
  modalBtns: {
    height: 60,
    ...st.fr,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: Mcolor,
    ...st.jacenter,
  },
  cancelBtn: {
    backgroundColor: '#aaa',
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  memoView: {
    flex: 1,
    ...st.fr,
    marginTop: 5,
    borderTopColor: '#e4e4e4',
    borderTopWidth: 1,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    paddingTop: 4,
    marginBottom: 5,
  },
  memoLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
    lineHeight: 24,
  },
  modalListView: {
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    borderTopColor: '#e4e4e4',
    borderTopWidth: 1,
    height: 50,
    backgroundColor: '#fff',
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    ...st.frcenter,
  },
  modalListRight: {
    flex: 1,
  },
  memoInput: {
    flex: 1,
  },
  listMemo: {
    flex: 1,
    lineHeight: 24,
    fontSize: 14,
    color: '#666',
    textAlignVertical: 'top',
  },
  listInput: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
});
export default styles;
