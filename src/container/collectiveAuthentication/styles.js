import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  pagebody: {
    flex: 1,
    // ...st.jacenter,
    borderRadius: 5,
  },
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  rowBoxLeft: {
    color: '#666',
    fontSize: 14,
  },
  rowBoxRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chooseAccount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
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
  inputText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 15,
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
  },
  imgPart: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  imgOne: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  uploadImg: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  exampleImg: {
    width: 80,
    height: 60,
    resizeMode: 'stretch',
  },
  child1Photo: {
    padding: 10,
    backgroundColor: '#fff',
  },
  btnChoose: {
    backgroundColor: '#cccc',
  },
});
export default styles;
