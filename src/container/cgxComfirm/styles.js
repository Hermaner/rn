import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  list: {
    ...st.fr,
    paddingRight: 10,
    backgroundColor: '#fff',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    ...st.jacenter,
  },
  lastList: {
    marginBottom: 8,
    borderBottomColor: '#fff',
  },
  listTitle: {
    paddingLeft: 15,
  },
  listTitleText: {
    fontSize: 14,
    color: '#333',
  },
  listLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  listLabelText: {
    fontSize: 14,
    color: Mcolor,
  },
  listIcon: {
    fontSize: 18,
    marginLeft: 10,
    color: '#888',
  },
  memoView: {
    marginBottom: 8,
    backgroundColor: '#fff',
    padding: 10,
  },
  memoTitle: {
  },
  memoTitleText: {
    color: '#333',
    lineHeight: 20,
    fontSize: 14,
  },
  memoMain: {
  },
  memoMainInput: {
    lineHeight: 20,
    fontSize: 12,
    color: '#666',
    height: 60,
    padding: 0,
  },
  upView: {
    ...st.fr,
    ...st.jacenter,
    marginTop: 10,
  },
  imagesView: {
    ...st.fr,
    flexWrap: 'wrap',
  },
  imageListView: {
    position: 'relative',
  },
  imageDel: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    ...st.jacenter,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  selectType: {
    width: 0,
    height: 0,
    overflow: 'hidden',
  },
  imageDelIcon: {
    fontSize: 20,
    color: '#fff',
  },
  imageList: {
    marginTop: 10,
    marginRight: 10,
    width: 80,
    height: 80,
  },
  upViewImg: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  upViewText: {
    flex: 1,
    fontSize: 13,
    color: '#888',
  },
  btn: {
    height: 50,
    ...st.jacenter,
    backgroundColor: Mcolor,
    borderRadius: 3,
  },
  phoneInput: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    width: 200,
  },
});
export default styles;
