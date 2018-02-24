import { StyleSheet } from 'react-native';
import { Mcolor, st, Mblue } from '../../utils';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    ...st.font24,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingLeft: 15,
  },
  accountView: {
    height: 50,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  account: {
    color: '#666',
    ...st.font14,
    borderBottomColor: '#eee',
  },
  password: {
    color: '#666', ...st.font14, height: 40,
  },
  formBom: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    height: 35,
    width: 120,
    padding: 0,
    ...st.jacenter,
    marginRight: 10,
    backgroundColor: Mcolor,
  },
  sendBtnCur: {
    backgroundColor: '#aaa',
  },
  sendBtnText: {
    color: '#fff', ...st.font14,
  },
  submitBtn: {
    backgroundColor: Mcolor,
    margin: 20,
    height: 50,
    borderRadius: 5,
  },
  submitBtnText: {
    color: '#fff', ...st.font16,
  },
  switchView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchLabel: {
    ...st.font14,
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
    ...st.font14,
    color: Mcolor,
  },
  bottomView: {
  },
  agreementView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  agreementLabel: {
    color: '#888', ...st.font12,
  },
  agreementText: {
    color: Mcolor, ...st.font12,
  },
  bottomTipsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomTipsLabel: {
    color: '#666', ...st.font12,
  },
  bottomTipsText: {
    color: Mcolor, ...st.font12,
  },
});
export default styles;
