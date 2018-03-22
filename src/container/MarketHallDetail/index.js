import React from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { GoodList, Loading, TOpacity, NoData, Header } from '../../components';
import base from './base';
import styles from './styles';

class MarketHallDetail extends base {
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
  renderTop() {
    const { info, item } = this.state;
    return (
      <View style={styles.top}>
        <Text style={styles.topText}>产地：{item.provinceName}{item.cityName}</Text>
        <Text style={styles.topText}>今日均价：{info.todayAveragePrice.toString()}</Text>
        {/* <Text style={styles.topText}>相比于昨日：{info.beforeAveragePrice}</Text> */}
        <Text style={styles.topText}>近7日最高价：{info.beforeMax}</Text>
        <Text style={styles.topText}>近7日最低价：{info.beforeMin}</Text>
        <Text style={styles.topText}>近7日平均价：{info.beforeAveragePrice.toString()}</Text>
      </View>
    );
  }
  _renderRow = ({ item, index }) => (
    <GoodList
      data={item}
      rowID={index}
      key={index}
      onPress={() => { this.props.push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
    />
  )
  _renderContent() {
    const { noData, items } = this.state;
    return (
      <View style={styles.listContent}>
        {
          !noData ?
            <FlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
            />
            :
            <NoData
              label="没有相关数据"
            />
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { info } = this.state;
    return (
      <Container>
        <Header back={pop} title="产地详情" />
        {info && this.renderTop()}
        <View style={styles.mainView}>
          {this._renderContent()}
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MarketHallDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MarketHallDetail);
