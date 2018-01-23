import { StyleSheet, Dimensions } from 'react-native';

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
  textBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#8BCE21',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  tabTextChoose: {
    color: '#8BCE21',
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
    color: '#F0B527',
    textAlign: 'center',
  },
  goodsItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  goodsImage: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  goodsName: {
    color: '#333',
    fontSize: 16,
  },
  userName: {
    fontSize: 14,
    color: '#666',
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
});
export default styles;
