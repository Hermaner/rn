
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
    paddingBottom: 5,
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
  listView: {
    ...st.frcenter,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 45,
  },
  listLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  listRight: {
    flex: 1,
    ...st.frcenter,
  },
  listInput: {
    color: '#333',
    fontSize: 14,
  },
  memoView: {
    alignItems: 'flex-start',
  },
  memoLabel: {
    color: '#666',
    fontSize: 14,
    width: 80,
    marginTop: 7,
    lineHeight: 24,
  },
  listMemo: {
    color: '#333',
    fontSize: 14,
    textAlignVertical: 'top',
    height: 80,
    marginTop: 7,
    lineHeight: 24,
  },
  areaView: {
    ...st.frcenter,
    flex: 1,
  },
  areaText: {
    flex: 1,
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  arr: {
    fontSize: 16,
    color: '#666',
  },
});
export default styles;
