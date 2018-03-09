import { StyleSheet } from 'react-native';
import { st, Mcolor, deviceW } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  topView: {
    backgroundColor: Mcolor,
    height: deviceW * 0.5,
  },
  topIconView: {
    ...st.fr,
    marginTop: 50,
    marginRight: 10,
    justifyContent: 'flex-end',
    height: 50,
  },
  topIcon: {
    fontSize: 28,
    color: '#fff',
    marginRight: 14,
  },
  userAllView: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: -(deviceW * 0.25),
  },
  userView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
    zIndex: 9,
  },
  userTop: {
    height: 80,
    padding: 10,
    ...st.frcenter,
  },
  userImgView: {
    width: 60,
    height: 60,
    marginRight: 10,
    overflow: 'hidden',
    borderRadius: 30,
  },
  userImg: {
    width: 60,
    height: 60,
  },
  userNameView: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  topPage: {
    ...st.fr,
    padding: 10,
  },
  topPageList: {
    flex: 1,
    ...st.jacenter,
  },
  topText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  topBoldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    lineHeight: 22,
  },
  memberView: {
    ...st.frcenter,
    position: 'relative',
    zIndex: 1,
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#000',
    paddingTop: 28,
    marginTop: -20,
  },
  glod: {
    color: '#FFD700',
    fontSize: 15,
    marginRight: 4,
  },
  memberText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  memberRightText: {
    color: '#fff',
    fontSize: 12,
  },
  memberArr: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
  applyView: {
    backgroundColor: '#fff',
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    ...st.frcenter,
  },
  applyName: {
    fontSize: 15,
    color: '#444',
    flex: 1,
  },
  applyStatus: {
    fontSize: 14,
    color: 'green',
  },
  roleView: {
    backgroundColor: '#fff',
    marginTop: 8,
    ...st.frcenter,
  },
  roleTOp: {
    flex: 1,
  },
  roleList: {
    flex: 1,
    height: 60,
    ...st.frcenter,
  },
  roleBorder: {
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  roleText: {
    fontSize: 14,
    marginRight: 6,
    color: '#555',
  },
  roleColor: {
    width: 36,
    height: 36,
    backgroundColor: '#f36150',
    borderRadius: 18,
    ...st.jacenter,
  },
  roleColor2: {
    width: 34,
    height: 34,
    backgroundColor: '#6a84b1',
    borderRadius: 17,
    ...st.jacenter,
  },
  topRoleIcon: {
    fontSize: 22,
    color: '#fff',
  },
  order: {
    marginTop: 8,
    backgroundColor: '#fff',
  },
  orderText: {
    fontSize: 14,
    color: '#555',
  },
  orderTop: {
    height: 45,
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingRight: 6,
    borderBottomColor: '#e5e5e5',
    ...st.frcenter,
  },
  orderTitle: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  orderTopRight: {
    ...st.frcenter,
  },
  orderTopText: {
    fontSize: 12,
    color: '#888',
    marginRight: 3,
  },
  arr: {
    fontSize: 18,
    color: '#666',
    marginLeft: 4,
  },
  orderPage: {
    ...st.frcenter,
    paddingTop: 10,
    paddingBottom: 10,
  },
  orderItem: {
    paddingTop: 6,
    paddingBottom: 6,
    flex: 1,
    ...st.jacenter,
  },
  orderItemTop: {
    position: 'relative',
    marginBottom: 5,
  },
  orderItemIcon: {
    fontSize: 30,
    color: '#888',
  },
  orderItemBadge: {
    backgroundColor: '#ff0000',
    ...st.jacenter,
    height: 14,
    paddingLeft: 4,
    paddingRight: 4,
    position: 'absolute',
    borderRadius: 7,
    right: -7,
    top: -2,
  },
  orderItemNum: {
    fontSize: 11,
    color: '#fff',
  },
  iconsPage: {
    ...st.fr,
    marginTop: 8,
    paddingTop: 10,
    paddingBottom: 10,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  iconsItem: {
    width: '25%',
    paddingTop: 10,
    paddingBottom: 10,
    ...st.jacenter,
  },
  iconsTop: {
    width: 40,
    height: 40,
    backgroundColor: '#f36150',
    marginBottom: 8,
    borderRadius: 20,
    ...st.jacenter,
  },
  iconsIcon: {
    fontSize: 26,
    color: '#fff',
  },
  ModalStyle: {
    backgroundColor: '#fff',
    height: 150,
  },
  modalView: {
    flex: 1,
  },
  shareLists: {
    ...st.frcenter,
    backgroundColor: '#f8f8f8',
    height: 100,
    paddingTop: 20,
    paddingBottom: 20,
  },
  shareList: {
    flex: 1,
    ...st.acenter,
  },
  shareTop: {
    width: 50,
    height: 50,
    ...st.jacenter,
    borderRadius: 30,
    marginBottom: 10,
  },
  shareIcon: {
    fontSize: 20,
    color: '#fff',
  },
  shareText: {
    fontSize: 12,
    color: '#444',
  },
  shareBtn: {
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    height: 50,
    ...st.jacenter,
  },
  shareBtnText: {
    fontSize: 14,
    color: '#333',
  },
});
export default styles;
