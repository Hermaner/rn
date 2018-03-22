import { StyleSheet } from 'react-native';
import { st, Mcolor, Mgreen } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  storeImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  goShopBox: {
    height: 35,
    ...st.jcenter,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
  },
  goShopText: {
    fontSize: 14,
    color: '#fff',
  },
  topBox: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: Mgreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  bigBox: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexRow: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  scoreBox: {
    flex: 1,
    flexDirection: 'row',
  },
  scoreTopText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Mgreen,
  },
  scoreBottomText: {
    fontSize: 12,
    color: Mgreen,
    alignSelf: 'flex-end',
  },
  commentBox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentRow: {
    marginLeft: 10,
    marginRight: 10,
  },
  commentTopText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  commentBottomText: {
    fontSize: 16,
    color: Mgreen,
    textAlign: 'center',
  },
  typeBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  typeScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Mcolor,
    textAlign: 'center',
  },
  typeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  typeComment: {
    marginTop: 6,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
export default styles;
