import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { Container, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { MaketHallList, Loading, TOpacity, NoData, Header } from '../../components';
import base from './base';
import styles from './styles';

class MarketHall extends base {
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
    const { item } = this.state;
    return (
      <View style={styles.top}>
        <Text style={styles.topName}>产地行情</Text>
        <Text style={styles.topLabel}>{item.minPrice}-{item.maxPrice}元/{item.unit}</Text>
      </View>
    );
  }
  _readerConditions() {
    const { cityName } = this.state;
    return (
      <View style={styles.conditions}>
        <TOpacity
          style={{ flex: 1 }}
          content={
            <View style={styles.cdsList}>
              <Text style={styles.cdsListText}>{cityName || '全部产地'}</Text>
              <Icon name="ios-arrow-down" style={styles.cddown} />
              <View style={styles.rightLine} />
            </View>
          }
          onPress={this.showAction}
        />
        <View style={styles.cdsList}>
          <Text style={styles.cdsListText}>最新价格/涨跌</Text>
        </View>
      </View>
    );
  }
  _renderRow = ({ item, index }) => (
    <TOpacity
      style={{ flex: 1 }}
      key={index}
      content={
        <MaketHallList item={item} />
      }
      onPress={() => this.props.push({ key: 'MarketHallDetail', params: { item } })}
    />

  )
  _renderContent() {
    const { noData, items, nomore, refresh } = this.state;
    return (
      <View style={styles.listContent}>
        {
          !noData ?
            <OptimizedFlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
              ListFooterComponent={() =>
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#666', fontSize: 14 }}>
                    {nomore ? '没有更多数据了' : '数据加载中...'}
                  </Text>
                </View>}
              onRefresh={this._onRefresh}
              refreshing={refresh}
              onEndReached={this._reachEnd}
              onEndReachedThreshold={0.1}
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
    const { item } = this.state;
    return (
      <Container>
        <Header back={pop} title={item.name} />
        {this.renderTop()}
        {this._readerConditions()}
        <View style={styles.mainView}>
          {this._renderContent()}
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MarketHall.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MarketHall);
