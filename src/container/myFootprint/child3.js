import React from 'react';
import { View, Text, ListView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback } from '../../components';
import Base from './base';
import styles from './styles';

class Child3 extends Base {
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
              key={index}
              content={
                <View style={styles.goodsDetail2}>
                  <Image style={styles.exampleImg} source={{ uri: item1.imgUrl }} />
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.name}>{item1.nickName}</Text>
                      <Text style={styles.UserYw}>主营业务:</Text>
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>认证信息: </Text>
                        {
                          item1.memberVerifs.map((item2, index2) => (
                            <Image
                              style={styles.logoImg}
                              key={index2}
                              source={{ uri: item2.verifFieldLogo }}
                            />
                          ))
                        }
                      </View>
                    </View>
                    <Text style={{ fontSize: 14, color: '#666' }}>地址: {item1.address}</Text>
                  </View>
                </View>}
              onPress={() => { push({ key: item1.isNot ? 'StoreDetail' : 'MyInfo', params: { memberId, name: item1.contact } }); }}
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
Child3.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child3);
