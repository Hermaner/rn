import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputs: {
    height: 40,
    color: '#666',
    fontSize: 14,
  },
  getBox: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
  },
  get: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#64C22E',
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  tsHeader: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F8FEF2',
  },
  ts: {
    fontSize: 14,
    color: '#666',
  },
});
export default styles;
