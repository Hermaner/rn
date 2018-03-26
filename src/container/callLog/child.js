import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { TFeedback, Loading, NoData } from '../../components';
import { pushRoute } from '../../actions';
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
              {/* <View style={styles.imgBox}>
                <CachedImage style={styles.headerImg} source={{ uri: `${item.imgUrl}?imageView2/1/w/60` }} />
              </View> */}
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lable}>{item.time}</Text>
              </View>
              <TFeedback
                content={
                  <View style={styles.borderBox}>
                    <Icon style={styles.mainIconFontChoose} name="call" />
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
          true ?
            <FlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
            />
            :
            <NoData
              label="没有相关数据"
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
