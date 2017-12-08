import { StyleSheet } from 'react-native';
import { Mgreen, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  Headerleft: {
    height: 44,
    width: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderMain: {
    flex: 1,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 5,
    marginLeft: 10,
    height: 30,
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
  },
  HeaderIcon: {
    color: '#666',
    fontSize: 18,
  },
  HeaderInput: {
    color: '#666',
    fontSize: 14,
    borderBottomColor: '#eee',
  },
  leftNav: {
    width: 90,
    borderWidth: 1,
  },
  mainText: {
    color: '#666',
    fontSize: 14,
  },
  leftNavList: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
  },
  leftNavListCur: {
    borderLeftColor: Mcolor,
    borderLeftWidth: 4,
    borderRightColor: '#fff',
  },
  leftNavTextCur: {
    color: Mcolor,
  },
  rightContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default styles;
