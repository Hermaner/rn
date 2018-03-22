import React from 'react';
import { BackHandler, View } from 'react-native';
import { Container, Content, Input, Text } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading, UploadFile, TFeedback } from '../../components';
import { Mcolor } from '../../utils';
import individualAuthenticationBase from './base';
import styles from './styles';

class IndividualAuthentication extends individualAuthenticationBase {
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
    const { zheng, fan, take } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>姓名</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={this.state.userName}
                onChangeText={text => this.saveUserName(text)}
                placeholder="请与身份证姓名保持一致"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>身份证号码</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={this.state.userCredentials}
                onChangeText={text => this.saveUserCredentials(text)}
                placeholder="请与身份证号码保持一致"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 10, marginLeft: 10 }}>身份证照片</Text>
        <View style={styles.imgPart}>
          <View style={styles.imgOne}>
            <View style={styles.child1Photo}>
              <UploadFile
                getImages={this.getImages1}
                label="点击上传身份证正面照"
                imageCount={1}
              />
            </View>
            <CachedImage style={styles.exampleImg} source={zheng} />
          </View>
          <View style={styles.imgOne}>
            <View style={styles.child1Photo}>
              <UploadFile
                getImages={this.getImages2}
                label="点击上传身份证反面照"
                imageCount={1}
              />
            </View>
            <CachedImage style={styles.exampleImg} source={fan} />
          </View>
          <View style={styles.imgOne}>
            <View style={styles.child1Photo}>
              <UploadFile
                getImages={this.getImages3}
                label="点击上传手持身份证正面半身照"
                imageCount={1}
              />
            </View>
            <CachedImage style={styles.exampleImg} source={take} />
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop, push } = this.props;
    const { status } = this.state;
    return (
      <Container>
        <Header back={pop} title="个人实名认证" />
        <Content>
          {this._renderBody()}
          {
            status === '0' || status === '2' ?
              <TFeedback
                content={
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>提交</Text>
                  </View>}
                onPress={() => { this.submit(); }}
              />
            :
              status === '1' ?
                <View style={styles.buttonNo}>
                  <Text style={styles.buttonText}>已认证</Text>
                </View>
              :
                <View style={styles.buttonNo}>
                  <Text style={styles.buttonText}>认证中</Text>
                </View>
          }
          <TFeedback
            content={
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ color: Mcolor, textAlign: 'center', fontSize: 14 }}>审核须知</Text>
              </View>}
            onPress={() => { push({ key: 'ReviewKnow' }); }}
          />
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

IndividualAuthentication.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(IndividualAuthentication);
