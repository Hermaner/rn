
import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
  },
  listSwipe: {

  },
  list: {
    marginBottom: 4,
    backgroundColor: '#fff',
    padding: 10,
    ...st.frcenter,
  },
  swipeBtn: {
    backgroundColor: '#ff0000',
    flex: 1,
    ...st.jacenter,
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  mid: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 14,
    color: '#333',
    lineHeight: 24,
  },
  price: {
    color: Mcolor,
    fontSize: 14,
    lineHeight: 24,
  },
  date: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
  },
  right: {
    alignItems: 'flex-end',
  },
  btn: {
    backgroundColor: Mcolor,
    height: 30,
    marginTop: 14,
    ...st.jacenter,
    width: 60,
  },
  btnText: {
    fontSize: 12,
    color: '#fff',
  },
});
export default styles;
