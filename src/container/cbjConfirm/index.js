import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Icon, Input, CheckBox } from 'native-base';
import { connect } from 'react-redux';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { popRoute, pushRoute } from '../../actions';
import { Header, TOpacity, TFeedback } from '../../components';
import base from './base';
import styles from './styles';

class cgyPrice extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.initData();
  }
  componentWillUnmount() {
    this.deleteData();
  }
  _renderItems() {
    const { items } = this.state;
    return (
      <View style={styles.itemsTop}>
        <Text style={styles.itemsTitle}>给他看货</Text>
        <View style={styles.itemsWrap}>
          {
            items.map((item, index) => (
              <TOpacity
                style={styles.itemList}
                key={index}
                content={
                  <View style={styles.itemView} >
                    <Image source={{ uri: item.imgUrl }} style={styles.itemImage} />
                    <Text style={styles.itemName}>三角枫</Text>
                    <Text style={styles.itemLabel}>11.00元/颗</Text>
                    {
                      item.cur &&
                      <CheckBox style={styles.checkBox} checked />
                    }
                  </View>
                }
                onPress={() => this.selestItem(index)}
              />
            ))
          }
        </View>
      </View>
    );
  }
  _renderOne() {
    const { price, unit } = this.state;
    return (
      <View style={styles.list}>
        <Text style={styles.listTitleText}>价格</Text>
        <Input
          style={styles.demandVal}
          clearButtonMode="while-editing"
          value={price}
          keyboardType="numeric"
          onChangeText={(value) => {
            this.setState({
              price: value,
            });
          }}
        />
        <View style={styles.listRight}>
          <Text style={styles.listRightText}>元/{unit}</Text>
        </View>
      </View>
    );
  }
  _renderTwo() {
    const { supplCount, unit } = this.state;
    return (
      <View style={styles.list}>
        <Text style={styles.listTitleText}>供货量</Text>
        <Input
          style={styles.demandVal}
          clearButtonMode="while-editing"
          value={supplCount}
          keyboardType="numeric"
          onChangeText={(value) => {
            this.setState({
              supplCount: value,
            });
          }}
        />
        <View style={styles.listRight}>
          <Text style={styles.listRightText}>{unit}</Text>
        </View>
      </View>
    );
  }
  _renderThree() {
    const { cityArea } = this.state;
    return (
      <TFeedback
        content={
          <View style={styles.list}>
            <Text style={styles.listTitleText}>货品所在地</Text>
            <View style={styles.listLabel}>
              <Text style={styles.listLabelText} numberOfLines={1}>{cityArea || '请选择供货地'}</Text>
            </View>
            <Icon name="md-arrow-dropright" style={styles.listIcon} />
          </View>}
        onPress={() => this.props.push({ key: 'CgCitys', params: { type: 'cbj' } })}
      />
    );
  }
  _renderMemo() {
    const { memo } = this.state;
    return (
      <View style={styles.memoView}>
        <Text style={styles.memoViewTitle}>货品所在地</Text>
        <Input
          style={styles.memoInput}
          clearButtonMode="while-editing"
          multiline
          placeholderTextColor="#aaa"
          placeholder="详细的描述货品的卖点，当供货量和货运方式等。描述越详细，越有助于客户了解"
          value={memo}
          onChangeText={(value) => {
            this.setState({
              memo: value,
            });
          }}
        />
      </View>
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10 }}>
        <Button onPress={this.saveData} full light style={styles.btn}><Text style={{ color: '#fff' }}>提交报价</Text></Button>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { isSleekShow } = this.state;
    return (
      <Container>
        <Header back={pop} title="货品价格" />
        <Content>
          {this._renderItems()}
          {this._renderOne()}
          {this._renderTwo()}
          {this._renderThree()}
          {this._renderMemo()}
          {this._renderButton()}
        </Content>
        <SleekLoadingIndicator loading={isSleekShow} />
      </Container>
    );
  }
}

cgyPrice.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(cgyPrice);
