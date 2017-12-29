import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pagebody: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  normalText: {
    color: '#333',
    fontSize: 14,
    marginBottom: 8,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 8,
  },
  inputs: {
    height: 80,
    borderWidth: 1,
    borderColor: '#eee',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  leftBtn: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#56B925',
  },
  rightBtn: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#14B6F5',
  },
});
export default styles;
