import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  content: {
    ...st.fr,
    flex: 1,
  },
  left: {
    width: 80,
    backgroundColor: '#e9e9ef',
  },
  leftScroll: {
    flex: 1,
  },
  leftList: {
    height: 80,
    borderLeftWidth: 2,
    borderLeftColor: '#e9e9ef',
    ...st.jacenter,
  },
  leftListCur: {
    backgroundColor: '#fff',
    borderLeftColor: Mcolor,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  right: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  list: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    ...st.frcenter,
    height: 80,
    paddingRight: 5,
  },
  imgView: {
    width: 60,
    height: 60,
    marginRight: 5,
  },
  img: {
    width: 60,
    height: 60,
  },
  labelView: {
    flex: 1,
    ...st.frcenter,
  },
  nameView: {
    height: 30,
    ...st.jcenter,
  },
  name: {
    fontSize: 15,
    color: '#222',
    marginBottom: 5,
  },
  label: {
    flex: 1,
    ...st.jcenter,
  },
  priceView: {
    ...st.fr,
  },
  price: {
    fontSize: 14,
    color: Mcolor,
  },
  unit: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    backgroundColor: '#f8f8f8',
    ...st.fr,
    ...st.jcenter,
  },
  footLeft: {
    flex: 1,
    ...st.jcenter,
    paddingLeft: 10,
  },
  footPriceLabel: {
    color: '#333',
    fontSize: 14,
  },
  footPrice: {
    color: Mcolor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footBtn: {
    backgroundColor: Mcolor,
    ...st.jacenter,
    width: 120,
  },
  footTips: {
    color: '#aaa',
    marginTop: 3,
    fontSize: 14,
  },
  footPriceView: {
    ...st.fr,
    ...st.acenter,
  },
  footBtnText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default styles;
