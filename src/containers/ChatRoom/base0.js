import React from 'react';
import Toast from 'react-native-simple-toast';
// import RNFetchBlob from 'react-native-fetch-blob';
import uuid from 'uuid';
import PropTypes from 'prop-types';

// const { CacheDir } = RNFetchBlob.fs.dirs;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      toUser: props.navigation.state.params.item,
      textInputHeight: 40,
      inputValue: '',
      refresh: false,
      currentPage: 1,
      pageSize: 30,
    };
  }
  getInit = () => {
    // const { toUser } = this.state;
    this.getData();
    // const path = `${CacheDir}/chatRoom${global.memberId}-${toUser.memberId}`;
    // RNFetchBlob.fs.unlink(path)
    // .then(() => { })
    // .catch(() => { });
    // RNFetchBlob.fs.exists(path)
    // .then((exist) => {
    //   if (!exist) {
    //     RNFetchBlob.fs.createFile(path, '', 'utf8');
    //   } else {
    //     RNFetchBlob.fs.readFile(path, 'utf8')
    //     .then((data) => {
    //       const items = data.split('^');
    //       items.splice(items.length - 1, 1);
    //       items.forEach((item, index) => {
    //         items[index] = JSON.parse(item);
    //       });
    //       console.log(items);
    //     });
    //   }
    // })
    // .catch(err => console.log(err));
  }
  getData = () => {
    const { toUser, currentPage, pageSize } = this.state;
    global.socketStore.socket.emit('messagedetail', {
      memberId: global.memberId,
      toMemberId: toUser.memberId,
      currentPage,
      pageSize,
    });
  }
  _onSubmitEditing = () => {
    this._userHasBeenInputed = true;
    const { toUser, inputValue } = this.state;
    if (!inputValue) {
      return;
    }
    const { memberId, userName, imgUrl } = global.userData;
    const { memberId: toMemberId, userName: toUserName, imgUrl: toImgUrl } = toUser;
    const data = {
      clientId: uuid.v4(),
      memberId,
      userName,
      imgUrl,
      toMemberId,
      toUserName,
      toImgUrl,
      message: inputValue,
      postDateStr: new Date().getTime(),
      type: 1,
    };
    // const path = `${CacheDir}/chatRoom${global.memberId}-${toUser.memberId}`;
    // RNFetchBlob.fs.appendFile(path, `${JSON.stringify(data)}^`, 'utf8').then((res) => {
    //   console.log(res);
    // });
    global.socketStore.socket.emit('message', data);
    this.setState({ inputValue: '' });
    this.chatListView.scrollToEnd();
  }
  _onRefresh = () => {
    const { currentPage } = this.state;
    this.setState({
      refresh: true,
      currentPage: currentPage + 1,
    }, this.getData);
  }
  _onPullMessage = () => {
    this._userReachEnd = false;
    this.setState({
      refresh: false,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
