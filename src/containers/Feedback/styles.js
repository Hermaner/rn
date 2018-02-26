
import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  content: {
    ...st.jacenter,
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 30,
    paddingBottom: 10,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  listMemo: {
    lineHeight: 24,
    fontSize: 15,
    color: '#666',
    height: 120,
    backgroundColor: '#f2f2f2',
    margin: 10,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  btnView: {
    backgroundColor: Mcolor,
    margin: 10,
    marginTop: 10,
    height: 50,
    ...st.jacenter,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
});
export default styles;
