
import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceW } from '../../utils';

const leftWidth = 70;
const styles = StyleSheet.create({
  ...st,
  fixTop: {
  },
  ModalStyle: {
    marginLeft: leftWidth / 2,
    width: deviceW - leftWidth,
    backgroundColor: '#fff',
  },
  modalView: {
    padding: 10,
    flex: 1,
    paddingTop: 40,
  },
  modalTitle: {
    fontSize: 12,
    color: '#888',
    lineHeight: 26,
    marginTop: 8,
    marginBottom: 5,
  },
  modalList: {
    ...st.fr,
    flexWrap: 'wrap',
  },
  modalItem: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
    width: (deviceW - leftWidth - 20 - 24) / 3,
    height: 28,
    ...st.jacenter,
  },
  modalItemCur: {
    backgroundColor: Mcolor,
  },
  modalItemText: {
    color: '#444',
    fontSize: 12,
  },
  modalItemTextCur: {
    color: '#fff',
  },
  modalBtns: {
    height: 60,
    padding: 10,
    ...st.fr,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: Mcolor,
    borderRadius: 5,
    ...st.jacenter,
    marginLeft: 5,
    marginRight: 5,
  },
  cancelBtn: {
    backgroundColor: '#aaa',
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
  },
  conditions: {
    height: 45,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    ...st.fr,
  },
  cdsList: {
    flex: 1,
    ...st.fr,
    ...st.jacenter,
  },
  rightLine: {
    position: 'absolute',
    right: 0,
    top: 12,
    height: 16,
    width: 0.7,
    backgroundColor: '#ccc',
  },
  cddown: {
    color: '#666',
    fontSize: 12,
    marginLeft: 3,
  },
  cddownCur: {
    color: Mcolor,
  },
  cdsListText: {
    color: '#444',
    fontSize: 12,
  },
  cdsCurText: {
    color: Mcolor,
  },
  mainView: {
    flex: 1,
    ...st.fr,
  },
  listContent: {
    flex: 1,
  },
});
export default styles;
