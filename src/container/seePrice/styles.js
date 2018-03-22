import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listInem: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopColor: '#1E9537',
    borderTopWidth: 1,
  },
  normalText: {
    color: '#333',
    fontSize: 14,
  },
  dText: {
    color: '#FC8521',
    fontSize: 14,
  },
  textRight: {
    flex: 1,
    textAlign: 'right',
  },
  boxRight: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btnLeftBox: {
    backgroundColor: '#1E9537',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
    marginLeft: 10,
  },
  btnRightBox: {
    backgroundColor: '#EE7921',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
    marginLeft: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
  isOver: {
    borderTopColor: '#1E9537',
    borderTopWidth: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  isOverText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 50,
  },
});
export default styles;
