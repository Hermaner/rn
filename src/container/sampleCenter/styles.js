import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  userImg: {
    width: '100%',
    height: 150,
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputBox: {
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  inputText: {
    // height: 40,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#ddd',
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  checkChoose: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 8,
  },
  check: {
    marginRight: 15,
  },
  imgBox: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  newUpImages: {
    width: 80,
    height: 60,
    resizeMode: 'stretch',
  },
  inputFooter: {
    fontSize: 14,
    color: '#666',
    borderColor: '#eee',
    borderWidth: 1,
  },
  btnBigbox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  btnbox: {
    backgroundColor: '#65C12E',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
});
export default styles;
