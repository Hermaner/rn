import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Icon, Text, Input, Form, Item } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading } from '../../components';
import base from './base';
import styles from './styles';

class AddAddress extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.deleteData();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { push } = this.props;
    const { name, fullAddress, myAdress, phone } = this.state;
    return (
      <View style={styles.pagebody}>
        <Form>
          <Item>
            <Input
              placeholder="收货人姓名"
              style={styles.input}
              value={name}
              onChangeText={text => this.saveName(text)}
            />
          </Item>
          <Item>
            <Input
              placeholder="电话号码"
              style={styles.input}
              value={phone}
              onChangeText={text => this.savePhone(text)}
            />
          </Item>
          <Item>
            <Input
              placeholder="邮编"
              style={styles.input}
              onChangeText={text => this.savePostalCode(text)}
            />
          </Item>
          <View style={styles.rowBox}>
            <Text style={{ marginLeft: 8, paddingLeft: 3, fontSize: 13, color: '#666' }}>所在地区:</Text>
            <TFeedback
              content={
                <View style={[styles.flexOne, styles.flexRight]}>
                  <Text style={{ fontSize: 13, color: '#666' }} numberOfLines={1}>{myAdress}</Text>
                  <Icon style={{ marginLeft: 10, color: '#666', fontSize: 20 }} name="md-arrow-dropright" />
                </View>}
              onPress={() => { push({ key: 'CgyCitys', params: { type: 'getAddressEmit' } }); }}
            />
          </View>
          <Item>
            <Input
              placeholder="详细地址"
              value={fullAddress}
              style={styles.input}
              onChangeText={text => this.saveFullAddress(text)}
            />
          </Item>
        </Form>
      </View>
    );
  }
  render() {
    const { title } = this.props.navigation.state.params;
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title={title === '1' ? '修改收货地址' : '新增收货地址'} />
        <Content>
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.footerButton}>
                <Text style={styles.footerButtonText}>保存</Text>
              </View>}
            onPress={() => this.addAdress()}
          />
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

AddAddress.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AddAddress);
