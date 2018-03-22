import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputs: {
    flex: 1,
    height: 40,
    color: '#666',
    fontSize: 14,
    paddingLeft: 0,
  },
  lookForImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    width: 70,
    color: '#333',
    fontSize: 14,
  },
  chooseAdress: {
    // height: 40,
    // lineHeight: 40,
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
});
export default styles;
