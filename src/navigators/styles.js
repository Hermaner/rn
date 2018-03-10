import { StyleSheet } from 'react-native';
import { st } from '../utils';

const styles = StyleSheet.create({
  ModalStyle: {
    height: 170,
  },
  modalView: {
    flex: 1,
  },
  shareLists: {
    ...st.frcenter,
    height: 120,
    paddingTop: 20,
    paddingBottom: 20,
  },
  shareList: {
    flex: 1,
    ...st.acenter,
  },
  shareTop: {
    width: 50,
    height: 50,
    ...st.jacenter,
    borderRadius: 25,
    marginBottom: 10,
  },
  shareIcon: {
    fontSize: 20,
    color: '#fff',
  },
  shareText: {
    fontSize: 12,
    color: '#444',
  },
  shareBtn: {
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    height: 50,
    ...st.jacenter,
  },
  shareBtnText: {
    fontSize: 14,
    color: '#333',
  },
});
export default styles;
