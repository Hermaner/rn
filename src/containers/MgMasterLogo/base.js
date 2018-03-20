import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { UpdateMasterImgService, UpdateBmMarketImgService, UpdateDecorationCompanyImgService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { imgUrl, type, title } = this.props.navigation.state.params;
    this.state = {
      initImage: imgUrl,
      type,
      title,
      upImages: [],
    };
  }
  getImages = (upImages) => {
    const { type } = this.state;
    this.sleek.toggle();
    if (type === 1) {
      this.UpdateMasterImgService(upImages.key);
    } else if (type === 2) {
      this.UpdateBmMarketImgService(upImages.key);
    } else if (type === 3) {
      this.UpdateDecorationCompanyImgService(upImages.key);
    }
  }
  UpdateMasterImgService = (imgUrl) => {
    UpdateMasterImgService({
      masterId: global.masterId,
      imgUrl,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        Toast.show('上传成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  UpdateBmMarketImgService = (imgUrl) => {
    UpdateBmMarketImgService({
      bmMarketId: global.bmMarketId,
      imgUrl,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('上传成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  UpdateDecorationCompanyImgService = (imgUrl) => {
    UpdateDecorationCompanyImgService({
      decorationId: global.decorationId,
      imgUrl,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('上传成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.navigation,
};
export default Base;
