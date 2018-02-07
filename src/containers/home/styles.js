import { StyleSheet, Dimensions } from 'react-native';
import { st, Mcolor } from '../../utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  ...st,
  swiperImage: {
    width,
    height: 200,
    backgroundColor: 'transparent',
    resizeMode: 'stretch',
  },
  navIconView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    paddingTop: 15,
    paddingBottom: 10,
    marginTop: -20,
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
  dl: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  normalIconView: {
    ...st.fr,
    padding: 6,
  },
  caseView: {
  },
  caseTitleView: {
    height: 45,
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