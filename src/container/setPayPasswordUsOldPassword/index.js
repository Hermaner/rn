import React from 'react';
import { BackHandler, View, Text } from 'react-native';
import { Container, Content, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TOpacity, Loading } from '../../components';
import setPayPasswordUsOldPasswordBase from './base';
import styles from './styles';

class SetPayPasswordUsOldPassword extends setPayPasswordUsOldPasswordBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { oldPassword, newPassword } = this.state;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <Input
          style={styles.password}
          placeholderTextColor="#999"
          placeholder="请输入原支付密码（6位数字）"
          clearButtonMode="while-editing"
          keyboardType="numeric"
          value={oldPassword}
          onChangeText={value => this.setState({ oldPassword: value })}
        />
        <Input
          style={styles.password}
          placeholderTextColor="#999"
          placeholder="请输入新支付密码（6位数字）"
          clearButtonMode="while-editing"
          keyboardType="numeric"
          value={newPassword}
          onChangeText={value => this.setState({ newPassword: value })}
        />
      </View>
    );
  }
  renderBtn() {
    return (
      <View style={styles.btnBigBox}>
        <TOpacity
          style={styles.btnBox}
          content={
            <Text style={styles.btnText}>确认</Text>
          }
          onPress={() => this.submit()}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="设置密码" />
        <Content>
          {this._renderBody()}
          {this.renderBtn()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

SetPayPasswordUsOldPassword.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SetPayPasswordUsOldPassword);
