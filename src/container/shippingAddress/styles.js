import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  adressItem: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  myAdressInfo: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  adress: {
    fontSize: 12,
    marginTop: 3,
    color: '#666',
  },
  setAdress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  checkBox: {
    marginRight: 20,
  },
  defaultAdress: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 6,
    paddingBottom: 6,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
  },
  btnText: {
    color: '#666',
    fontSize: 13,
  },
  btnRight: {
    backgroundColor: Mcolor,
    borderColor: 'transparent',
    marginLeft: 10,
  },
  btnRightText: {
    color: '#fff',
  },
  footerButton: {
    backgroundColor: Mcolor,
    height: 50,
    ...st.jacenter,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  footerButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#fff',
  },
});
export default styles;
