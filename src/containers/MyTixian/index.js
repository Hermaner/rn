import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header } from '../../components';
import base from './base';
import styles from './styles';

class MyTixian extends base {
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
  _renderMain() {
    const { value, amount } = this.state;
    return (
      <View style={styles.main}>
        <Text style={styles.title}>提现金额</Text>
        <View style={styles.blank}>
          <Text style={styles.label}>￥</Text>
          <Input
            style={styles.input}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            value={value}
            onChangeText={val => this.setState({ value: val })}
          />
        </View>
        <View>
          {
            (value && value > amount) ?
            (<View style={styles.tipsView}>
              <Text style={styles.tipserror}>输入错误</Text>
            </View>)
            :
            (<View style={styles.tipsView}>
              <Text style={styles.tips}>可提现金额{amount}元</Text>
              <TOpacity
                content={
                  <Text style={styles.txAc}>全部提现</Text>
                }
                onPress={this.CreateWithdrawalsOrderService}
              />
            </View>)
          }
        </View>
      </View>
    );
  }
  _renderBtn() {
    return (
      <TOpacity
        style={styles.btn}
        content={
          <Text style={styles.btnText}>立即提现</Text>
        }
        onPress={this.CreateWithdrawalsOrderService}
      />
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="申请提现"
        />
        <Content>
          {this._renderMain()}
          {this._renderBtn()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyTixian.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyTixian);
