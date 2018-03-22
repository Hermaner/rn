import { StyleSheet, Dimensions } from 'react-native';
import { Mcolor } from '../../utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  pagebody: {
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
  imgView: {
    padding: 10,
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
    fontSize: 24,
    color: '#999',
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
    borderBottomColor: Mcolor,
  },
  relatedNews: {
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
    color: Mcolor,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: Mcolor,
    borderRadius: 4,
    marginTop: 10,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plBox: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  footerBox: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  modalTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    height: 200,
    width: width - 20,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalTitleText: {
    flex: 2,
    color: '#666',
    fontSize: 18,
    textAlign: 'right',
    marginRight: 40,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    fontSize: 14,
    flex: 1,
    color: '#666',
    textAlignVertical: 'top',
  },
  contentText: {
    fontSize: 12,
    color: '#444',
    lineHeight: 22,
  },
  submitBox: {
    backgroundColor: Mcolor,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
export default styles;
