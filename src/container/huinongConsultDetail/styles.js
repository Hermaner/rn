import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  flexOne: {
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
  flex: {
    flexDirection: 'row',
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
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
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
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  flexIcnRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  commentItem: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  upvote: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rightPart: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  commentTime: {
    fontSize: 10,
    color: '#999',
    marginBottom: 4,
  },
  readAll: {
    fontSize: 14,
    color: '#55B723',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#55B723',
    borderRadius: 4,
    marginTop: 10,
  },
});
export default styles;
