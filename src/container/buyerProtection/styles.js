import { StyleSheet, Dimensions } from 'react-native';
import { st, Mcolor, Mred } from '../../utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  ...st,
  firstImg: {
    width: '100%',
  },
  swiperBox: {
    height: 240,
    backgroundColor: '#E9E9E9',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  wrapper: {
    flex: 1,

  },
  slide: {
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  swiperImage: {
    width,
    height: 200,
    backgroundColor: 'transparent',
    resizeMode: 'stretch',
  },
  footerImg: {
    width,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
  leftBtn: {
    height: 50,
    ...st.jacenter,
    backgroundColor: Mred,
  },
  rightBtn: {
    height: 50,
    ...st.jacenter,
    backgroundColor: Mcolor,
  },
  footerBackground: {
    backgroundColor: '#f8f8f8',
  },
});
export default styles;
