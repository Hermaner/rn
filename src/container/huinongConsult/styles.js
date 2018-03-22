import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
  },
  topBox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#E3F6D9',
  },
  topText: {
    fontSize: 14,
    color: '#666',
  },
  box: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  flexOne: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flexDirection: 'row',
  },
  goodsName: {
    fontSize: 18,
    color: '#333',
    marginBottom: 6,
  },
  goodsText: {
    fontSize: 14,
    color: '#666',
    marginRight: 20,
    marginBottom: 4,
  },
  minHeight: {
    minHeight: 60,
  },
  btnList: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnBox: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#56BA24',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  buttonBox: {
    backgroundColor: '#56BA24',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  wrapper: {
  },

  slide: {
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width,
    height: 200,
  },

  loadingView: {
    position: 'absolute',
    top: 70,
    left: (width / 2) - 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingImage: {
    width: 60,
    height: 60,
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
  newsImg: {
    width: 120,
    height: 80,
    marginLeft: 10,
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
  newsInfoBox: {
    width,
    position: 'absolute',
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  newsInfoText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  newsInfoSmallText: {
    color: '#fff',
    fontSize: 12,
  },
  newsInfoTime: {
    marginRight: 20,
  },
});
export default styles;
