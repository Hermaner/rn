import { StyleSheet } from 'react-native';
import { Mcolor, st, px, spx } from '../../utils';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    ...st.font24,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  accountView: {
    height: px(50),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  account: {
    color: '#666',
    ...st.font14,
    borderBottomColor: '#eee',
  },
  password: {
    color: '#666', ...st.font14, height: px(40),
  },
  formBom: {
    height: px(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    height: px(40),
    width: spx(120),
    padding: 0,
    ...st.jacenter,
    marginRight: 10,
    backgroundColor: Mcolor,
  },
  sendBtnText: {
    color: '#888', ...st.font14,
  },
  submitBtn: {
    backgroundColor: Mcolor,
    marginTop: 15,
    height: px(45),
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
    height: px(30),
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
