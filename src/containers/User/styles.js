import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

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
    width: 110,
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
    margin: 15,
    height: 50,
    ...st.jacenter,
    borderRadius: 5,
  },
  submitBtnText: {
    color: '#fff',
    ...st.font16,
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
    ...st.frcenter,
    paddingLeft: 15,
    paddingRight: 15,
  },
  agreementView: {
    ...st.fr,
    ...st.acenter,
    flex: 1,
  },
  changeText: {
    fontSize: 14,
    color: Mcolor,
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
  otherView: {
    padding: 30,
  },
  otherTitle: {
    height: 60,
    ...st.jacenter,
  },
  otherTitleText: {
    fontSize: 15,
    color: '#333',
  },
  otherLists: {
    ...st.frcenter,
  },
  otherList: {
    flex: 1,
    ...st.acenter,
  },
  otherTop: {
    width: 60,
    height: 60,
    ...st.jacenter,
    borderRadius: 30,
    marginBottom: 10,
  },
  otherIcon: {
    fontSize: 30,
    color: '#fff',
  },
  otherText: {
    fontSize: 14,
    color: '#444',
  },
});
export default styles;
