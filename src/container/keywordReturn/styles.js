import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  flexOne: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  inputs: {
    height: 60,
    color: '#666',
    fontSize: 14,
    paddingLeft: 0,
    paddingTop: 0,
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
  leftText: {
    width: 80,
    color: '#666',
    fontSize: 14,
  },
  chooseAdress: {
    height: 40,
    lineHeight: 40,
    fontSize: 14,
    color: '#999',
  },
  button: {
    marginTop: 20,
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
    fontSize: 14,
  },
  defaultText: {
    color: '#666',
    fontSize: 14,
  },
  diffentText: {
    color: '#56BA24',
  },
  rightICn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  flex: {
    alignItems: 'flex-start',
  },
  switchBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  whatDm: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  whatContent: {
    fontSize: 14,
    color: '#444',
    paddingLeft: 10,
    paddingRight: 10,
  },
  footerButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  footerButtonBox: {
    backgroundColor: '#56BA24',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
  },
  footerButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
});
export default styles;
