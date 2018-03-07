import React from 'react';
import { View, BackHandler, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header, TitleItem, TLight } from '../../components';
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
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.deleteInit();
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
            (value && parseFloat(value, 10) > parseFloat(amount, 10)) ?
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
                onPress={this.drawAll}
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
        onPress={this.CreateWithdrawalsOrderMasterService}
      />
    );
  }
  _renderlist() {
    const { items } = this.state;
    console.log(items);
    return (
      <View style={styles.listView}>
        <TitleItem
          text="选择提现账号"
        />
        {
          items.map((item, index) => (
            <TLight
              key={index}
              style={{ marginTop: 6 }}
              content={
                <View style={[styles.list, item.cur && styles.listCur]}>
                  <View style={styles.left}>
                    <Image style={styles.img} source={item.img} />
                    <Text style={styles.listLabel}>{item.name}</Text>
                  </View>
                  <Text style={styles.listLabel}>{item.info ? item.info.label : '添加新账号'}</Text>
                </View>
              }
              onPress={() => this.tabCard(index)}
            />
          ))
        }
        <View style={styles.bomtips}>
          <Text style={styles.bomtipsText}>如需修改请返回至我的-我的账号进行修改</Text>
        </View>
      </View>
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
          {this._renderlist()}
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
