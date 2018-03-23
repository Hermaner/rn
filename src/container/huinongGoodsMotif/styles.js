import { StyleSheet, Dimensions } from 'react-native';
import { Mcolor, st } from '../../utils';

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
  publicBorder: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabView: {
    flex: 1,
    height: 50,
    ...st.jacenter,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  tabText: {
    color: '#555',
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
  goodsItem: {
    width: '50%',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 3,
  },
  goodsImage: {
    width: width / 2 - 20,
    height: width / 2 - 20,
    marginRight: 10,
  },
  goodsName: {
    color: '#333',
    fontSize: 16,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goodsTypeCenter: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B8860B',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  goodsTypeText: {
    fontSize: 18,
    color: '#fff',
  },
  specialItem: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    padding: 10,
  },
});
export default styles;
