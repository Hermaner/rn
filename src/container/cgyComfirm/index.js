import React from 'react';
import { View, Image, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Icon, Input, ActionSheet } from 'native-base';
import { connect } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import SelectInput from 'react-native-select-input-ios';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import base from './base';
import styles from './styles';

class CgyCategory extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getData();
    this.initData();
  }
  componentWillUnmount() {
    this.deleteData();
  }
  _renderList() {
    const { items } = this.state;
    return (
      <View>
        {
          items.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={[styles.list, item.last && styles.lastList]} key={index}>
                  <View style={styles.listTitle}>
                    <Text style={styles.listTitleText}>{item.title}</Text>
                  </View>
                  <View style={styles.listLabel}>
                    <Text style={styles.listLabelText}>{item.label}</Text>
                  </View>
                  <Icon name="md-arrow-dropright" style={styles.listIcon} />
                </View>}
              onPress={() => { this.goPage(index); }}
            />
          ))
        }
      </View>
    );
  }
  _renderUserInfo() {
    const { items2 } = this.state;
    return (
      <View>
        {
          items2.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={[styles.list, item.last && styles.lastList]} key={index}>
                  <View style={styles.listTitle}>
                    <Text style={styles.listTitleText}>{item.title}</Text>
                  </View>
                  <View style={styles.listLabel}>
                    <Text style={styles.listLabelText}>{item.label}</Text>
                  </View>
                  <Icon name="md-arrow-dropright" style={styles.listIcon} />
                </View>}
              onPress={() => { this.goPage(index, 'cga'); }}
            />
          ))
        }
      </View>
    );
  }
  _renderPhone() {
    const { phone } = this.state;
    return (
      <View>
        <View style={styles.list}>
          <View style={styles.listTitle}>
            <Text style={styles.listTitleText}>联系电话</Text>
          </View>
          <View style={styles.listLabel}>
            <Input
              style={styles.phoneInput}
              onChangeText={text => this.setState({ phone: text })}
              value={phone}
            />
          </View>
          <Icon name="md-arrow-dropright" style={styles.listIcon} />
        </View>
      </View>
    );
  }
  _renderImageUpload() {
    const {
      upImg,
      images,
      imageCount,
      imageDateIndex,
      isImageDateShow,
      imageViewData,
    } = this.state;
    const buttons = [
      { text: '拍照' },
      { text: '从相册选择' },
      { text: '取消' },
    ];
    return (
      <View>
        <View style={styles.imagesView}>
          {
            images.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.showImageDate(index)}
              >
                <View style={styles.imageListView}>
                  <Image source={{ uri: item.uri }} style={styles.imageList} />
                  <TouchableOpacity style={styles.imageDel} onPress={() => this.imageDel(index)}>
                    <Icon name="ios-close-outline" style={styles.imageDelIcon} />
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
        {
          images.length < 4 &&
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
              <Image source={upImg} style={styles.upViewImg} />
            </TouchableWithoutFeedback>
            <Text style={styles.upViewText}>（选填）最多上传{imageCount}张照片</Text>
          </View>
        }
        <Modal
          visible={isImageDateShow}
          transparent
        >
          <ImageViewer
            imageUrls={imageViewData}
            index={imageDateIndex}
            onClick={() => this.setState({ isImageDateShow: false })}
          />
        </Modal>
      </View>
    );
  }
  _renderMemo() {
    const { memo } = this.state;
    return (
      <View style={styles.memoView}>
        <View style={styles.memoTitle}>
          <Text style={styles.memoTitleText}>补充说明</Text>
        </View>
        <View style={styles.memoMain}>
          <Input
            style={styles.memoMainInput}
            multiline
            placeholderTextColor="#aaa"
            placeholder="详细的描述采购要求，可以收到更满意的报价哦"
            onChangeText={text => this.setState({ memo: text })}
            value={memo}
          />
        </View>
        {this._renderImageUpload()}
      </View>
    );
  }
  _renderSelect() {
    const { optionType, options } = this.state;
    return (
      <SelectInput
        value={optionType}
        options={options}
        ref={(c) => { this.SelectInput = c; }}
        submitKeyText="确认"
        cancelKeyText="取消"
        onCancelEditing={() => console.log('onCancel')}
        onSubmitEditing={value => this.setSelect(value)}
        style={styles.selectType}
        labelStyle={{ fontSize: 12, color: '#666' }}
      />
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <Button onPress={this.goCgComfirm} full light style={styles.btn}><Text style={{ color: '#fff' }}>选好了</Text></Button>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="发布供应" />
        <Content>
          {this._renderList()}
          {this._renderMemo()}
          {this._renderUserInfo()}
          {this._renderPhone()}
          {this._renderSelect()}
        </Content>
        {this._renderButton()}
      </Container>
    );
  }
}

CgyCategory.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CgyCategory);
