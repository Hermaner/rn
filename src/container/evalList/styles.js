import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  evalView: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  evalViewTop: {
    ...st.fr,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    ...st.jacenter,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  evalTopLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  evalTopRight: {
    ...st.fr,
    ...st.jacenter,
  },
  evalTopText: {
    marginRight: 5,
    fontSize: 12,
    color: '#666',
  },
  evalTopColor: {
    fontSize: 12,
    color: Mcolor,
  },
  evalTopIcon: {
    fontSize: 16,
    color: '#666',
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
});
export default styles;
