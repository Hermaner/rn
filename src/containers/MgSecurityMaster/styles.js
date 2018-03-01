import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceW } from '../../utils';

const styles = StyleSheet.create({
  top: {
    height: deviceW / 2.5,
    position: 'relative',
  },
  topbg: {
    width: '100%',
    height: deviceW / 2.5,
  },
  topView: {
    position: 'absolute',
    left: 20,
    bottom: 0,
    top: 0,
    ...st.jcenter,
  },
  midText: {
    lineHeight: 35,
    color: '#333',
    fontSize: 24,
  },
  mid: {
    paddingTop: 20,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  midTitle: {
    lineHeight: 35,
    color: '#333',
    fontSize: 20,
  },
  midLabel: {
    lineHeight: 30,
    color: '#666',
    fontSize: 16,
  },
  lists: {
    padding: 20,
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  list: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    borderColor: '#bbb',
    ...st.jcenter,
    marginTop: 10,
  },
  listCur: {
    borderColor: Mcolor,
  },
  listLabel: {
    color: '#333',
    fontSize: 14,
  },
  btnView: {
    backgroundColor: Mcolor,
    flex: 1,
    margin: 10,
    height: 50,
    ...st.jacenter,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    backgroundColor: '#f8f8f8',
    height: 70,
  },
});
export default styles;
