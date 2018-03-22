import { StyleSheet } from 'react-native';
import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  leftIcn: {
    marginRight: 10,
    fontSize: 14,
  },
  rightIcn: {
    flex: 1,
    textAlign: 'center',
  },
  visitText: {
    fontSize: 14,
    color: '#333',
  },
  footerBox: {
    backgroundColor: '#57B924',
    paddingTop: 15,
    paddingBottom: 15,
  },
});
export default styles;
