import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  pagebody: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  endTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#FCEDA9',
    alignSelf: 'flex-start',
  },
  closeIcon: {
    flex: 1,
    textAlign: 'right',
  },
  userImg: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  purchaseCount: {
    color: '#666',
    fontSize: 14,
    marginTop: 15,
  },
  purchaseCount1: {
    marginTop: 5,
    color: '#666',
    fontSize: 14,
  },
  needGoodsDetail: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#999',
  },
  flexTwo: {
    flex: 1,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#999',
  },
  text6: {
    color: '#333',
  },
  text7: {
    color: '#ff0000',
  },
  boderOne: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  boderTwo: {
    flex: 2,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    ...st.frcenter,
    flexWrap: 'wrap',
  },
  diffentBackground: {
    backgroundColor: '#F5F5F5',
  },
  addExplain: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  addExplainText: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#999',
    fontSize: 14,
  },
  footerBtn: {
    width: '100%',
    backgroundColor: '#FE8822',
    position: 'absolute',
    bottom: 0,
    paddingTop: 15,
    paddingBottom: 15,
  },
  footerBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  btnList: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  btnListOne: {
    flex: 1,
    backgroundColor: '#FE8822',
    paddingTop: 15,
    paddingBottom: 15,
  },
  leftBtn: {
    backgroundColor: Mcolor,
  },
  rightBtn: {
    backgroundColor: '#16B6F6',
  },
  userInfo: {
  },
  userName: {
    color: '#333',
    fontSize: 14,
  },
});
export default styles;
