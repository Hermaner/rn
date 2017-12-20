import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  endTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
    alignSelf: 'flex-end',
  },
  needGoodsDetail: {
    backgroundColor: '#fff',
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderRightWidth: 1,
    borderRightColor: '#eee',
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
    color: '#FC801B',
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
    backgroundColor: '#FC8521',
    position: 'absolute',
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 20,
  },
  footerBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});
export default styles;
