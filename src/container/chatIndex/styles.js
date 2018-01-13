import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  pagebody: {
    backgroundColor: '#fff',
    flex: 1,
    ...st.jacenter,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    paddingTop: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  pageTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userName: {
    color: '#666',
    fontSize: 14,
    marginTop: 10,
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
  },
  inputs: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
  },
  typeChooseTitleBox: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  typeChooseTitle: {
    flex: 1,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  typeBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingRight: 10,
  },
  typeTitleBox: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginLeft: 14,
    marginBottom: 14,
    borderRadius: 6,
  },
  typeTitle: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: Mcolor,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  prompt: {
    marginTop: 10,
  },
  promptInfo: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
  typeChoose: {
    backgroundColor: Mcolor,
    borderColor: Mcolor,
  },
  identity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  identityOne: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderColor: '#eee',
    borderRadius: 5,
  },
  headerImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  isChooseBackground: {
    backgroundColor: Mcolor,
    borderColor: Mcolor,
  },
  isChooseText: {
    color: '#fff',
  },
  identityText: {
    color: '#666',
    fontSize: 14,
  },
});
export default styles;
