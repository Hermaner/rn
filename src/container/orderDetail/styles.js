import { StyleSheet } from 'react-native';
import { st, Mcolor, deviceW } from '../../utils';

const leftWidth = 70;
const styles = StyleSheet.create({
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
  popDate: {
    flex: 1,
  },
  address: {
    ...st.frcenter,
    padding: 15,
    backgroundColor: '#fff',
  },
  arr: {
    fontSize: 16,
    color: '#666',
  },
  addressList: {
    padding: 10,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
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
  firstBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftIcn: {
    fontSize: 22,
    color: '#666',
    marginRight: 10,
  },
  rightIcn: {
    color: '#666',
    fontSize: 22,
  },
  addNameLine: {
    ...st.frcenter,
    paddingRight: 10,
    height: 30,
  },
  sixText: {
    fontSize: 14,
    color: '#666',
  },
  storeImg: {
    width: '100%',
    height: 2,
  },
  mai: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  btnBox: {
    borderWidth: 1,
    borderColor: '#A0CA80',
    borderRadius: 4,
    marginLeft: 10,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6,
    paddingBottom: 6,
  },
  btnText: {
    color: '#389D2D',
    fontSize: 14,
  },
  goodsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F8F8F8',
  },
  goodsImg: {
    width: 80,
    height: 80,
  },
  goodsNameBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 80,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexRowInfo2: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
  inputBox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  inputLabel: {
    height: 80,
    fontSize: 14,
    borderWidth: 1,
    textAlignVertical: 'top',
    borderColor: '#ddd',
    borderRadius: 4,
  },
  footerLeft: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: '#F6F6F6',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 120,
    backgroundColor: Mcolor,
  },
  typeChoose: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  typeChooseBox: {
  },
  typeView: {
    ...st.jcenter,
    height: 40,
    paddingLeft: 5,
  },
  typeText: {
    color: '#333',
    fontSize: 14,
  },
  labelText: {
    color: '#555',
    fontSize: 14,
  },
  check: {
    marginRight: 15,
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
  logsView: {
    ...st.fr,
    flexWrap: 'wrap',
  },
  logsList: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    height: 40,
    width: 90,
    ...st.jacenter,
    borderRadius: 4,
  },
  logsListCur: {
    backgroundColor: Mcolor,
    borderColor: Mcolor,
  },
  logsListText: {
    fontSize: 14,
    color: '#555',
  },
  logsListTextCur: {
    fontSize: 14,
    color: '#fff',
  },
});
export default styles;
