import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';

class CgCategoryBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: '1',
        title: '采购货品',
        must: true,
        last: true,
        label: '水果',
      }, {
        id: '1',
        title: '规格要求',
        must: false,
        last: false,
        label: '不限',
      }, {
        id: '1',
        title: '需求量',
        must: true,
        last: false,
        label: '不限',
      }, {
        id: '1',
        title: '期望货源地',
        must: false,
        last: true,
        label: '全国',
      }],
      items2: [{
        id: '1',
        title: '采购时长',
        must: true,
        last: false,
        label: '7天',
      }, {
        id: '1',
        title: '收货地址',
        must: false,
        last: false,
        label: '请选择',
      }, {
        id: '1',
        title: '联系电话',
        must: false,
        last: true,
        label: '16888888888',
      }],
      upImg: require('../../assets/img/addAc.png'),
      images: [],
      imageCount: 4,
      imageDateIndex: 0,
      isImageDateShow: false,
      imageViewData: [],
    };
  }
  goAsheet = (index) => {
    switch (index) {
      case 0:
        this.openCamera();
        break;
      case 1:
        this.pickMultiple();
        break;
      default:
    }
  }
  showImageDate = (imageDateIndex) => {
    const { images } = this.state;
    const imageViewData = [];
    images.forEach(item => imageViewData.push({ url: item.uri }));
    this.setState({
      imageDateIndex,
      isImageDateShow: true,
      imageViewData,
    });
  }
  imageDel = (index) => {
    const { images } = this.state;
    images.splice(index, 1);
    this.setState({
      images,
    });
  }
  openCamera = () => {
    const { images, imageCount } = this.state;
    ImagePicker.openCamera({
      includeBase64: true,
      includeExif: true,
    }).then((image) => {
      images.push({ uri: `data:${image.mime};base64,${image.data}`, width: image.width, height: image.height });
      if (images.length > imageCount) {
        images.length = imageCount;
      }
      this.setState({
        images,
      });
    }).catch(e => alert(e));
  }
  pickMultiple = () => {
    const { images, imageCount } = this.state;
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
    }).then((image) => {
      image.forEach((item) => {
        images.push({ uri: item.path, width: item.width, height: item.height, mime: item.mime });
      });
      if (images.length > imageCount) {
        images.length = imageCount;
      }
      this.setState({
        images,
      });
    }).catch(e => alert(e));
  }
}

CgCategoryBase.propTypes = {
  push: PropTypes.func,
};
export default CgCategoryBase;
