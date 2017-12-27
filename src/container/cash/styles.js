import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  pagebody: {
    flex: 1,
    borderRadius: 5,
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
  },
  rowBoxLeft: {
    marginRight: 10,
    color: '#333',
    fontSize: 14,
  },
  normalThree: {
    color: '#333',
    fontSize: 14,
  },
  normalNine: {
    color: '#999',
    fontSize: 14,
  },
  rowBoxRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  chooseAccount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#64C42C',
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  rightText: {
    fontSize: 12,
    color: '#65C12E',
    textAlign: 'right',
  },
  second: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  money: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  inputs: {
    fontSize: 32,
    color: '#333',
    fontWeight: 'bold',
  },
});
export default styles;
