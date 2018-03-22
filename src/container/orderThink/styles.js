import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  firstBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerImg: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    height: 60,
    fontSize: 14,
    color: '#666',
    textAlignVertical: 'top',
  },
  imgBox: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  exampleImg: {
    width: 80,
    height: 60,
    resizeMode: 'stretch',
  },
  thinkBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  thinkBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  businessBox: {
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  clickColor: {
    color: '#ddd',
  },
  icnClickColor: {
    color: '#5AB924',
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  textChoose: {
    color: '#fff',
  },
  backGroundChoose: {
    backgroundColor: '#5AB924',
  },
  BtnBox: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Mcolor,
    borderRadius: 5,
  },
  typeBox: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  oneBox: {
    height: 35,
    ...st.jacenter,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    marginBottom: 6,
  },
  oneBoxChoose: {
    backgroundColor: Mcolor,
  },
  oneText: {
    fontSize: 14,
    color: '#666',
  },
  oneTextChoose: {
    color: '#fff',
  },
});
export default styles;
