import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  pagebody: {
    flex: 1,
    // ...st.jacenter,
    borderRadius: 5,
    paddingTop: 10,
  },
  addBtn: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#aaa',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    paddingTop: 60,
    paddingBottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
