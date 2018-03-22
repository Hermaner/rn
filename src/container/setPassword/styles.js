import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  borderB: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  password: {
    fontSize: 14,
  },
  eye: {
    fontSize: 24,
    color: '#666',
  },
  btn: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnBox: {
    backgroundColor: Mcolor,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
});
export default styles;
