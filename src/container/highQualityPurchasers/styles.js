import { StyleSheet, Dimensions } from 'react-native';
import { Mcolor } from '../../utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  flexOne: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flexDirection: 'row',
  },
  goodsName: {
    fontSize: 18,
    color: '#333',
    marginBottom: 6,
  },
  goodsText: {
    fontSize: 14,
    color: '#666',
    marginRight: 20,
    marginBottom: 4,
  },
  minHeight: {
    minHeight: 60,
  },
  btnList: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleBox: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  titleText: {
    fontSize: 18,
    color: Mcolor,
    textAlign: 'center',
  },
  bigBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  rowBox: {
    width: (width / 2),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  rowBoxInner: {
    flex: 1,
    backgroundColor: '#eee',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
  needNameBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  borderLeft: {
    width: 10,
    borderBottomColor: Mcolor,
    borderBottomWidth: 1,
  },
  borderRight: {
    width: 10,
    borderBottomColor: Mcolor,
    borderBottomWidth: 1,
  },
  needBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Mcolor,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  needTitle: {
    fontSize: 13,
    color: Mcolor,
  },
  requireBox: {
    height: 100,
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 4,
    paddingRight: 4,
  },
  requireText: {
    fontSize: 14,
    color: '#666',
  },
  adressBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  adress: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  needCount: {
    flex: 1,
    textAlign: 'right',
  },
  btnBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBtn: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    // borderWidth: 1,
    // borderColor: Mcolor,
    borderLeftWidth: 1,
    borderLeftColor: Mcolor,
    borderTopWidth: 1,
    borderTopColor: Mcolor,
    borderBottomWidth: 1,
    borderBottomColor: Mcolor,
  },
  leftBtnText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  rightBtn: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Mcolor,
    // borderWidth: 1,
    // borderColor: Mcolor,
    borderRightWidth: 1,
    borderRightColor: Mcolor,
    borderTopWidth: 1,
    borderTopColor: Mcolor,
    borderBottomWidth: 1,
    borderBottomColor: Mcolor,
  },
  rightBtnText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
export default styles;
