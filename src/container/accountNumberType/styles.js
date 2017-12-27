import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pagebody: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRight: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  recommend: {
    backgroundColor: '#64C036',
    color: '#fff',
    fontSize: 14,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 4,
  },
  normalThreeText: {
    color: '#333',
    fontSize: 14,
  },
  normalSixText: {
    color: '#666',
    fontSize: 14,
  },
  normalNineText: {
    color: '#999',
    fontSize: 14,
  },
  icnImg: {
    width: 30,
    height: 30,
    marginRight: 4,
  },
});
export default styles;
