import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceH } from '../../utils';

const styles = StyleSheet.create({
  content: {
    ...st.fr,
    flex: 1,
  },
  allTab: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 40,
    ...st.jacenter,
  },
  alltext: {
    color: '#444',
    fontSize: 14,
  },
  left: {
    width: 80,
    height: deviceH,
    backgroundColor: '#e9e9ef',
  },
  leftScroll: {
    flex: 1,
  },
  leftList: {
    height: 45,
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
  rightList: {
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingLeft: 10,
  },
  rightTitle: {
    height: 35,
    backgroundColor: '#fff',
    ...st.jcenter,
  },
  rightTitleText: {
    fontSize: 14,
    color: Mcolor,
    fontWeight: 'bold',
  },
  rightTabs: {
    ...st.fr,
    flexWrap: 'wrap',
  },
  rightTab: {
    width: '30%',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
    height: 40,
    borderRadius: 8,
    ...st.jacenter,
  },
});
export default styles;
