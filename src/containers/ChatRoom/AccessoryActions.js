import PropTypes from 'prop-types';
import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import { Rpc } from 'react-native-qiniu-hm';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { pushRoute } from '../../actions';
import { Header, TOpacity, Upload } from '../../components';

import { st, fileKey } from '../../utils';

const styles = StyleSheet.create({
  access: {
    ...st.frcenter,
    flex: 1,
  },
  accessList: {
    flex: 1,
    ...st.jacenter,
  },
  accessView: {
    width: 40,
    height: 40,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    ...st.jacenter,
  },
  accessIcon: {
    fontSize: 30,
    color: '#666',
  },
  accessText: {
    fontSize: 12,
    color: '#666',
  },
  audioView: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    ...st.frcenter,
    backgroundColor: '#fff',
  },
});
class AccessoryActions extends React.Component {
  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      width: 500,
      modalVisible: false,
      access: [{
        name: '照片',
        icon: 'ios-flame',
      }, {
        name: '拍摄',
        icon: 'ios-flame',
      }, {
        name: '快捷短语',
        icon: 'ios-flame',
      }, {
        name: '发商品',
        icon: 'ios-flame',
      }],
    };
    this.selectImages = this.selectImages.bind(this);
  }

  setImages(images) {
    this._images = images;
  }
  getImages() {
    return this._images;
  }
  setModalVisible(visible = false) {
    this.setState({ modalVisible: visible });
  }
  openCamera = () => {
    let image;
    ImagePicker.openCamera({
      includeExif: true,
    }).then((img) => {
      image = [{ uri: img.path, width: img.width, height: img.height, mime: img.mime }];
      this.upLoadImage(image);
    }).catch(e => console.log(e));
  }
  upLoadImage = (getImages) => {
    this.setModalVisible(false);
    const { width } = this.state;
    const images = [];
    getImages.forEach((image) => {
      const bl = image.height / image.width;
      const height = width * bl;
      ImageResizer.createResizedImage(image.uri, width, height, 'JPEG', 60).then((response) => {
        const key = fileKey();
        const urlkey = `${global.buketUrl}${key}`;
        Upload(response.uri, global.uptoken, key);
        images.push({
          text: urlkey,
          image: response.uri,
          type: '2',
          status: '1',
        });
        if (images.length === this.getImages().length) {
          this.props.onSend(images);
          this.setImages([]);
        }
      }).catch((err) => {
        console.log(err);
      });
    });
  }
  goAccessory = (index) => {
    switch (index) {
      case 0:
        this.setModalVisible(true);
        break;
      case 1:
        this.openCamera();
        break;
      case 2:
        this.props.push({ key: 'ChatPhrase' });
        return;
      case 3:
        this.props.push({ key: 'ChatPhrase' });
        break;
      default:
    }
  }
  selectImages(images) {
    this.setImages(images);
  }
  render() {
    const { access } = this.state;
    return (
      <View style={styles.access}>
        {
          access.map((item, index) => (
            <TOpacity
              key={index}
              style={styles.accessList}
              content={
                <View key={index} style={styles.accessList}>
                  <View style={styles.accessView}>
                    <Icon name={item.icon} style={styles.accessIcon} />
                  </View>
                  <Text style={styles.accessText}>{item.name}</Text>
                </View>
              }
              onPress={() => this.goAccessory(index)}
            />
          ))
        }
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <Header
            back={() => this.setModalVisible(false)}
            title="选择图片"
            rightText="选择"
            rightPress={() => this.upLoadImage(this._images)}
          />
          <CameraRollPicker
            maximum={10}
            imagesPerRow={4}
            callback={this.selectImages}
            selected={[]}
          />
        </Modal>
      </View>
    );
  }
}

AccessoryActions.contextTypes = {
  actionSheet: PropTypes.func,
};

AccessoryActions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

AccessoryActions.propTypes = {
  onSend: PropTypes.func,
  setAudioShow: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(AccessoryActions);
