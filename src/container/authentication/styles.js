import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  inputs: {
    height: 40,
    color: '#666',
    fontSize: 14,
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
  text: {
    fontSize: 14,
    color: '#333',
  },
  footerButton: {
    backgroundColor: '#8ECD24',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  footerButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  footerText: {
    marginTop: 10,
  },
  flexOne: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  footerTopLeft: {
    fontSize: 12,
    color: '#666',
  },
  footerTopRight: {
    fontSize: 12,
    color: '#8ECD24',
  },
  footerBottom: {
    color: '#666',
    fontSize: 14,
  },
  footerBottomRight: {
    color: '#8ECD24',
    fontSize: 14,
  },
  formBom: {
    backgroundColor: '#fff',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4,
  },
  password: {
    color: '#666', fontSize: 14, height: 40,
  },
  sendBtn: {
    height: 30,
    width: 100,
    padding: 0,
    ...st.jacenter,
    marginRight: 10,
    backgroundColor: '#ddd',
  },
  sendBtnText: {
    color: '#888', fontSize: 12,
  },
});
export default styles;
