import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  accountView: {
    height: 50,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  account: {
    color: '#666',
    fontSize: 14,
    borderBottomColor: '#eee',
  },
  password: {
    color: '#666', fontSize: 14, height: 40,
  },
  formBom: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    height: 30,
    width: 100,
    padding: 0,
    ...st.jacenter,
    marginRight: 10,
    backgroundColor: Mcolor,
  },
  sendBtnText: {
    color: '#888', fontSize: 12,
  },
  submitBtn: {
    backgroundColor: Mcolor,
    marginTop: 15,
    height: 45,
    borderRadius: 5,
  },
  submitBtnText: {
    color: '#fff', fontSize: 16,
  },
  switchView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchLabel: {
    fontSize: 12,
    color: '#444',
  },
  switchBtn: {
    backgroundColor: '#fff',
    height: 30,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    marginTop: 14,
  },
  switchBtnText: {
    fontSize: 14,
    color: Mcolor,
  },
  bottomView: {
  },
  agreementView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  agreementLabel: {
    color: '#888', fontSize: 10,
  },
  agreementText: {
    color: Mcolor, fontSize: 10,
  },
  bottomTipsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomTipsLabel: {
    color: '#666', fontSize: 12,
  },
  bottomTipsText: {
    color: Mcolor, fontSize: 12,
  },
});
export default styles;
