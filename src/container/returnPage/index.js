import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Input, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { TFeedback, Loading, Header, UploadFile, Select } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import styles from './styles';
import { Mcolor } from '../../utils';
import myBase from './base';

class OrderPay extends myBase {
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
  _renderHeader() {
    // const { orderInfo } = this.props.navigation.state.params;
    const { btnType, orderInfo } = this.state;
    return (
      <View>
        {
          orderInfo &&
          orderInfo.supply &&
          <View style={styles.headerBox}>
            <CachedImage resizeMode="contain" style={styles.headerImg} source={{ uri: orderInfo.supply.supplyImages[0].imgUrl }} />
            <View style={styles.headerTextBox}>
              <Text style={styles.headerText}>{orderInfo.supply.brandName}{orderInfo.supply.categoryName}</Text>
              <View style={styles.pricesBox}>
                <Text>{orderInfo.supply.wholesalePrice}/{orderInfo.supply.unit}</Text>
              </View>
            </View>
          </View>
        }
        <View style={styles.sevicesBox}>
          <Text style={styles.sevicesTitle}>服务类型</Text>
          <View style={styles.typeBox}>
            {
              btnType.map((item, index) => (
                <TFeedback
                  key={index}
                  content={
                    <View style={[styles.typeBtnBox, item.isChoose ? styles.chooseTypeBtnBox : '']}>
                      <Text style={[styles.typeBtnText, item.isChoose ? styles.chooseTypeBtnText : '']}>{item.btnName}</Text>
                    </View>}
                  onPress={() => { this.chooseOne(index); }}
                />
              ))
            }
          </View>
        </View>

        <View style={styles.sevicesBox}>
          <Text style={styles.sevicesTitle}>退款原因</Text>
          <View style={styles.typeBox}>
            <Input
              style={styles.inputText}
              // value={message}
              onChangeText={text => this.saveLabel(text)}
              multiline
              placeholder="请输入申请理由"
              placeholderTextColor="#777"
            />
          </View>
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
          title="申请退款"
        />
        <Content>
          {this._renderHeader()}
        </Content>
        <TFeedback
          content={
            <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
              <View style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: Mcolor, borderRadius: 5 }}>
                <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>提交</Text>
              </View>
            </View>}
          onPress={() => { this.returnMoneyService(); }}
        />
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OrderPay.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(OrderPay);
