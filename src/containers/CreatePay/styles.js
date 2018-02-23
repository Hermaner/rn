import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  topPrice: {
    backgroundColor: '#fff',
    height: 120,
    ...st.jacenter,
  },
  PriceView: {
    ...st.frcenter,
  },
  priceLabel: {
    color: Mcolor,
    fontSize: 18,
  },
  priceValue: {
    color: Mcolor,
    fontSize: 34,
  },
  orderView: {
    paddingTop: 2,
  },
  orderLabel: {
    color: '#555',
    fontSize: 14,
  },
  cardBox: {
    marginTop: 8,
  },
  cardView: {
    ...st.fr,
    flex: 1,
    ...st.acenter,
  },
  cardImg: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
  },
  btnView: {
    margin: 20,
    height: 46,
    ...st.jacenter,
    backgroundColor: Mcolor,
  },
  btnViewText: {
    fontSize: 16,
    color: '#fff',
  },
  tips: {
    borderWidth: 1,
    borderColor: Mcolor,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    margin: 20,
  },
  tipsText: {
    fontSize: 12,
    lineHeight: 22,
    color: '#666',
  },
});
export default styles;
