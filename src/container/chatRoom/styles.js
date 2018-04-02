import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  chatTop: {
    ...st.frcenter,
    height: 80,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    margin: 5,
  },
  chatTopImgView: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  chatTopImg: {
    width: 60,
    height: 60,
  },
  topName: {
    marginBottom: 10,
  },
  topNameText: {
    color: '#333',
    fontSize: 14,
  },
  topPrice: {
    ...st.frcenter,
    height: 28,
  },
  topPriceText: {
    color: Mcolor,
    fontSize: 14,
    flex: 1,
  },
  topBtn: {
    backgroundColor: Mcolor,
    height: 26,
    width: 60,
    borderRadius: 4,
    marginLeft: 20,
    ...st.jacenter,
  },
  topBtnText: {
    color: '#fff',
    fontSize: 12,
  },

});
export default styles;
