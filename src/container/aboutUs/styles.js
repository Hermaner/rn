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
    color: '#666',
    paddingLeft: 10,
    paddingBottom: 50,
    borderWidth: 1,
    borderColor: '#eee',
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
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
  logoBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 15,
    marginBottom: 10,
  },
  title: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
export default styles;
