import { StyleSheet } from 'react-native';
import { Mgreen, st } from '../../utils';

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
  },
  lookForGoods: {

  },
  noun: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#333',
  },
  imgBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lookForImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  lookForBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: -20,
    marginLeft: -20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#8CCB23',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#fff',
  },
  sellBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: -20,
    marginLeft: -20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#8DBDEA',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#fff',
  },
  lookForText: {
    color: '#fff',
    textAlign: 'center',
  },
  orBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
});
export default styles;
