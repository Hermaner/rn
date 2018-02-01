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
  CheckBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  check: {
    marginRight: 15,
  },
});
export default styles;
