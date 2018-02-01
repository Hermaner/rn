import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  userImg: {
    width: '100%',
    height: 150,
  },
  title: {
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
});
export default styles;
