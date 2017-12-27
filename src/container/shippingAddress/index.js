import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Content, Text, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import shippingAddressBase from './base';
import styles from './styles';

class ShippingAddress extends shippingAddressBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.adressItem}>
          <View style={styles.myAdressInfo}>
            <Text style={styles.name}>张三 1509083849</Text>
            <Text style={styles.adress}>收货地址:河北省石家庄都会自己不想进出口</Text>
          </View>
          <View style={styles.setAdress}>
            <View style={styles.flexRow}>
              <CheckBox style={styles.checkBox} checked />
              <Text style={styles.defaultAdress}>默认收货地址</Text>
            </View>
            <View style={[styles.flexRow, styles.flexRight]}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>删除</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.btnRight]} onPress={() => { push({ key: 'AddAddress' }); }}>
                <Text style={[styles.btnText, styles.btnRightText]}>编辑</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.adressItem}>
          <View style={styles.myAdressInfo}>
            <Text style={styles.name}>张三 1509083849</Text>
            <Text style={styles.adress}>收货地址:河北省石家庄都会自己不想进出口</Text>
          </View>
          <View style={styles.setAdress}>
            <View style={styles.flexRow}>
              <CheckBox style={styles.checkBox} checked />
              <Text style={styles.defaultAdress}>默认收货地址</Text>
            </View>
            <View style={[styles.flexRow, styles.flexRight]}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>删除</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.btnRight]}>
                <Text style={[styles.btnText, styles.btnRightText]}>编辑</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.adressItem}>
          <View style={styles.myAdressInfo}>
            <Text style={styles.name}>张三 1509083849</Text>
            <Text style={styles.adress}>收货地址:河北省石家庄都会自己不想进出口</Text>
          </View>
          <View style={styles.setAdress}>
            <View style={styles.flexRow}>
              <CheckBox style={styles.checkBox} checked />
              <Text style={styles.defaultAdress}>默认收货地址</Text>
            </View>
            <View style={[styles.flexRow, styles.flexRight]}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>删除</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.btnRight]}>
                <Text style={[styles.btnText, styles.btnRightText]}>编辑</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.adressItem}>
          <View style={styles.myAdressInfo}>
            <Text style={styles.name}>张三 1509083849</Text>
            <Text style={styles.adress}>收货地址:河北省石家庄都会自己不想进出口</Text>
          </View>
          <View style={styles.setAdress}>
            <View style={styles.flexRow}>
              <CheckBox style={styles.checkBox} checked />
              <Text style={styles.defaultAdress}>默认收货地址</Text>
            </View>
            <View style={[styles.flexRow, styles.flexRight]}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>删除</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.btnRight]}>
                <Text style={[styles.btnText, styles.btnRightText]}>编辑</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.adressItem}>
          <View style={styles.myAdressInfo}>
            <Text style={styles.name}>张三 1509083849</Text>
            <Text style={styles.adress}>收货地址:河北省石家庄都会自己不想进出口</Text>
          </View>
          <View style={styles.setAdress}>
            <View style={styles.flexRow}>
              <CheckBox style={styles.checkBox} checked />
              <Text style={styles.defaultAdress}>默认收货地址</Text>
            </View>
            <View style={[styles.flexRow, styles.flexRight]}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>删除</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.btnRight]}>
                <Text style={[styles.btnText, styles.btnRightText]}>编辑</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.adressItem}>
          <View style={styles.myAdressInfo}>
            <Text style={styles.name}>张三 1509083849</Text>
            <Text style={styles.adress}>收货地址:河北省石家庄都会自己不想进出口</Text>
          </View>
          <View style={styles.setAdress}>
            <View style={styles.flexRow}>
              <CheckBox style={styles.checkBox} checked />
              <Text style={styles.defaultAdress}>默认收货地址</Text>
            </View>
            <View style={[styles.flexRow, styles.flexRight]}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>删除</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.btnRight]}>
                <Text style={[styles.btnText, styles.btnRightText]}>编辑</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="管理收货地址" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
          <TouchableOpacity style={styles.footerButton} onPress={() => { push({ key: 'AddAddress' }); }}>
            <Text style={styles.footerButtonText}>新增收货地址</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

ShippingAddress.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ShippingAddress);