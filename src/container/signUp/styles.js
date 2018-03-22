import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  topBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topText: {
    fontSize: 14,
    color: '#666',
  },
  topTextChoose: {
    fontSize: 14,
    color: Mcolor,
  },
  icn: {
    fontSize: 14,
    color: '#666',
  },
  icnChoose: {
    fontSize: 14,
    color: Mcolor,
  },
  bodyBox: {
    backgroundColor: '#fff',
  },
  rowBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  threeRowBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    width: 100,
    fontSize: 14,
    color: '#666',
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: Mcolor,
    paddingLeft: 0,
  },
  threeText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  btnBox: {
    flex: 1,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    ...st.jcenter,
    backgroundColor: Mcolor,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
export default styles;
