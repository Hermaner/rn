import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputs: {
    flex: 1,
    height: 80,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
  },
  textCount: {
    flex: 1,
    textAlign: 'right',
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  button: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: '#57B825',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
export default styles;
