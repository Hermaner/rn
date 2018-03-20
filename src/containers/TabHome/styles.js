import { StyleSheet, Dimensions } from 'react-native';
import { st, Mcolor } from '../../utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  ...st,
  swiperImage: {
    width,
    height: width * 0.52, // 420 / 220
    backgroundColor: 'transparent',
    resizeMode: 'stretch',
  },
  navIconView: {
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 15,
    paddingBottom: 10,
    position: 'relative',
  },
  bigIconView: {
    ...st.fr,
  },
  dv: {
    overflow: 'hidden',
    height: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  dvImg: {
    height: 1,
    width: '100%',
  },
  normalIconView: {
    ...st.fr,
    padding: 6,
  },
  caseView: {
  },
  caseTitleView: {
    height: 45,
    marginBottom: 4,
    ...st.jacenter,
    backgroundColor: '#fff',
    position: 'relative',
  },
  caseTitleText: {
    fontSize: 14,
    color: '#555',
  },
  caseMore: {
    position: 'absolute',
    right: 10,
    height: 45,
    top: 0,
    ...st.jacenter,
  },
  caseMoreText: {
    color: Mcolor,
    fontSize: 12,
  },
});
export default styles;
