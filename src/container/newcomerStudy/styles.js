import { StyleSheet, Dimensions } from 'react-native';
import { Mcolor, st, Sgreen } from '../../utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  image: {
    width,
    height: 200,
  },
  flexOne: {
    flex: 1,
  },
  newsList: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  newsItem: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  NewsTextBox: {
    flex: 1,
  },
  newsTitle: {
    minHeight: 36,
    fontSize: 16,
    color: '#333',
    marginBottom: 25,
  },
  normalText: {
    fontSize: 12,
    color: '#666',
  },
  newsTime: {
    marginRight: 20,
  },
  newsImg: {
    width: 120,
    height: 80,
    marginLeft: 10,
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
});
export default styles;
