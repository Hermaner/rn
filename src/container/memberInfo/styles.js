import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  realNameText: {
    flex: 1,
    ...st.frcenter,
    fontSize: 14,
    color: '#333',
  },
  rowBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 50,
    ...st.frcenter,
    marginLeft: 30,
    marginRight: 30,
  },
  storeRowBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    ...st.frcenter,
    marginLeft: 30,
    marginRight: 30,
  },
  settingBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  chooseAdress: {
    fontSize: 14,
    color: '#444',
  },
  button: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    height: 50,
    ...st.jacenter,
    backgroundColor: Mcolor,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  inputs: {
    flex: 1,
    height: 40,
    color: '#444',
    fontSize: 15,
    paddingLeft: 0,
  },
  lookForImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  setPassword: {
    fontSize: 14,
    color: '#333',
  },
  imgBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  getBox: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
  },
  get: {
    fontSize: 14,
    color: '#666',
  },
  leftText: {
    width: 90,
    color: '#333',
    fontSize: 14,
  },
  tabView: {
    ...st.frcenter,
  },
  tabText: {
    color: '#888',
    flex: 1,
    fontSize: 14,
  },
  tabTextChoose: {
    color: '#333',
    flex: 1,
    fontSize: 14,
  },
  tabTextCur: {
    color: '#333',
    flex: 1,
    fontSize: 14,
  },
  arr: {
    fontSize: 16,
    color: '#666',
  },
  rowBox2: {
    ...st.fr,
    marginLeft: 30,
    marginRight: 30,
  },
  labelAddress: {
    marginTop: 15,
    color: '#444',
    fontSize: 14,
    width: 90,
  },
  inputAddress: {
    flex: 1,
    height: 80,
    color: '#333',
    marginTop: 8,
    textAlignVertical: 'top',
    fontSize: 14,
    lineHeight: 20,
    paddingLeft: 0,
  },
});
export default styles;
