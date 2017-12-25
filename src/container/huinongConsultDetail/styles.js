import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  titleBox: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBox: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  flexRight: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  normalNineText: {
    fontSize: 14,
    color: '#999',
  },
  normalSixText: {
    fontSize: 14,
    color: '#666',
  },
  normalThreeText: {
    fontSize: 14,
    color: '#333',
  },
  time: {
    marginRight: 10,
  },
  icn: {
    marginRight: 10,
  },
  zixun: {
    color: '#1E6DC5',
  },
  marginR: {
    marginRight: 20,
  },
  daodu: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F6F6F6',
  },
  content: {
    marginTop: 20,
  },
  relatedNewsBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#55B723',
  },
  relatedNews: {
    borderBottomWidth: 1,
    fontSize: 16,
    color: '#333',
  },
  allNews: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default styles;
