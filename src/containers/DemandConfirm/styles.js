
import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceW } from '../../utils';

const leftWidth = 70;
const styles = StyleSheet.create({
  ...st,
  address: {
    ...st.frcenter,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  addressList: {
    padding: 0,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  leftIco: {
    fontSize: 16,
    color: '#666',
  },
  arr: {
    fontSize: 16,
    color: '#666',
  },
  addressRight: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
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
  listView: {
    ...st.frcenter,
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 50,
    marginTop: 4,
  },
  listInput: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  memoView: {
    flex: 1,
    ...st.fr,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    marginTop: 4,
    paddingTop: 4,
    paddingBottom: 6,
  },
  memoLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
    lineHeight: 24,
  },
  listLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  listRight: {
    flex: 1,
  },
  chooseTime: {
    ...st.fr,
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listMemo: {
    height: 60,
    lineHeight: 24,
    fontSize: 14,
    color: '#666',
    textAlignVertical: 'top',
  },
  listText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#333',
  },
  ModalStyle: {
    marginLeft: leftWidth / 2,
    width: deviceW - leftWidth,
    backgroundColor: '#fff',
  },
  modalView: {
    padding: 10,
    flex: 1,
    paddingTop: 40,
  },
  addressmodalView: {
    flex: 1,
    paddingTop: 40,
  },
  typeColorView: {
    ...st.fr,
    paddingLeft: 5,
  },
  typeColor: {
    height: 26,
    backgroundColor: '#009acd',
    paddingLeft: 8,
    paddingRight: 8,
    ...st.jacenter,
    borderRadius: 3,
  },
  typeText: {
    fontSize: 14,
    color: '#fff',
  },
  popDate: {
    flex: 1,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    lineHeight: 40,
  },
  popDay: {
    padding: 10,
    flexWrap: 'wrap',
    ...st.fr,
  },
  dtlister: {
    width: '33%',
  },
  dtpmlister: {
    width: '50%',
  },
  dtlist: {
    backgroundColor: '#fff',
    borderWidth: 1,
    ...st.jacenter,
    marginRight: 6,
    marginTop: 6,
    padding: 5,
    borderColor: '#aaa',
    borderRadius: 4,
  },
  dtlistCur: {
    backgroundColor: Mcolor,
    borderColor: Mcolor,
  },
  dtlabel: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  dtlabelCur: {
    color: '#fff',
  },
  popPm: {
    padding: 10,
    ...st.fr,
    flexWrap: 'wrap',
  },
  dttips: {
    fontSize: 12,
    color: Mcolor,
    textAlign: 'center',
    lineHeight: 20,
    paddingTop: 10,
    paddingRight: 10,
  },
  modalBtns: {
    height: 60,
    padding: 10,
    ...st.fr,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: Mcolor,
    borderRadius: 5,
    ...st.jacenter,
    marginLeft: 5,
    marginRight: 5,
  },
  cancelBtn: {
    backgroundColor: '#aaa',
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    ...st.fr,
    ...st.jcenter,
  },
  footLeft: {
    flex: 1,
    ...st.fr,
    ...st.acenter,
    paddingLeft: 10,
  },
  footPriceLabel: {
    color: '#666',
    fontSize: 14,
  },
  footPrice: {
    color: Mcolor,
    fontSize: 16,
    fontWeight: 'bold',
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
});
export default styles;
