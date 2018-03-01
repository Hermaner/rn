import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  mainList: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  listView: {
    ...st.frcenter,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 50,
  },
  listRight: {
    flex: 1,
    ...st.frcenter,
  },
  memoView: {
    alignItems: 'flex-start',
  },
  listMemo: {
    color: '#333',
    fontSize: 14,
    textAlignVertical: 'top',
    height: 240,
    marginTop: 10,
    lineHeight: 24,
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
