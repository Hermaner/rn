import { StyleSheet } from 'react-native';
import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  topPart: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 25,
    backgroundColor: '#fff',
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  QRCode: {
    width: 70,
    height: 70,
  },
  name: {
    color: '#333',
    fontSize: 14,
    marginBottom: 10,
  },
  status: {
    color: '#666',
    fontSize: 14,
  },
  isAccreditation: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myBusiness: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
  },
  accreditationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  accreditationText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 5,
  },
  RightPart: {
    flex: 1,
    textAlign: 'right',
  },
  flexBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flexOneTextLeft: {
    flex: 1,
    color: '#666',
    fontSize: 14,
  },
  flexOneTextRight: {
    flex: 1,
    color: '#666',
    fontSize: 14,
    textAlign: 'right',
  },
  goodsDetail: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderWidth: 1,
  },
  goodsPrice: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  type: {
    marginTop: 10,
  },
});
export default styles;
