import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
    ...st.jacenter,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#00ff00'
    // alignItems: 'center',
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: '#64C42C',
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
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  imgPart: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  imgOne: {
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
    width: 40,
    height: 40,
    marginRight: 10,
  },
  exampleImg: {
    width: 80,
    height: 60,
    resizeMode: 'stretch',
  },
  logoBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  contant: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  returnIndex: {
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    color: '#666',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
  },
  contactService: {
    flex: 1,
  },
});
export default styles;
