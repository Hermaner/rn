
import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  main: {
    margin: 15,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    lineHeight: 30,
    fontSize: 14,
    color: '#666',
  },
  blank: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    ...st.frcenter,
    marginBottom: 10,
  },
  label: {
    fontSize: 40,
    color: '#111',
    marginRight: 5,
  },
  input: {
    fontSize: 50,
    height: 70,
    color: '#333',
    flex: 1,
  },
  tipserror: {
    color: '#ff0000',
    fontSize: 12,
  },
  tips: {
    color: '#666',
    fontSize: 12,
  },
  tipsView: {
    ...st.fr,
    ...st.acenter,
    height: 30,
  },
  txAc: {
    color: Mcolor,
    fontSize: 12,
  },
  btn: {
    backgroundColor: Mcolor,
    height: 50,
    margin: 15,
    ...st.jacenter,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  listView: {
    marginLeft: 15,
    marginRight: 15,
  },
  list: {
    ...st.frcenter,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listCur: {
    borderColor: Mcolor,
  },
  left: {
    flex: 1,
    ...st.fr,
    ...st.acenter,
  },
  img: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  listLabel: {
    fontSize: 15,
    color: '#666',
  },
  bomtips: {
    height: 30,
    marginTop: 10,
    ...st.jacenter,
  },
  bomtipsText: {
    fontSize: 13,
    color: '#666',
  },
});
export default styles;
