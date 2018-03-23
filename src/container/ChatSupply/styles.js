import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  goodsDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
  },
  goodsPrice: {
    ...st.frcenter,
    height: 40,
  },
  goodsitem: {
    backgroundColor: '#fff',
  },
  readPeople: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  renovateTime: {
    flex: 1,
    textAlign: 'right',
    color: '#666',
    fontSize: 14,
  },
  btnList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnBox: {
    width: 60,
    height: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    marginLeft: 10,
    ...st.jacenter,
  },
  btnText: {
    fontSize: 14,
    color: '#333',
  },
  btnChoose: {
    backgroundColor: Mcolor,
    borderColor: Mcolor,
  },
  btnTextChoose: {
    color: '#fff',
  },
  goodsImg: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  bomFixedView: {
    height: 0,
    position: 'relative',
  },
  bomFixedBtn: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    backgroundColor: Mcolor,
    position: 'absolute',
    right: 10,
    bottom: 40,
    borderRadius: 25,
    ...st.jacenter,
  },
  bomFixedText: {
    fontSize: 14,
    color: '#fff',
  },
});
export default styles;
