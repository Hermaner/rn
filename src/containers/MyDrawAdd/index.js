import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Button, Text, Footer, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { BHeader, Loading, TOpacity, CheckBox } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class MyDrawAdd extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  componentWillUnmount() {
    this.deleteInit();
  }
  _renderUser() {
    const { realName, idCard, type } = this.state;
    return (
      <View style={styles.mainList}>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>真实姓名</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="至少2字"
              clearButtonMode="while-editing"
              value={realName}
              onChangeText={value => this.setState({ realName: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>{type === '1' ? '支付宝账号' : '银行卡号'}</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="11位手机号"
              clearButtonMode="while-editing"
              value={idCard}
              onChangeText={value => this.setState({ idCard: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>银行名称</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="11位手机号"
              clearButtonMode="while-editing"
              value={idCard}
              onChangeText={value => this.setState({ idCard: value })}
            />
          </View>
        </View>
      </View>
    );
  }
  _renderDefault() {
    const { isDefault } = this.state;
    return (
      <View style={styles.listBom}>
        <CheckBox
          content={
            <Text style={styles.checkText}>设为默认</Text>
          }
          value={1}
          isAn
          reverse
          onPress={this.backCheck}
          color={Mcolor}
          modal={isDefault}
        />
        <View style={styles.listcK} />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <BHeader back={pop} title="创建新地址" />
        <Content>
          {this._renderUser()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'保存信息'}</Text>
            }
            onPress={this.CreateOtherOrgService}
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
