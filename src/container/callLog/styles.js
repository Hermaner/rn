import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  box: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  imgBox: {
    width: 60,
    marginRight: 10,
  },
  headerImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
  },
  rowBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  lable: {
    fontSize: 14,
    color: '#999',
  },
  place: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  peopleType: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  borderBox: {
    height: 30,
    width: 30,
    ...st.jacenter,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Mcolor,
  },
  listContent: {
    flex: 1,
  },
  icnText: {
    fontSize: 14,
    color: Mcolor,
    marginLeft: 6,
  },
  icnTextChoose: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  mainIconFont: {
    fontSize: 20,
    color: Mcolor,
  },
  mainIconFontChoose: {
    fontSize: 20,
    color: Mcolor,
  },
  topBox: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flexOne: {
    flex: 1,
  },
});
export default styles;
