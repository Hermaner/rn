import { StyleSheet } from 'react-native';
// import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  newsItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  leftText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  rightIcn: {
    textAlign: 'right',
    marginLeft: 20,
    fontSize: 16,
  },
  newsTime: {
    color: '#666',
  },
});
export default styles;
