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
  },
  rowBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  marginTopBottom: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FD4300',
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  boxLeft: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  boxRight: {
    flex: 1,
    textAlign: 'right',
    color: '#666',
    fontSize: 14,
  },
});
export default styles;
