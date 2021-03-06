import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topPart: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  QRCode: {
    width: 70,
    height: 70,
  },
  name: {
    color: '#333',
    fontSize: 16,
    marginBottom: 10,
  },
  status: {
    color: '#666',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#eee',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
  },
  isAccreditation: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accreditationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  accreditationText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 5,
  },
  RightPart: {
    flex: 1,
    textAlign: 'right',
  },
  myBusiness: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tableBox: {
    borderRightWidth: 1,
    borderRightColor: '#eee',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    width: 100,
    height: 50,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#F5F5F5',
  },
  flexThree: {
    flex: 1,
    height: 50,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  leftText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 50,
  },
  rightText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 50,
  },
  goodsInfo: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goodsName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  goodsImg: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  Supplements: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftBtn: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#56B925',
  },
  rightBtn: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#14B6F5',
  },
});
export default styles;
