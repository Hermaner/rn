import React from 'react';
import { BackHandler, View, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { SampleGoodList, Loading, Header, TOpacity, NoData } from '../../components';
import base from './base';
import styles from './styles';

class SampleMainList extends base {
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
    this.getDelete();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _readerConditions() {
    const { cityName, brandName, categoryName } = this.state;
    return (
      <View style={styles.conditions}>
        <TOpacity
          style={{ flex: 1 }}
          content={
            <View style={styles.cdsList}>
              <Text style={styles.cdsListText}>{categoryName || '分类不限'}</Text>
              <Icon name="ios-arrow-down" style={styles.cddown} />
              <View style={styles.rightLine} />
            </View>
          }
          onPress={() => { this.showAction(0); }}
        />
        <TOpacity
          style={{ flex: 1 }}
          content={
            <View style={styles.cdsList}>
              <Text style={styles.cdsListText}>{brandName || '品牌不限'}</Text>
              <Icon name="ios-arrow-down" style={styles.cddown} />
              <View style={styles.rightLine} />
            </View>
          }
          onPress={() => { this.showAction(1); }}
        />
        <TOpacity
          style={{ flex: 1 }}
          content={
            <View style={styles.cdsList}>
              <Text style={styles.cdsListText}>{cityName || '全国不限'}</Text>
              <Icon name="ios-arrow-down" style={styles.cddown} />
            </View>
          }
          onPress={() => { this.showAction(3); }}
        />
      </View>
    );
  }
  _readerMasker() {
    const {
      brands,
      isBrandsShow,
    } = this.state;
    return (
      <View style={styles.masker}>
        <View style={styles.maskerContent}>
          {
            isBrandsShow &&
            <View style={styles.maskerContentView}>
              {
                brands.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => this.brandTab(index)}>
                    <View style={styles.contetnTabView}>
                      <Text
                        style={styles.mainText}
                      >
                        {item.brandName}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              }
            </View>
          }
          {
            isBrandsShow &&
            <View style={styles.maskerBtns}>
              <TouchableOpacity style={styles.maskerCancelBtn} onPress={this.hideMasker}>
                <Text style={styles.maskerBtnText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.maskerSaveBtn} onPress={this.saveMasker}>
                <Text style={styles.maskerBtnTextCur}>确认</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    );
  }
  _renderRow = ({ item, index }) => (
    <View>
      <SampleGoodList
        data={item}
        rowID={index}
        key={index}
        onPressTell={() => { this.chatPeople(item); }}
        onPressLastBtn={() => { this.isSampleCenter(item); }}
        onPress={() => { this.props.push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
      />
    </View>
  )
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
    const { isMaskerShow } = this.state;
    return (
      <Container>
        <View style={styles.fixTop}>
          <Header back={pop} title="样品中心" />
          {this._readerConditions()}
        </View>
        <View style={styles.mainView}>
          {this._renderContent()}
          {isMaskerShow && this._readerMasker()}
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

SampleMainList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SampleMainList);
