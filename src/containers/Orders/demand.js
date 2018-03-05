import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, NoData } from '../../components';
import base from './demandBase';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
  },
  row: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 3,
  },
  rowOne: {
    ...st.frcenter,
    height: 30,
  },
  rowName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  rowStatus: {
    fontSize: 14,
    color: Mcolor,
  },
  rowTwo: {
    ...st.frcenter,
    height: 30,
  },
  rowText1: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  rowText: {
    fontSize: 14,
    color: '#666',
  },
});
class Demand extends base {
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
  _renderRow = (data) => {
    const { item, index } = data;
    return (
      <TFeedback
        key={index}
        content={
          <View style={styles.row}>
            <View style={styles.rowOne}>
              <Text style={styles.rowName}>{item.demandCategoryName}</Text>
              <Text style={[styles.rowStatus, item.isClosing && { color: '#888' }]}>{item.isBidding ? '待同意' : item.isClosing ? '已截止' : '待接单'}</Text>
            </View>
            <View style={styles.rowTwo}>
              <Text style={styles.rowText1}>{item.closingDate.substr(0, 10)}</Text>
              <Text style={styles.rowText}>{item.servicesPrice ? `￥${item.servicesPrice}` : '再议'}</Text>
            </View>
          </View>
        }
        onPress={() => { this.props.push({ key: 'MyDemandOrderDetail', params: { item } }); }}
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
        {this._renderContent()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

Demand.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Demand);
