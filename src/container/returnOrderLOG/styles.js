import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  firstBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  secendBox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  img: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginTop: 10,
  },
  icn: {
    fontSize: 18,
    color: '#666',
    marginLeft: 10,
  },
  rowBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
