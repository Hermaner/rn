import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  list: {
    ...st.fr,
    paddingRight: 10,
    backgroundColor: '#fff',
    height: 45,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    ...st.jacenter,
  },
  demandVal: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 5,
    flex: 1,
  },
  mainText: {
    color: '#555',
    fontSize: 14,
  },
  listTitleText: {
    fontSize: 14,
    color: '#444',
    width: 60,
  },
  listRight: {
    ...st.fr,
    ...st.jacenter,
  },
  listRightText: {
    fontSize: 14,
    color: '#666',
  },
  demandIcon: {
    fontSize: 18,
    marginLeft: 5,
    color: '#888',
  },
  btn: {
    backgroundColor: Mcolor,
    borderRadius: 3,
  },
  selectType: {
    flexDirection: 'row',
    width: 0,
    height: 0,
    overflow: 'hidden',
    ...st.jacenter,
  },
});
export default styles;
