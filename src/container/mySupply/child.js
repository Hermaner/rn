import React from 'react';
import { View, TouchableWithoutFeedback, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, TFeedback, NoData } from '../../components';
import ChildBase from './childBase';
import styles from './styles';

class Child extends ChildBase {
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
  componentWillUnmount() {
    this.getDelete();
  }
  _renderRow = ({ item, index }) => {
    const { push } = this.props;
    const { type1, type2, type3 } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: item.purchaseId }); }}>
        <View style={styles.goodsitem}>
          <View style={styles.goodsDetail}>
            {/* <Image style={styles.goodsImg} source={{ uri: item.supplyImages[0].imgUrl }} /> */}
            <View style={{ flex: 1 }}>
              <View style={styles.goodsPrice}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, color: '#333' }}>{item.brandName} {item.categoryName}</Text>
                  {
                    item.supplyItems.map((item2, index2) => (
                      <Text key={index2} style={{ fontSize: 16, color: '#333' }}> {item2.specName} </Text>
                    ))
                  }
                </View>
                <View>
                  <Text style={{ fontSize: 16, color: '#FC8521' }}>{item.wholesalePrice}元/{item.unit}</Text>
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
                type1.map((btnType, i) => (
                  <TFeedback
                    key={i}
                    content={
                      <View style={[styles.btnBox, btnType.isBtn && styles.btnChoose]}>
                        <Text
                          style={[styles.btnText, btnType.isBtn && styles.btnTextChoose]}
                        >
                          {btnType.title}
                        </Text>
                      </View>}
                    // onPress={() => this.undercarriage(item.supplyId)}
                    onPress={() => this.btnChange(btnType.title, item.supplyId, index)}
                  />
                ))
            }
            {
              this.props.type === '1' &&
                type2.map((btnType, i) => (
                  <TFeedback
                    key={i}
                    content={
                      <View style={[styles.btnBox, btnType.isBtn && styles.btnChoose]}>
                        <Text
                          style={[styles.btnText, btnType.isBtn && styles.btnTextChoose]}
                        >
                          {btnType.title}
                        </Text>
                      </View>}
                    // onPress={() => this.undercarriage(item.supplyId)}
                    onPress={() => this.btnChange(btnType.title, item.supplyId, index)}
                  />
                ))
            }
            {
              this.props.type === '2' &&
                type3.map((btnType, i) => (
                  <TFeedback
                    key={i}
                    content={
                      <View style={[styles.btnBox, btnType.isBtn && styles.btnChoose]}>
                        <Text
                          style={[styles.btnText, btnType.isBtn && styles.btnTextChoose]}
                        >
                          {btnType.title}
                        </Text>
                      </View>}
                    onPress={() => this.btnChange(btnType.title, item.supplyId, index)}
                  />
                ))
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { noData, items, nomore, refresh } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
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
              label="没有相关数据，点击刷新"
              onPress={this._onRefresh}
            />
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
