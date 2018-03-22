import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  rightTextBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rightText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: '#999',
  },
  myIcn: {
    fontSize: 18,
    color: '#666',
    marginLeft: 5,
  },
  flexOne: {
    flex: 1,
  },
});
export default styles;
