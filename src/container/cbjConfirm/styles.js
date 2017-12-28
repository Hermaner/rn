import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  list: {
    ...st.fr,
    paddingRight: 10,
    backgroundColor: '#fff',
    height: 45,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    ...st.jacenter,
  },
  demandVal: {
    fontSize: 14,
    color: Mcolor,
    paddingLeft: 5,
    textAlign: 'right',
    flex: 1,
  },
  mainText: {
    color: '#555',
    fontSize: 14,
  },
  listTitleText: {
    fontSize: 14,
    color: '#444',
    width: 80,
  },
  listRight: {
    ...st.fr,
    ...st.jacenter,
  },
  listRightText: {
    fontSize: 14,
    color: Mcolor,
  },
  demandIcon: {
    fontSize: 18,
    marginLeft: 5,
    color: '#888',
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
  btn: {
    backgroundColor: Mcolor,
    borderRadius: 3,
  },
  itemsTop: {
    padding: 10,
    backgroundColor: '#fff',
  },
  itemsTitle: {
    fontSize: 14,
    color: '#555',
    paddingBottom: 6,
  },
  itemsWrap: {
    ...st.fr,
    flexWrap: 'wrap',
  },
  itemList: {
    marginRight: 10,
    width: 70,
    marginBottom: 10,
  },
  checkBox: {
    position: 'absolute',
    top: 5,
    left: 45,
  },
  itemView: {
    position: 'relative',
  },
  itemImage: {
    width: 70,
    height: 70,
    marginBottom: 4,
  },
  itemName: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
  itemLabel: {
    fontSize: 10,
    color: Mcolor,
    textAlign: 'center',
  },
  memoView: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  memoViewTitle: {
    fontSize: 14,
    color: '#666',
    paddingBottom: 10,
  },
  memoInput: {
    fontSize: 12,
    color: '#666',
    height: 80,
  },
});
export default styles;
