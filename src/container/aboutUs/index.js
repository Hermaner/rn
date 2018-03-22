import React from 'react';
import { BackHandler, View } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading } from '../../components';
import AboutUsBase from './base';
import styles from './styles';

class AboutUs extends AboutUsBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    return (
      <View style={styles.pagebody}>
        <View style={styles.logoBox}>
          <CachedImage style={styles.logo} source={require('../app/resource/imgs/2.png')} />
        </View>
        <Text style={styles.title}>选择慧包，选择成功!</Text>
        <View>
          <Input
            style={styles.inputText}
            multiline
            value={this.state.content}
            onChangeText={text => this.saveThinkText(text)}
            placeholder="我们的成长需要您的建议"
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="关于我们" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.button}>
                <Text style={styles.buttonText}>提交</Text>
              </View>}
            onPress={() => { this.submit(); }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ color: '#666', fontSize: 14 }}>当前版本：</Text>
            <Text style={{ color: '#666', fontSize: 14 }}>v0.0.1</Text>
          </View>
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

AboutUs.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AboutUs);
