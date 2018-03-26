import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceW } from '../../utils';

const styles = StyleSheet.create({
  firstBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexOne: {
    flex: 1,
  },
  wuLiuBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  removeBox: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 180,
    backgroundColor: Mcolor,
    paddingLeft: 10,
    paddingRight: 10,
  },
  removeBox2: {
    flex: 1,
    height: 120,
    justifyContent: 'center',
    backgroundColor: Mcolor,
    paddingLeft: 10,
    paddingRight: 10,
  },
  removeBoxNo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    backgroundColor: '#bbb',
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftIcn: {
    width: 26,
    fontSize: 22,
    color: '#666',
    marginRight: 10,
  },
  rightIcn: {
    color: '#666',
    fontSize: 22,
  },
  sixText: {
    fontSize: 12,
    color: '#666',
  },
  norText: {
    fontSize: 14,
    color: '#555',
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
    borderColor: '#ddd',
    borderRadius: 4,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnBox1: {
    width: 120,
    height: 50,
    backgroundColor: Mcolor,
    ...st.jacenter,
    borderRadius: 5,
    marginLeft: 10,
  },
  btnText: {
    color: '#389D2D',
    fontSize: 14,
  },
  goodsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F8F8F8',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  goodsImg: {
    width: 80,
    height: 80,
    marginTop: 5,
    marginBottom: 5,
  },
  addNameLine1: {
    flex: 1,
    paddingRight: 10,
  },
  leftIcn1: {
    width: 26,
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  goodsNameBox: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: '#eee',
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
    height: 40,
    width: 80,
    backgroundColor: '#5AB924',
  },
  typeChoose: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  typeChooseBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
  },
  typeText: {
    color: '#333',
    fontSize: 14,
  },
  labelText: {
    color: '#999',
    fontSize: 14,
  },
  check: {
    marginRight: 15,
  },
  infoBox: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  orderInfoBox: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  footerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
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
  modalBigBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginTop: 140,
  },
  modalBox: {
    backgroundColor: Mcolor,
    width: 120,
    height: 45,
    ...st.jacenter,
    borderRadius: 5,
  },
  noticeBox: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
  },
  noticeTitle: {
    fontSize: 16,
    color: Mcolor,
  },
  noticeLabel: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  nowBox: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#F88E00',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
  },
  boxText: {
    fontSize: 13,
    color: '#fff',
  },
  displayBox: {
    marginTop: 15,
    marginBottom: 15,
  },
  distanceLabel: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText2: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
  labelBox: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  labelBoxNow: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
  },
  line: {
    width: deviceW - 20,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    position: 'absolute',
    top: 7,
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 16,
    color: '#333',
  },
  copyBox: {
    marginLeft: 6,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,
    borderWidth: 1,
    borderColor: Mcolor,
  },
  copyText: {
    fontSize: 13,
    color: Mcolor,
  },
  sellerText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
});
export default styles;
