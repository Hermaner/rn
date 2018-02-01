import React from 'react';
import { View } from 'react-native';
import { Container, Content, Icon, Text, Input } from 'native-base';
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
    this.initData();
  }
  componentWillUnmount() {
    this.deleteData();
  }
  _renderBody() {
    const { push } = this.props;
    const { name, fullAddress, myAdress } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.rowBox}>
          <Text style={{ marginRight: 15, fontSize: 14, color: '#666' }}>所在地区:</Text>
          <TFeedback
            content={
              <View style={[styles.flexOne, styles.flexRight]}>
                <Text style={{ fontSize: 14, color: '#666' }} numberOfLines={1}>{myAdress}</Text>
                <Icon style={{ marginLeft: 10, color: '#666', fontSize: 20 }} name="md-arrow-dropright" />
              </View>}
            onPress={() => { push({ key: 'CgyCitys', params: { type: 'getAddressEmit' } }); }}
          />
        </View>
        <View style={[styles.rowBox, styles.rowBoxMargin]}>
          <Input
            multiline
            placeholder="详细地址"
            style={styles.inputTextArea}
            value={fullAddress}
            onChangeText={text => this.saveFullAddress(text)}
          />
        </View>
        <View style={[styles.rowBox, styles.rowBoxMargin]}>
          <Text style={{ marginRight: 15, fontSize: 14, color: '#666' }}>收货人姓名:</Text>
          <Input
            multiline
            placeholder="请填写收货人姓名"
            style={styles.inputs}
            value={name}
            onChangeText={text => this.saveName(text)}
          />
        </View>
        <View style={[styles.rowBox, styles.rowBoxMargin]}>
          <Text style={{ marginRight: 15, fontSize: 14, color: '#666' }}>电话号码:</Text>
          <Input
            multiline
            placeholder="请填写手机号码"
            style={styles.inputs}
            onChangeText={text => this.savePhone(text)}
          />
        </View>
        <View style={[styles.rowBox, styles.rowBoxMargin]}>
          <Text style={{ marginRight: 15, fontSize: 14, color: '#666' }}>邮编:</Text>
          <Input
            multiline
            style={styles.inputs}
            onChangeText={text => this.savePostalCode(text)}
          />
        </View>
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
