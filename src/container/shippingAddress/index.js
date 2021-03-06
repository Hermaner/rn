import React from 'react';
import { View, ScrollView, BackHandler } from 'react-native';
import { Container, Content, Text, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading } from '../../components';
import base from './base';
import styles from './styles';
import { st } from '../../utils';

class ShippingAddress extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
    this._onRefresh();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { push } = this.props;
    const { items } = this.state;
    return (
      <ScrollView style={styles.pagebody}>
        {
          items.map((item, index) => (
            <View style={styles.adressItem} key={index}>
              <View style={styles.myAdressInfo}>
                <View style={{ height: 26, ...st.frcenter }}>
                  <Text style={[styles.name, { flex: 1 }]}>{item.name}</Text>
                  <Text style={styles.name}>{item.phone}</Text>
                </View>
                <Text style={styles.adress}>
                  {item.receiveProvinceName}{item.receiveCityName}{item.receiveDistrictName}
                </Text>
              </View>
              <View style={styles.setAdress}>
                <View style={styles.flexRow}>
                  <TFeedback
                    content={
                      <CheckBox
                        style={styles.checkBox}
                        onPress={() => this.defaultAdress(item.receiveAddressId)}
                        checked={item.isDefault === '1'}
                      />}
                  />
                  <Text style={styles.defaultAdress}>默认收货地址</Text>
                </View>
                <View style={[styles.flexRow, styles.flexRight]}>
                  <TFeedback
                    content={
                      <View style={styles.button}>
                        <Text style={styles.btnText}>删除</Text>
                      </View>}
                    onPress={() => this.deleteAdress(item.receiveAddressId)}
                  />
                  <TFeedback
                    content={
                      <View style={[styles.button, styles.btnRight]}>
                        <Text style={[styles.btnText, styles.btnRightText]}>编辑</Text>
                      </View>}
                    onPress={() => {
                      push({
                        key: 'AddAddress',
                        params: {
                          title: '1',
                          getAdressId: item.receiveAddressId,
                          adress:
                          item.receiveProvinceName +
                          item.receiveCityName +
                          item.receiveDistrictName,
                        },
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          ))
        }
      </ScrollView>
    );
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="管理收货地址" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
        </Content>
        <TFeedback
          content={
            <View style={styles.footer}>
              <View style={styles.footerButton}>
                <Text style={styles.footerButtonText}>新增收货地址</Text>
              </View>
            </View>
            }
          onPress={() => { push({ key: 'AddAddress', params: { title: '0', getAdressId: '', adress: '' } }); }}
        />
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ShippingAddress.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ShippingAddress);
