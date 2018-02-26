
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
});
export default styles;
