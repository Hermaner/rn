import { StyleSheet } from 'react-native';
import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  pagebody: {
    backgroundColor: '#fff',
    flex: 1,
    ...st.jacenter,
    paddingBottom: 100,
  },
  icnBox: {
    marginBottom: 60,
  },
  flexJ: {
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  successIcn: {
    fontSize: 100,
    color: '#8BCE21',
    textAlign: 'center',
  },
  title: {
    color: '#666',
    fontSize: 16,
    marginBottom: 10,
  },
  btnBox: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 160,
    paddingRight: 160,
    backgroundColor: '#8BCE21',
    borderRadius: 5,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
});
export default styles;
