import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheet } from 'native-base';
import { Rpc } from 'react-native-qiniu-hm';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetUploadTokenService } from '../api';
import { st } from '../utils';

const styles = StyleSheet.create({
  upView: {
    ...st.fr,
    ...st.jacenter,
    padding: 10,
  },
  imgView: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 30,
  },
  upViewImg: {
    width: 100,
    height: 100,
  },
});
export default class Prompt extends React.Component {
  static propTypes = {
    getImages: PropTypes.func,
    initImage: PropTypes.array,
  };
  constructor(props) {
    super(props);
    let image = null;
    if (props.initImage && props.initImage.length > 0) {
      image = { uri: `${props.initImage.imgUrl}?imageView2/1/w/200`, key: props.initImage.key };
      this.props.getImages(image);
    }
    this.state = {
      upImg: require('../assets/img/addAc.png'),
      image,
    };
  }
  componentDidMount() {
    this.GetUploadTokenService();
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
  openCamera = () => {
    let image;
    ImagePicker.openCamera({
      includeExif: true,
      multiple: false,
    }).then((img) => {
      image = { uri: img.path, width: img.width, height: img.height, mime: img.mime };
      this.setState({
        image,
      }, () => this.startUpload());
    }).catch(e => console.log(e));
  }
  pickMultiple = () => {
    let image;
    ImagePicker.openPicker({
      multiple: false,
      includeExif: true,
    }).then((img) => {
      image = { uri: img.path, width: img.width, height: img.height, mime: img.mime };
      this.setState({
        image,
      }, () => this.startUpload());
    }).catch(e => console.log(e));
  }
  startUpload = () => {
    const { image } = this.state;
    this.upLoadImage(image.uri);
  }
  upLoadImage = (source) => {
    const { uptoken, image } = this.state;
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
    image.key = key;
    this.setState({
      image,
    }, () => this.props.getImages(image));
    Rpc.uploadFile(source, uptoken, { key, name: key });
  }
  GetUploadTokenService = () => {
    GetUploadTokenService()
    .then((res) => {
      console.log(res);
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
      image,
    } = this.state;
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
            <View style={styles.imgView}>
              <Image source={image ? { uri: image.uri } : upImg} style={styles.upViewImg} />
            </View>
          </TouchableWithoutFeedback>
        </View>
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
