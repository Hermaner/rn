import PropTypes from 'prop-types';
import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Rpc } from 'react-native-qiniu-hm';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { pushRoute } from '../../actions';
import { Header } from '../../components';

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});
class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      modalVisible: false,
    };
    this.onActionsPress = this.onActionsPress.bind(this);
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
  upLoadImage = () => {
    this.setModalVisible(false);
    const images = this.getImages().map((image) => {
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
      const urlkey = `${global.buketUrl}${key}`;
      Rpc.uploadFile(image.uri, global.uptoken, { key, name: key });
      return {
        text: urlkey,
        image: image.uri,
        type: '2',
      };
    });
    this.props.onSend(images);
    this.setImages([]);
  }
  onActionsPress() {
    const options = ['从相册选取', '发商品', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.setModalVisible(true);
          break;
        case 1:
          this.props.push({ key: 'OrderSend' })
          break;
        default:
      }
    });
  }
  selectImages(images) {
    this.setImages(images);
  }
  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View
        style={[styles.wrapper, this.props.wrapperStyle]}
      >
        <Text
          style={[styles.iconText, this.props.iconTextStyle]}
        >
          +
        </Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
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
            rightPress={this.upLoadImage}
          />
          <CameraRollPicker
            maximum={10}
            imagesPerRow={4}
            callback={this.selectImages}
            selected={[]}
          />
        </Modal>
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

CustomActions.propTypes = {
  onSend: PropTypes.func,
  icon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
};
CustomActions.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(CustomActions);
