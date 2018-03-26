import React from 'react';
import { View, BackHandler, Text, FlatList } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, NoData, BusinessList } from '../../components';
import base from './base';
import styles from './styles';

class RecommendBusiness extends base {
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
  _renderRow = ({ item, index }) => (
    <BusinessList
      data={item}
      key={index}
      onPress={() => {
        this.props.push({ key: item.memberVerifs !== null && item.memberVerifs !== '' && item.memberVerifs.length > 0 ? 'StoreDetail' : 'MyInfo', params: { memberId: item.memberId } });
      }}
    />
  )
  _renderContent() {
    const { noData, business, nomore, refresh } = this.state;
    return (
      <View style={styles.listContent}>
        {
          !noData ?
            <FlatList
              data={business}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
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
    return (
      <Container>
        <Header back={pop} title="推荐商家" />
        {this._renderContent()}
      </Container>
    );
  }
}

RecommendBusiness.propTypes = {
  push: PropTypes.func,
};
export default connect(null,
  { push: pushRoute, pop: popRoute })(RecommendBusiness);
