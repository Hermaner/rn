import { StyleSheet } from 'react-native';
import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  visitData: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#17B4EF',
    paddingLeft: 10,
  },
  visitorInfo: {

  },
  visitorType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flexOneleft: {
    flex: 1,
    // textAlign: 'center',
    fontSize: 14,
    color: '#666',
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexTextColor: {
    color: '#666',
  },
  flexOneCenter: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexOneRight: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: '#666',
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  isHidden: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  leftPart: {
    flex: 1,
  },
  rightIcn: {
    textAlign: 'right',
  },
  userName: {
    fontSize: 18,
    color: '#333',
    marginRight: 10,
    marginBottom: 6,
  },
  time: {
    color: '#666',
    fontSize: 14,
  },
  userAdress: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  btnList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  btn: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginLeft: 6,
    borderRadius: 5,
  },
  btnText: {
    color: '#F2F2F2',
    fontSize: 16,
    textAlign: 'center',
  },
  btnLeft: {
    flex: 4,
  },
  btnLeftText: {
    color: '#333',
  },
  btnCenter: {
    flex: 3,
    color: '#fff',
    backgroundColor: '#16B6F6',
  },
  btnRight: {
    flex: 3,
    color: '#fff',
    backgroundColor: '#57B924',
  },
});
export default styles;
