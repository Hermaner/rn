
import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  top: {
    backgroundColor: '#e5464a',
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 30,
    marginBottom: 5,
  },
  topText: {
    fontSize: 14,
    lineHeight: 22,
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
    fontSize: 14,
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
    paddingLeft: 10,
    paddingTop: 10,
    height: 30,
    ...st.jcenter,
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
  arr: {
    fontSize: 16,
    color: '#666',
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
    height: 20,
    width: 20,
    borderRadius: 10,
    ...st.jacenter,
    marginRight: 5,
  },
  priceValue: {
    color: '#fff',
    fontSize: 15,
  },
});
export default styles;
