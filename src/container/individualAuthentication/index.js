import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading, PeopleUploadFile, TFeedback } from '../../components';
import individualAuthenticationBase from './base';
import styles from './styles';

class IndividualAuthentication extends individualAuthenticationBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    this.getInit();
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { frontImgUrl, backImgUrl, takeCardImgUrl } = this.state;
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
              />
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 10, marginLeft: 10 }}>身份证照片</Text>
        <View style={styles.imgPart}>
          <View style={styles.imgOne}>
            <PeopleUploadFile
              getImages={this.getImages1}
              label=""
              imageCount={1}
            />
            {
              !frontImgUrl ?
                <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传身份证正面照</Text>
              :
                <View style={{ flex: 1 }}>
                  <Image style={styles.exampleImg} source={{ uri: frontImgUrl[0].uri }} />
                </View>
            }
            <Image style={styles.exampleImg} source={{ uri: 'https://imgsa.baidu.com/forum/wh%3D200%2C90%3B/sign=03d13cc60ae939015657853c4bdc78de/a5c33d6d55fbb2fb3c1edcf4444a20a44723dcc9.jpg' }} />
          </View>
          <View style={styles.imgOne}>
            <PeopleUploadFile
              getImages={this.getImages2}
              label=""
              imageCount={1}
            />
            {
              !backImgUrl ?
                <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传身份证反面照</Text>
              :
                <View style={{ flex: 1 }}>
                  <Image style={styles.exampleImg} source={{ uri: backImgUrl[0].uri }} />
                </View>
            }
            <Image style={styles.exampleImg} source={{ uri: 'https://imgsa.baidu.com/forum/wh%3D200%2C90%3B/sign=03d13cc60ae939015657853c4bdc78de/a5c33d6d55fbb2fb3c1edcf4444a20a44723dcc9.jpg' }} />
          </View>
          <View style={styles.imgOne}>
            <PeopleUploadFile
              getImages={this.getImages3}
              label=""
              imageCount={1}
            />
            {
              !takeCardImgUrl ?
                <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传手持身份证正面半身照</Text>
              :
                <View style={{ flex: 1 }}>
                  <Image style={styles.exampleImg} source={{ uri: takeCardImgUrl[0].uri }} />
                </View>
            }
            <Image style={styles.exampleImg} source={{ uri: 'https://imgsa.baidu.com/forum/wh%3D200%2C90%3B/sign=03d13cc60ae939015657853c4bdc78de/a5c33d6d55fbb2fb3c1edcf4444a20a44723dcc9.jpg' }} />
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="个人实名认证" />
        <Content>
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.button}>
                <Text style={styles.buttonText}>提交</Text>
              </View>}
            onPress={() => { this.submit(); }}
          />
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text style={{ color: '#65C12E', textAlign: 'center', fontSize: 14 }}>审核须知</Text>
          </TouchableOpacity>
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
