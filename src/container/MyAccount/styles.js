
import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  top: {
    backgroundColor: '#4dbecd',
    height: 200,
    ...st.jacenter,
  },
  flexOne: {
    flex: 1,
  },
  account: {
    fontSize: 42,
    color: '#fff',
    lineHeight: 50,
  },
  topLabel: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 30,
  },
  btn: {
    backgroundColor: Mcolor,
    marginTop: 5,
    height: 40,
    width: 100,
    ...st.jacenter,
  },
  btn1: {
    backgroundColor: '#eee',
    marginTop: 5,
    height: 40,
    width: 100,
    ...st.jacenter,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  btnText1: {
    fontSize: 16,
    color: '#333',
  },
  list: {
    height: 50,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 8,
    ...st.frcenter,
  },
  name: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
  right: {
    ...st.frcenter,
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  arr: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
});
export default styles;
