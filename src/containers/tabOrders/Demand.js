import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, DemanOrderItem, TFeedback, NoData, TOpacity } from '../../components';
import base from './DemandBase';
import styles from './styles';

class DemandOrder extends base {
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
  _readerConditions() {
    const { tabs } = this.state;
    return (
      <View style={styles.conditions}>
        {
          tabs.map((item, index) => (
            <TOpacity
              key={index}
              style={{ flex: 1 }}
              content={
                <View style={styles.cdsList}>
                  <Text style={[styles.cdsListText, item.cur && styles.cdsCurText]}>
                    {item.label}
                  </Text>
                  {
                    index === 3 ?
                      <Icon name="keypad" style={[styles.cddown, { fontSize: 16 }, item.cur && styles.cddownCur]} />
                    :
                      <Icon name={item.cur ? 'ios-arrow-up' : 'ios-arrow-down'} style={[styles.cddown, item.cur && styles.cddownCur]} />
                  }
                  <View style={styles.rightLine} />
                </View>
              }
              onPress={() => { this.changeTab(index); }}
            />
          ))
        }
      </View>
    );
  }
  _renderRow = (data) => {
    const { item, index } = data;
    return (
      <TFeedback
        key={index}
        content={
          <View>
            <DemanOrderItem
              item={item}
            />
          </View>
        }
        onPress={() => { this.props.push({ key: 'DemandOrderDetail', params: { item } }); }}
      />
    );
  }
  _renderContent() {
    const { noData, items, nomore, refresh } = this.state;
    return (
      <View style={styles.listContent}>
        {
          !noData ?
            <FlatList
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
    return (
      <Container>
        {this._readerConditions()}
        <View style={styles.mainView}>
          {this._renderContent()}
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

DemandOrder.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DemandOrder);
