import React from 'react';
import { View, BackHandler } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Container, Input, Text, CheckBox, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, Header, UploadFile, TFeedback, TOpacity } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import myBase from './base';
import styles from './styles';

class SampleCenter extends myBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { identityList } = this.state;
    return (
      <View style={styles.pagebody}>
        <CachedImage style={styles.userImg} source={require('../../assets/img/1.png')} />
        <View>
          <Text style={styles.title}>采购量/月</Text>
          <View style={styles.inputBox}>
            <Input
              style={styles.inputText}
              value={this.state.businessName}
              onChangeText={text => this.saveBuyCounts(text)}
            />
          </View>
          <Text style={styles.title}>您的采购身份</Text>
          <View style={styles.checkChoose}>
            {
              identityList.map((item, index) => (
                <TOpacity
                  key={index}
                  style={{ marginBottom: 6, marginRight: 10 }}
                  content={
                    <View style={item.isChoose === 1 ? styles.oneBtnBoxChoose : styles.oneBtnBox}>
                      <Text
                        style={item.isChoose === 1 ? styles.oneBtnTextChoose : styles.oneBtnText}
                      >
                        {item.title}
                      </Text>
                    </View>
                  }
                  onPress={() => this.chooseType(index)}
                />
              ))
            }
          </View>
        </View>
      </View>
    );
  }
  _renderUserImg() {
    const { frontImgUrl } = this.state;
    return (
      <View style={styles.pagebody}>
        <View>
          <Text style={styles.title}>您的身份示意图</Text>
          <View style={styles.imgBox}>
            <Text style={{ fontSize: 14, color: '#666' }}>注：可上传营业执照，门店照片，名片，工牌等上传文件(最多四张且需小于4M)</Text>
            <View>
              <UploadFile
                getImages={this.getImages1}
                label=""
                imageCount={4}
              />
              {
                frontImgUrl &&
                <View style={{ flex: 1 }}>
                  <CachedImage style={styles.exampleImg} source={{ uri: `${frontImgUrl[0].uri}?imageView2/1/w/60` }} />
                </View>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderFooter() {
    return (
      <View style={styles.pagebody}>
        <Text style={styles.title}>还希望采购哪些产品</Text>
        <View style={styles.inputBox}>
          <Input
            style={styles.inputText}
            value={this.state.businessName}
            onChangeText={text => this.saveBuyCounts(text)}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="样品中心" />
        <Content>
          {this._renderBody()}
          {this._renderUserImg()}
          {this._renderFooter()}
        </Content>
        <View style={styles.btnBigbox}>
          <TFeedback
            content={
              <View style={styles.btnbox}>
                <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>提 交</Text>
              </View>}
            onPress={() => { this.CreateApplyDemoService(); }}
          />
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

SampleCenter.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SampleCenter);
