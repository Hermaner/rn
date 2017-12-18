import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  Headerleft: {
    height: 44,
    width: 20,
  },
  whyReport: {
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 14,
    color: '#666',
  },
  infoBox: {
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  infoBox2: {
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  inputs: {
    height: 80,
    fontSize: 14,
  },
  shieldThePeople: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  btnBox: {
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  submitBtn: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#53BB21',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  addPz: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    color: '#666',
    fontSize: 14,
  },
});
export default styles;
