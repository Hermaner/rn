import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  password: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontSize: 14,
    color: '#666',
    paddingLeft: 10,
  },
  btnBigBox: {
    flex: 1,
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnBox: {
    flex: 1,
    height: 50,
    ...st.jacenter,
    backgroundColor: Mcolor,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
  },
});
export default styles;
