import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  itemContent: {
    backgroundColor: '#fff',
  },
  itemList: {
    ...st.fr,
    ...st.jacenter,
    height: 45,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 20,
  },
  labelText: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
  distanceContent: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
  },
  distanceTitle: {
    ...st.utilsText,
    lineHeight: 20,
    height: 30,
  },
  distanceLabel: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  condition: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  input: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
  saveBtn: {
    margin: 10,
    backgroundColor: Mcolor,
  },
});
export default styles;
