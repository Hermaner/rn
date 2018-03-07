import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Text, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { BHeader, Loading, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class MyDrawAdd extends base {
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
  _renderUser() {
    const { type, realName, numberName, number } = this.state;
    return (
      <View style={styles.mainList}>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>真实姓名</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="输入您的真实姓名"
              clearButtonMode="while-editing"
              value={realName}
              onChangeText={value => this.setState({ realName: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>{type === 0 ? '支付宝账号' : '银行卡号'}</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder={`请输入${type === 0 ? '支付宝账号' : '银行卡号'}`}
              clearButtonMode="while-editing"
              value={number}
              onChangeText={value => this.setState({ number: value })}
            />
          </View>
        </View>
        {
          type === 1 &&
          <View style={styles.listView}>
            <Text style={styles.listLabel}>银行名称</Text>
            <View style={styles.listRight}>
              <Input
                style={styles.listInput}
                placeholderTextColor="#999"
                placeholder="输入银行名称"
                clearButtonMode="while-editing"
                value={numberName}
                onChangeText={value => this.setState({ numberName: value })}
              />
            </View>
          </View>
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <BHeader back={pop} title="提现账号" />
        <Content>
          {this._renderUser()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'保存账号'}</Text>
            }
            onPress={this.CreateWithdrawalsNumberMasterService}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyDrawAdd.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyDrawAdd);
