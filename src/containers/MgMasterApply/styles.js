
import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  ModalStyle: {
    backgroundColor: '#fff',
    height: 300,
  },
  modalView: {
    flex: 1,
  },
  modalTitle: {
    height: 45,
    marginBottom: 1,
    backgroundColor: Mcolor,
    ...st.jacenter,
  },
  modalTitleText: {
    fontSize: 14,
    color: '#fff',
  },
  modalBtns: {
    height: 60,
    ...st.fr,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: Mcolor,
    ...st.jacenter,
  },
  cancelBtn: {
    backgroundColor: '#aaa',
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  memoView: {
    flex: 1,
    ...st.fr,
    marginTop: 5,
    borderTopColor: '#e4e4e4',
    borderTopWidth: 1,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    paddingTop: 4,
    marginBottom: 5,
  },
  memoLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
    lineHeight: 24,
  },
  modalListView: {
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    borderTopColor: '#e4e4e4',
    borderTopWidth: 1,
    height: 50,
    backgroundColor: '#fff',
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    ...st.frcenter,
  },
  modalListRight: {
    flex: 1,
  },
  memoInput: {
    flex: 1,
  },
  listMemo: {
    flex: 1,
    lineHeight: 24,
    fontSize: 14,
    color: '#666',
    textAlignVertical: 'top',
  },
  listInput: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
});
export default styles;
