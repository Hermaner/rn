import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  individual: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  individualTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  individualImg: {
    width: 80,
    height: 60,
    marginRight: 15,
  },
  individualText: {
    flex: 1,
  },
  individualBottom: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  half: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  getImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  getText: {
    fontSize: 14,
    color: '#666',
  },
  rightPart: {
    justifyContent: 'flex-end',
  },
  individualBtn: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    paddingBottom: 15,
  },
  btnBox: {
    backgroundColor: Mcolor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
  },
  btnBoxBackGround: {
    backgroundColor: '#ccc',
  },
  individualBtnText: {
    color: '#fff',
    fontSize: 18,
    borderRadius: 40,
    textAlign: 'center',
  },
});
export default styles;
