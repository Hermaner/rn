import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  goodsItem: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  goodsImg: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  goodsName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  goodsPlace: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    marginRight: 10,
  },
  chooseBtn: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 12,
    color: '#666',
    borderWidth: 1,
    borderColor: '#FC8521',
    marginBottom: 50,
  },
  goodsPriceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    color: '#FC8521',
    marginRight: 4,
  },
  howLongBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  howLong: {
    fontSize: 9,
    color: '#666',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aa: {
    color: '#999',
    fontSize: 12,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderWidth: 1,
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 2,
  },
  textBorder: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Mcolor,
  },
  tabText: {
    color: Mcolor,
    fontSize: 14,
    textAlign: 'center',
  },
  investigationBox: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
  },
  readContent: {
    fontSize: 14,
    color: Mcolor,
  },
  btnBox: {
    height: 30,
    ...st.jacenter,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  btnText: {
    fontSize: 14,
    color: '#666',
  },
  flexBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
