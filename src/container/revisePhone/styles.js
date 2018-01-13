import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputs: {
    height: 40,
    color: '#666',
    fontSize: 14,
  },
  getBox: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
  },
  get: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FD4300',
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  accountView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  account: {
    color: '#666',
    fontSize: 14,
    borderBottomColor: '#eee',
    paddingLeft: 0,
  },
  formBom: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  password: {
    color: '#666', fontSize: 14, height: 40,
  },
  sendBtn: {
    height: 30,
    width: 100,
    padding: 0,
    ...st.jacenter,
    marginRight: 10,
    backgroundColor: '#ddd',
  },
  sendBtnText: {
    color: '#888', fontSize: 12,
  },
});
export default styles;
