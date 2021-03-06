import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheet } from 'native-base';
import { Rpc } from 'react-native-qiniu-hm';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetUploadTokenService } from '../api';
import { st } from '../utils';

const styles = StyleSheet.create({
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
});
export default class PeopleUploadFile extends React.Component {
  static propTypes = {
    getImages: PropTypes.func,
    label: PropTypes.string,
    initImages: PropTypes.array,
    imageCount: PropTypes.number,
    isTextHide: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    const images = [];
    console.log('###', props.initImages);
    if (props.initImages && props.initImages.length > 0) {
      props.initImages.forEach((item) => {
        images.push({ uri: `${item}?imageMogr2/thumbnail/700x`, key: item.slice(-19) });
      });
      this.props.getImages(props.initImages);
    }
    this.state = {
      upImg: require('../assets/img/addAc.png'),
      images,
      imageDateIndex: 0,
      isImageDateShow: false,
      imageViewData: [],
    };
  }
  componentDidMount() {
    this.GetUploadTokenService();
  }
  goAsheet = (index) => {
    if (index === 0 || index === '0') {
      this.openCamera();
    }
    if (index === 1 || index === '1') {
      this.pickMultiple();
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
    }, () => this.props.getImages(images));
  }
  openCamera = () => {
    const { images } = this.state;
    const { imageCount } = this.props;
    ImagePicker.openCamera({
      includeExif: true,
    }).then((image) => {
      images.push({ uri: image.path, width: image.width, height: image.height });
      if (images.length > imageCount) {
        images.length = imageCount;
      }
      this.setState({
        images,
      }, () => this.startUpload());
    }).catch(e => console.log(e));
  }
  pickMultiple = () => {
    const { images } = this.state;
    const { imageCount } = this.props;
    ImagePicker.openPicker({
      multiple: true,
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
      }, () => this.startUpload());
    }).catch(e => console.log('$$', e));
  }
  startUpload = () => {
    const { images } = this.state;
    images.forEach((item, index) => {
      if (!item.key) {
        this.upLoadImage(item.uri, index);
      }
    });
  }
  upLoadImage = (source, index) => {
    const { uptoken, images } = this.state;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    let ran = parseInt(Math.random() * 888, 10);
    ran += 100;
    const key = `${year}${month}${day}${hour}${minute}${second}${ran}${'.jpg'}`;
    images[index].key = key;
    this.setState({
      images,
    }, () => this.props.getImages(images));
    Rpc.uploadFile(source, uptoken, { key, name: key });
  }
  GetUploadTokenService = () => {
    GetUploadTokenService()
    .then((res) => {
      console.log('@@', res);
      if (res.isSuccess) {
        this.setState({
          uptoken: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  _renderImageUpload() {
    const {
      upImg,
      imageDateIndex,
      isImageDateShow,
      imageViewData,
    } = this.state;
    const { isTextHide } = this.props;
    const buttons = [
      { text: '拍照' },
      { text: '从相册选择' },
      { text: '取消' },
    ];
    return (
      <View>
        <View style={styles.upView}>
          <TouchableWithoutFeedback
            onPress={() =>
             ActionSheet.show(
               {
                 options: buttons,
                 cancelButtonIndex: 2,
               },
               buttonIndex => this.goAsheet(buttonIndex),
             )}
          >
            <CachedImage source={upImg} style={styles.upViewImg} />
          </TouchableWithoutFeedback>
          {
            !isTextHide && <Text style={styles.upViewText}>{this.props.label}</Text>
          }
        </View>
        <Modal
          visible={isImageDateShow}
          onRequestClose={() => {}}
          transparent
        >
          <Image
            imageUrls={imageViewData}
            index={imageDateIndex}
            onClick={() => this.setState({ isImageDateShow: false })}
          />
        </Modal>
      </View>
    );
  }
  render() {
    return (
      <View>
        {this._renderImageUpload()}
      </View>
    );
  }
}
