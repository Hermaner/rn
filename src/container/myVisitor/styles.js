import { StyleSheet } from 'react-native';
import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  visitData: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#17B4EF',
    paddingLeft: 10,
  },
  visitorInfo: {

  },
  visitorType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flexOneleft: {
    flex: 1,
    // textAlign: 'center',
    fontSize: 14,
    color: '#666',
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexTextColor: {
    color: '#666',
  },
  flexOneCenter: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexOneRight: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: '#666',
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
export default styles;
