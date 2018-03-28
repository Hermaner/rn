import { StyleSheet, Dimensions } from 'react-native';
import { Mcolor, st, Sgreen } from '../../utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  image: {
    width,
    height: 160,
  },
  flexOne: {
    flex: 1,
  },
  listView: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  publicBorder: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabs: {
    ...st.frcenter,
    height: 45,
    marginTop: 5,
    backgroundColor: Mcolor,
  },
  tabView: {
    flex: 1,
    height: 50,
    ...st.jacenter,
  },
  tabText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  tabTextChoose: {
    color: Mcolor,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  goods: {
    marginTop: 10,
    marginBottom: 20,
  },
  goodsTitle: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  goodsTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Mcolor,
    textAlign: 'center',
  },
  box: {
    width: width / 2,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 3,
  },
  goodsItem: {
    flex: 1,
  },
  goodsImage: {
    width: width / 2 - 20,
    height: width / 2 - 20,
  },
  goodsName: {
    // flex: 1,
    color: '#333',
    fontSize: 14,
    marginTop: 5,
  },
  userName: {
    fontSize: 13,
    marginBottom: 5,
    color: '#888',
  },
  btnBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnB: {
    backgroundColor: '#35B936',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  goodsTypeBox: {
    ...st.frcenter,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
  },
  goodsTypeCenter: {
    height: 50,
    ...st.jacenter,
  },
  goodsTypeText: {
    fontSize: 18,
    color: Mcolor,
    fontWeight: 'bold',
  },
  chatBox: {
    height: 35,
    ...st.jacenter,
    backgroundColor: Mcolor,
  },
  chatText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  priceBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  needCount: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: Sgreen,
  },
  unit: {
    color: Mcolor,
    fontSize: 14,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bigImgBox: {
    width,
    height: 160,
  },
  imgBox: {
    width: width / 2 - 20,
    height: width / 2 - 20,
    marginRight: 10,
  },
});
export default styles;
