import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { CreateMasterAuthService, CreateBmMarketCredentialsService, CreateDecorationCredentialsService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { images, type } = this.props.navigation.state.params;
    this.state = {
      type,
      initImages: images,
      upImages: [],
    };
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
  }
  save = () => {
    const { upImages, type } = this.state;
    if (upImages.length === 0) {
      Toast.show('请上传图片');
      return;
    }
    this.sleek.toggle();
    if (type === 1) {
      this.CreateMasterAuthService(upImages);
    } else if (type === 2) {
      this.CreateBmMarketCredentialsService(upImages);
    } else if (type === 3) {
      this.CreateDecorationCredentialsService(upImages);
    }
  }
  CreateMasterAuthService = (upImages) => {
    CreateMasterAuthService({
      masterId: global.masterId,
      imgUrls: upImages.map(item => item.key).join(','),
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('上传成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  CreateBmMarketCredentialsService = (upImages) => {
    CreateBmMarketCredentialsService({
      bmMarketId: global.bmMarketId,
      imgUrls: upImages.map(item => item.key).join(','),
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('上传成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  CreateDecorationCredentialsService = (upImages) => {
    CreateDecorationCredentialsService({
      decorationId: global.decorationId,
      imgUrls: upImages.map(item => item.key).join(','),
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('上传成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.navigation,
};
export default Base;
