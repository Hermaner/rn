import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  evalView: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  evalViewBom: {
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  evalMainText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  evalDateText: {
    lineHeight: 30,
    fontSize: 13,
    color: '#888',
  },
  evalMain: {
    ...st.fr,
    ...st.jacenter,
    marginTop: 5,
    marginBottom: 5,
  },
  evalMainLeft: {
    ...st.fr,
    flex: 1,
    ...st.acenter,
  },
  evalMainCount: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
  },
  evalMainName: {
    fontSize: 12,
    color: '#333',
  },
  evalImages: {
    ...st.fr,
    flexWrap: 'wrap',
  },
  evalImagesList: {
    ...st.acenter,
    width: 60,
    marginTop: 10,
    marginRight: 5,
  },
  evalImage: {
    width: 60,
    height: 60,
  },
});
export default styles;
