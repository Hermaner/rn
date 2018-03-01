
import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  top: {
    backgroundColor: '#e5464a',
    height: 85,
    paddingLeft: 30,
    ...st.jcenter,
    marginBottom: 6,
  },
  topText: {
    fontSize: 14,
    color: '#fff',
  },
  masterInfo: {
    ...st.frcenter,
    paddingLeft: 10,
    paddingRight: 10,
    height: 46,
    backgroundColor: '#fff',
  },
  leftIco: {
    fontSize: 18,
    color: '#888',
    marginRight: 8,
  },
  leftText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  rightTel: {
    ...st.frcenter,
  },
  rightIco: {
    marginRight: 5,
    fontSize: 18,
    color: '#888',
  },
  mainText: {
    fontSize: 14,
    color: '#666',
  },
  address: {
    ...st.frcenter,
    padding: 10,
    marginTop: 4,
    backgroundColor: '#fff',
  },
  addressList: {
    padding: 0,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  addressRight: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  addressTop: {
    ...st.frcenter,
    height: 22,
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#333',
  },
  userAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  diffBtn: {
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 27,
    ...st.jacenter,
    paddingLeft: 10,
    paddingRight: 10,
  },
  diffText: {
    fontSize: 12,
    color: Mcolor,
  },
  mid: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f8f8f8',
  },
  product: {
    paddingBottom: 5,
    paddingTop: 5,
    ...st.frcenter,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  count: {
    fontSize: 12,
    color: '#777',
    lineHeight: 20,
  },
  memo: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
  },
  memoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  totalView: {
    backgroundColor: '#fff',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  totalLine: {
    ...st.frcenter,
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
  },
  totalLeft: {
    fontSize: 12,
    color: '#888',
    flex: 1,
  },
  totalRight: {
    fontSize: 12,
    color: '#888',
  },
  totalLeft2: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  totalRight2: {
    fontSize: 16,
    color: Mcolor,
  },
  infoView: {
    backgroundColor: '#fff',
    marginTop: 6,
  },
  infoList: {
    padding: 10,
  },
  infoText: {
    lineHeight: 22,
    fontSize: 13,
    color: '#666',
  },
  cpMemo: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  evalView: {
    backgroundColor: '#fff',
    marginTop: 6,
  },
  evalDate: {
    fontSize: 13,
    color: '#666',
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  star: {
    ...st.fr,
    paddingLeft: 10,
    ...st.acenter,
  },
  starText: {
    fontSize: 13,
    color: '#666',
    marginRight: 4,
  },
  starText2: {
    fontSize: 13,
    color: '#666',
    marginRight: 4,
    marginLeft: 4,
  },
  evalMemo: {
    paddingLeft: 10,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#f8f8f8',
    ...st.fr,
    ...st.acenter,
    justifyContent: 'flex-end',
  },
  acBtn: {
    marginRight: 8,
    height: 30,
    borderRadius: 15,
    ...st.jcenter,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
    paddingRight: 10,
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
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    paddingTop: 4,
    paddingBottom: 6,
  },
  memoLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
    lineHeight: 24,
  },
  listView: {
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
  listRight: {
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
