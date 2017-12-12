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
    justifyContent: 'space-between', flexDirection: 'row',
  },
  condition: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  input: {
    textAlign: 'center',
    ...st.utilsText,
  },
  saveBtn: {
    margin: 10,
    backgroundColor: Mcolor,
  },
});
export default styles;
