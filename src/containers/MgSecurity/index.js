import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class MgSecurity extends base {
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
  _renderTop() {
    const { topbg, depositAmount, amount } = this.state;
    return (
      <View style={styles.top}>
        <Image source={topbg} style={styles.topbg} />
        {
          depositAmount ?
            <View style={styles.topView}>
              <Text style={styles.midText}>已缴纳</Text>
              <Text style={styles.midText}>保障金{amount}元</Text>
            </View>
            :
            <View style={styles.topView}>
              <Text style={styles.midText}>当前状态</Text>
              <Text style={styles.midText}>未交保障金</Text>
            </View>
        }
      </View>
    );
  }
  _renderMid() {
    const { depositAmount } = this.state;
    return (
      <View style={styles.mid}>
        {
          depositAmount ?
            <View>
              <Text style={styles.midTitle}>可享受权益如下</Text>
              <Text style={styles.midLabel}>可享受权益如下</Text>
              <Text style={styles.midLabel}>可享受权益如下</Text>
            </View>
            :
            <View>
              <Text style={styles.midTitle}>缴纳保障金可享受权益如下</Text>
              <Text style={styles.midLabel}>可享受权益如下</Text>
              <Text style={styles.midLabel}>可享受权益如下</Text>
            </View>
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { amount, depositAmount } = this.state;
    return (
      <Container>
        <Header back={pop} title="我的押金" />
        <Content>
          {this._renderTop()}
          {this._renderMid()}
        </Content>
        <Footer style={styles.footer}>
          {
            depositAmount ?
              <TOpacity
                style={styles.grayBtn}
                content={
                  <Text style={styles.btnText}>退回保障金</Text>
                }
                onPress={this.save}
              />
              :
              <TOpacity
                style={styles.btnView}
                content={
                  <Text style={styles.btnText}>缴纳保障金{amount}元</Text>
                }
                onPress={this.save}
              />
          }
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgSecurity.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgSecurity);
