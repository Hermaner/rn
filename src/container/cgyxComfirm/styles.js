import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  list: {
    ...st.fr,
    paddingRight: 10,
    backgroundColor: '#fff',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    ...st.jacenter,
  },
  lastList: {
    marginBottom: 8,
    borderBottomColor: '#fff',
  },
  listTitle: {
    ...st.jacenter,
    width: 90,
  },
  listTitleText: {
    fontSize: 14,
    color: '#333',
  },
  listLabel: {
    flex: 1,
    justifyContent: 'center',
  },
  listLabelText: {
    fontSize: 15,
    color: '#333',
  },
  listIcon: {
    fontSize: 18,
    marginLeft: 10,
    color: '#888',
  },
  memoView: {
    marginBottom: 8,
    backgroundColor: '#fff',
    padding: 10,
  },
  memoTitle: {
  },
  memoTitleText: {
    color: '#333',
    lineHeight: 20,
    fontSize: 14,
  },
  memoMain: {
  },
  memoMainInput: {
    lineHeight: 20,
    fontSize: 12,
    color: '#666',
    height: 60,
    padding: 0,
  },
  upView: {
    ...st.fr,
    ...st.jacenter,
    backgroundColor: '#fff',
    paddingBottom: 8,
  },
  btn: {
    height: 50,
    ...st.jacenter,
    backgroundColor: Mcolor,
    borderRadius: 3,
  },
  phoneInput: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});
export default styles;
