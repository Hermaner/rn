import { StyleSheet } from 'react-native';
// import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  goodsDetail: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  goodsPrice: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  goodsitem: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  readPeople: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  renovateTime: {
    flex: 1,
    textAlign: 'right',
    color: '#666',
    fontSize: 14,
  },
  btnList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnBox: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 7,
    paddingBottom: 7,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginLeft: 8,
  },
  btnText: {
    fontSize: 14,
    color: '#333',
  },
  btnChoose: {
    backgroundColor: '#FC8521',
  },
  btnTextChoose: {
    color: '#fff',
  },
});
export default styles;
