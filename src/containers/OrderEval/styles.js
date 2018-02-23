
import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  listView: {
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    borderTopColor: '#e4e4e4',
    borderTopWidth: 1,
    minHeight: 50,
    backgroundColor: '#fff',
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    ...st.fr,
  },
  listLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
    lineHeight: 50,
  },
  listRight: {
    flex: 1,
  },
  typeView: {
    ...st.frcenter,
    flex: 1,
  },
  typeList: {
  },
  typeText: {
    fontSize: 14,
    color: '#666',
  },
  listMemo: {
    flex: 1,
    lineHeight: 20,
    fontSize: 14,
    color: '#666',
    height: 90,
    marginTop: 12,
    textAlignVertical: 'top',
  },
  UpView: {
    backgroundColor: '#fff',
    marginTop: 5,
  },
  starView: {
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    borderTopColor: '#e4e4e4',
    borderTopWidth: 1,
    minHeight: 50,
    backgroundColor: '#fff',
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    ...st.fr,
    ...st.acenter,
  },
  starRight: {
    width: 140,
  },
  starLab: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  btnView: {
    backgroundColor: Mcolor,
    margin: 10,
    marginTop: 20,
    height: 50,
    ...st.jacenter,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
});
export default styles;
