import React from 'react';
import { View, Text, ListView, Image } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback } from '../../components';
import Base from './base';
import styles from './styles';

class Child2 extends Base {
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
  }
  _renderRow = (item) => {
    const { push } = this.props;
    const { memberId } = this.state;
    return (
      <View>
        <View style={styles.buyTime}>
          <Text style={styles.buyTimeText}>{item[0].postDate}</Text>
        </View>
        {
          item.map((item1, index) => (
            <TFeedback
              content={
                <View style={styles.goodsDetail2} key={index}>
                  <Image style={styles.exampleImg} source={{ uri: item1.imgUrl }} />
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flex: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.gyTitle}>{item1.brandName} {item1.categoryName}</Text>
                          {
                            item1.supplyItems.map((item2, index2) => (
                              <Text key={index2} style={{ fontSize: 18, color: '#333' }}> {item2.specName} </Text>
                            ))
                          }
                        </View>
                      </View>
                      <View style={{ flex: 4 }}>
                        <Text style={styles.gyPrice}>{item1.wholesalePrice}元/{item1.unit}</Text>
                        <View style={[styles.flexRow, { flexWrap: 'wrap' }]}>
                          {
                            item1.logisticsMode.split(',').map((item3, index3) => (
                              <Text style={styles.aa} key={index3}>{item3}</Text>
                            ))
                          }
                          {
                            item1.supplyMode.split(',').map((item4, index4) => (
                              <Text style={styles.aa} key={index4}>{item4}</Text>
                            ))
                          }
                          {
                            item1.renderServices.split(',').map((item5, index5) => (
                              <Text style={styles.aa} key={index5}>{item5}</Text>
                            ))
                          }
                        </View>
                      </View>
                    </View>
                    <View style={styles.flexRow}>
                      <Icon style={{ fontSize: 20, color: '#666', marginRight: 6 }} name="arrow-back" />
                      <Text style={{ fontSize: 14, color: '#666' }}>{item1.sendProvinceName} {item1.sendCityName} {item1.sendDistrictName} {item1.nickName}</Text>
                    </View>
                  </View>
                </View>}
              onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item1.supplyId, member: memberId } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { dataSource } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          onEndReachedThreshold={10}
          contentContainerStyle={styles.listViewStyle}
          renderFooter={() => <Text style={{ lineHeight: 30, textAlign: 'center', color: '#666', fontSize: 12 }} />}
        />
      </View>
    );
  }
}
Child2.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child2);
