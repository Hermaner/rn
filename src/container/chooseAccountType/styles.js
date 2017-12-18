import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  detailInfo: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 15,
    paddingBottom: 15,
  },
  tuijian: {
    backgroundColor: '#65C32C',
    color: '#fff',
    fontSize: 16,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
    marginRight: 5,
  },
});
export default styles;
