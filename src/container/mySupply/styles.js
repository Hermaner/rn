import { StyleSheet } from 'react-native';
import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  goodsDetail: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // alignItems: 'center',
  },
  goodsImg: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  goodsPrice: {
    flexDirection: 'row',
    marginBottom: 20,
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
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  btnBox: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginLeft: 10,
  },
  btnText: {
    fontSize: 14,
    color: '#333',
  },
  btnChoose: {
    backgroundColor: '#57BA24',
  },
  btnTextChoose: {
    color: '#fff',
  },
});
export default styles;
