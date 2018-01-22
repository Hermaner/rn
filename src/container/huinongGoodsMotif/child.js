import React from 'react';
import { View, Text, ListView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback } from '../../components';
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
    this.getData();
  }
  componentWillUnmount() {
  }
  _renderRow = (item) => {
    const { push } = this.props;
    const { memberId } = this.state;
    return (
      <View>
        <TFeedback
          content={
            <View>
              <View style={styles.goodsItem}>
                {
                  item.supplyImages &&
                  <Image style={styles.goodsImage} resizeMode="stretch" source={{ uri: item.supplyImages[0].imgUrl }} />
                }
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.goodsName}>{item.brandName}{item.categoryName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      <Text style={{ color: '#F0B527', fontSize: 20 }}>{item.wholesalePrice}</Text>
                      <Text style={{ color: '#F0B527', fontSize: 14, marginRight: 4 }}>元/{item.unit}</Text>
                      <Text style={{ color: '#F0B527', fontSize: 12 }}>{item.wholesaleCount}{item.unit}起批</Text>
                    </View>
                    <Text style={styles.userName}>{item.nickName}</Text>
                    <Text style={styles.userName}>
                      产地: {item.sendProvinceName}{item.sendCityName}{item.sendDistrictName}
                    </Text>
                  </View>
                  <View style={styles.btnBox}>
                    <View style={{ flex: 1 }} />
                    <TFeedback
                      content={
                        <View style={styles.btnB}>
                          <Text style={styles.btnText}>聊生意</Text>
                        </View>}
                      onPress={() => { push({ key: 'User' }); }}
                    />
                  </View>
                </View>
              </View>
            </View>}
          onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, member: memberId } }); }}
        />
      </View>
    );
  }
  render() {
    const { dataSource } = this.state;
    const { name } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <View style={styles.goods}>
          <View style={styles.goodsTitle}>
            <Text style={styles.goodsTitleText}>{name}</Text>
          </View>
          <ListView
            dataSource={dataSource}
            renderRow={this._renderRow}
            enableEmptySections
            onEndReachedThreshold={10}
            contentContainerStyle={styles.listViewStyle}
          />
        </View>
      </View>
    );
  }
}
Child.propTypes = {
  name: PropTypes.string,
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { push: pushRoute })(Child);
