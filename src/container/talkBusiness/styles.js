import { StyleSheet } from 'react-native';
import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  isConcern: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E5F5D9',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  isConcernLeft: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  isConcernRight: {
    fontSize: 16,
    color: '#57B924',
  },
  // footer: {
  //
  // },
  voice: {
    marginRight: 8,
  },
  addImg: {
    marginLeft: 10,
  },
  look: {
    marginLeft: 10,
  },
  talkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    fontSize: 14,
    height: 45,
  },
  add: {
    flexDirection: 'row',
    paddingTop: 40,
    height: 200,
    paddingRight: 25,
  },
  flexOne: {
    flex: 1,
    marginLeft: 25,
  },
  addIcn: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#eee',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  addText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
});
export default styles;
