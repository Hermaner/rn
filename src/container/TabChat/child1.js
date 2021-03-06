import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { TFeedback, Loading, NoData, Iconfont } from '../../components';
import { pushRoute } from '../../actions';
import ChildBase1 from './childBase1';
import styles from './styles';

class Child1 extends ChildBase1 {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getData();
  }
  _renderRow = ({ item, index }) => {
    const { push } = this.props;
    const { isFollow } = this.state;
    return (
      <TFeedback
        content={
          <View style={styles.box}>
            <View style={styles.rowBox}>
              <View style={styles.imgBox}>
                <CachedImage style={styles.headerImg} source={{ uri: `${item.imgUrl}?imageView2/1/w/60` }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{decodeURI(item.nickName)}</Text>
                <Text style={styles.lable}>TA留意过你的货品</Text>
              </View>
              <TFeedback
                content={
                  <View style={styles.borderBox}>
                    <Iconfont style={[styles.mainIconFont, isFollow ? styles.mainIconFontChoose : '']} name="icon-yaoqing" />
                    <Text style={[styles.icnText, isFollow ? styles.icnTextChoose : '']}>{isFollow ? '已添加' : '去添加'}</Text>
                  </View>}
                onPress={() => this.isFollow(item.memberId)}
              />
            </View>
          </View>}
        onPress={() => { push({ key: 'MyInfo', params: { memberId: item.memberId } }); }}
      />
    );
  }
  render() {
    const { items } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          items.length > 0 ?
            <OptimizedFlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
            />
            :
            <NoData
              label="没有相关数据，点击刷新"
              onPress={this.getData}
            />
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child1);
