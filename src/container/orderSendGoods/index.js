import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Input, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { orderInfo } = this.props.navigation.state.params;
    const { gsName, deliverOrderNumber } = this.state;
    return (
      <View>
        <View style={styles.pagebody}>
          <Text style={{ fontSize: 14, color: '#333' }}>订单号：{orderInfo.orderNumber}</Text>
        </View>
        <View style={styles.twoBigBox}>
          <View style={[styles.twoBox, { borderBottomWidth: 1, borderBottomColor: '#ddd' }]}>
            <Text style={{ fontSize: 14, color: '#333' }}>物流方式</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 14, color: '#666' }}>快递发货</Text>
            </View>
          </View>
          <View style={[styles.twoBox, { borderBottomWidth: 1, borderBottomColor: '#ddd' }]}>
            <Text style={{ fontSize: 14, color: '#333' }}>物流名称</Text>
            <TFeedback
              content={
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 14, color: '#666' }}>{gsName || '请选择'}</Text>
                  <Icon style={{ fontSize: 20, color: '#666', marginLeft: 10 }} name="md-arrow-dropright" />
                </View>}
              onPress={() => { this.chooseType(); }}
            />
          </View>
          <View style={styles.twoBox}>
            <Text style={{ fontSize: 14, color: '#333' }}>单号</Text>
            <Input
              style={styles.inputLabel}
              value={deliverOrderNumber}
              onChangeText={text => this.saveLabel(text)}
              multiline
              placeholder="请输入"
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </View>
    );
  }
  _renderSelect() {
    const { optionType, options, selectShow } = this.state;
    return (
      <Select
        selectShow={selectShow}
        value={optionType}
        items={options}
        title="请选择公司"
        closeModal={this.closeModal}
        onValueChange={value => this.selectModel(value)}
      />
    );
  }
  renderImg() {
    return (
      <View style={styles.imgBox}>
        <UploadFile
          getImages={this.getImages}
          label="最多上传4张物流照片"
          imageCount={4}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { isOk } = this.state;
    return (
      <Container>
        <Header
          back={pop}
          title="创建发货"
        />
        <Content>
          {this._renderHeader()}
          {this.renderImg()}
        </Content>
        {
          isOk ?
            <TFeedback
              content={
                <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                  <View style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: Mcolor, borderRadius: 5 }}>
                    <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>提交</Text>
                  </View>
                </View>}
              onPress={() => { this.CreateDeliverOrderService(); }}
            />
          :
            <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
              <View style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: '#bababa', borderRadius: 5 }}>
                <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>提交</Text>
              </View>
            </View>
        }
        {this._renderSelect()}
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
