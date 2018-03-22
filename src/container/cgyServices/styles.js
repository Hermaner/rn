import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceW } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  content: {
    backgroundColor: '#fff',
  },
  topView: {
    backgroundColor: '#f6f6f6',
    padding: 10,
    marginBottom: 10,
  },
  topText: {
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
  },
  listTitle: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  listTitleText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  btnList: {
    flexWrap: 'wrap',
    paddingLeft: 10,
    ...st.fr,
  },
  btn: {
    marginRight: 10,
    height: 30,
    marginBottom: 10,
    ...st.jacenter,
    backgroundColor: '#eee',
    width: (deviceW - 40) / 3,
  },
  btnCur: {
    backgroundColor: Mcolor,
  },
  btnText: {
    color: '#555',
    fontSize: 14,
  },
  btnTextCur: {
    color: '#fff',
  },
  savebtn: {
    backgroundColor: Mcolor,
    borderRadius: 4,
  },
});
export default styles;
