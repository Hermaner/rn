import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  topBox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#E3F6D9',
  },
  topText: {
    fontSize: 14,
    color: '#666',
  },
  box: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
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
  btnBox: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#56BA24',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  buttonBox: {
    backgroundColor: '#56BA24',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
});
export default styles;
