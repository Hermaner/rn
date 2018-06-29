import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    ...st.font24,
    fontWeight: 'bold',
  },
  topView: {
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  topLabel: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  accountView: {
    height: 60,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  account: {
    color: '#666',
    ...st.font14,
  },
  password: {
    color: '#666', ...st.font14, height: 40,
  },
  formBom: {
    height: 60,
    ...st.frcenter,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  sendBtn: {
    height: 40,
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
    color: '#666',
    fontSize: 14,
  },
  agreementText: {
    color: Mcolor,
    fontSize: 14,
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
    height: 100,
  },
  otherTop: {
    width: 40,
    height: 40,
    ...st.jacenter,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  otherIcon: {
    fontSize: 40,
    color: '#fff',
  },
  otherText: {
    fontSize: 14,
    color: '#444',
  },
  bindContent: {
    marginLeft: 30,
    marginRight: 30,
  },
  infoTop: {
    height: 110,
    marginTop: 30,
    ...st.jacenter,
  },
  infoImgView: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
    overflow: 'hidden',
  },
  infoImg: {
    width: 80,
    height: 80,
  },
  infoName: {
    fontSize: 14,
    color: '#333',
  },
});
export default styles;
