import { StyleSheet, Platform } from 'react-native';
import { Mcolor } from '../../utils';

const styles = StyleSheet.create({
  fixTop: {
    height: Platform.OS === 'ios' ? 99 : 79,
  },
  Headerleft: {
    height: 44,
    width: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderRightText: {
    color: Mcolor,
    fontSize: 14,
    marginLeft: 10,
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
  HeaderMainText: {
    color: '#999',
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  conditions: {
    height: 35,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  cdsList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightLine: {
    position: 'absolute',
    right: 0,
    top: 10,
    height: 15,
    width: 0.7,
    backgroundColor: '#ccc',
  },
  cddown: {
    color: '#666',
    fontSize: 12,
    marginLeft: 3,
  },
  cdsListText: {
    color: '#666',
    fontSize: 12,
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
    backgroundColor: '#f2f2f2',
  },
  listContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainText: {
    color: '#555',
    fontSize: 14,
  },
  leftNavList: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#f2f2f2',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
  },
  leftNavListCur: {
    borderLeftColor: Mcolor,
    borderRightColor: '#fff',
    backgroundColor: '#fff',
  },
  leftNavText: {
    color: '#555',
    fontSize: 14,
  },
  leftNavTextCur: {
    color: Mcolor,
  },
  rightContent: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  rightAll: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  rightContentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftColor: '#ddd',
    borderLeftWidth: 1,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  contetnTabView: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minWidth: '30%',
  },
});
export default styles;
