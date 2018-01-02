import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, ListView, RefreshControl, Image } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, TFeedback } from '../../components';
import Base from './base';
import styles from './styles';

class Child extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
    this._onRefresh();
  }
  _renderRow = (item) => {
    const { push } = this.props;
    const { type1, type2, type3 } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: item.purchaseId }); }}>
        <View style={styles.goodsitem}>
          <View style={styles.goodsDetail}>
            <Image style={styles.goodsImg} source={{ uri: item.supplyImages[0].imgUrl }} />
            <View style={{ flex: 1 }}>
              <View style={styles.goodsPrice}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, color: '#333' }}>{item.brandName} {item.categoryName}</Text>
                  {
                    item.supplyItems.map((item2, index2) => (
                      <Text key={index2} style={{ fontSize: 16, color: '#333' }}> {item2.specName} </Text>
                    ))
                  }
                </View>
                <View>
                  <Text style={{ fontSize: 16, color: '#FC8521' }}>{item.wholesalePrice}/{item.unit}</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, color: '#666' }}>{item.specName}</Text>
              </View>
            </View>
          </View>
          <View style={styles.readPeople}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#FC8521', fontSize: 14 }}>{item.lookCount}</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>人查看</Text>
            </View>
            <Text style={styles.renovateTime}>{item.modiDate}刷新</Text>
          </View>
          <View style={styles.btnList}>
            {
              this.props.type === '0' &&
                type1.map((btnType, index) => (
                  <TFeedback
                    key={index}
                    content={
                      <View style={[styles.btnBox, btnType.isBtn && styles.btnChoose]}>
                        <Text
                          style={[styles.btnText, btnType.isBtn && styles.btnTextChoose]}
                        >
                          {btnType.title}
                        </Text>
                      </View>}
                    // onPress={() => this.undercarriage(item.supplyId)}
                    onPress={() => this.btnChange(btnType.title, item.supplyId)}
                  />
                ))
            }
            {
              this.props.type === '1' &&
                type2.map((btnType, index) => (
                  <TFeedback
                    key={index}
                    content={
                      <View style={[styles.btnBox, btnType.isBtn && styles.btnChoose]}>
                        <Text
                          style={[styles.btnText, btnType.isBtn && styles.btnTextChoose]}
                        >
                          {btnType.title}
                        </Text>
                      </View>}
                    // onPress={() => this.undercarriage(item.supplyId)}
                    onPress={() => this.btnChange(btnType.title, item.supplyId)}
                  />
                ))
            }
            {
              this.props.type === '2' &&
                type3.map((btnType, index) => (
                  <TFeedback
                    key={index}
                    content={
                      <View style={[styles.btnBox, btnType.isBtn && styles.btnChoose]}>
                        <Text
                          style={[styles.btnText, btnType.isBtn && styles.btnTextChoose]}
                        >
                          {btnType.title}
                        </Text>
                      </View>}
                    onPress={() => this.btnChange(btnType.title, item.supplyId)}
                  />
                ))
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { noData, dataSource, nomore, refresh, isSleekShow } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          !noData ?
            <ListView
              dataSource={dataSource}
              renderRow={this._renderRow}
              onEndReached={this._reachEnd}
              enableEmptySections
              onEndReachedThreshold={10}
              contentContainerStyle={styles.listViewStyle}
              renderFooter={() => <Text style={{ lineHeight: 30, textAlign: 'center', color: '#666', fontSize: 12 }}>
                {nomore ? '没有更多数据了' : '数据加载中...'}
              </Text>}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={this._onRefresh}
                />}
            />
            :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableWithoutFeedback onPress={this._onRefresh}>
                <View>
                  <Text style={{ marginBottom: 8, marginTop: 5, textAlign: 'center', color: '#666', fontSize: 12 }}>
                    没有相关数据,点击刷新
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
        }
        <SleekLoadingIndicator loading={isSleekShow} />
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
