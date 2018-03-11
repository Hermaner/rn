import { StyleSheet } from 'react-native';
import { st } from '../utils';

const styles = StyleSheet.create({
  ModalStyle: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    ...st.jcenter,
  },
  modalView: {
    height: 100,
    marginTop: 200,
    ...st.frcenter,
  },
  shareList: {
    flex: 1,
    ...st.acenter,
  },
  shareTop: {
    width: 80,
    height: 80,
    ...st.jacenter,
    borderRadius: 40,
    marginBottom: 10,
  },
  shareIcon: {
    fontSize: 35,
    color: '#fff',
  },
  shareText: {
    fontSize: 12,
    color: '#fff',
  },
});
export default styles;
