
import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  list: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  main: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
  },
  nameView: {
    ...st.frcenter,
    height: 28,
  },
  name: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  address: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 6,
  },
  listBom: {
    ...st.frcenter,
    paddingLeft: 4,
  },
  listcK: {
    flex: 1,
    ...st.fr,
    justifyContent: 'flex-end',
  },
  checkText: {
    fontSize: 13,
    color: '#666',
  },
  listBtnText: {
    color: '#444',
    fontSize: 13,
    marginRight: 12,
  },
  footer: {
    backgroundColor: '#f8f8f8',
    height: 70,
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
});
export default styles;
