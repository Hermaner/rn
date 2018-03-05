import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity } from '../../components';
import base from './listBase';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  list: {
    ...st.frcenter,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 3,
  },
  left: {
    marginRight: 6,
    ...st.acenter,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  right: {
    flex: 1,
  },
  line: {
    ...st.fr,
    minHeight: 24,
    ...st.acenter,
  },
  lineLabel: {
    width: 70,
    fontSize: 14,
    color: '#666',
  },
  lineText: {
    fontSize: 14,
    color: '#666',
  },
  lineText2: {
    fontSize: 14,
    color: Mcolor,
  },
  btnline: {
    ...st.acenter,
  },
  btnView: {
    backgroundColor: Mcolor,
    height: 40,
    width: 100,
    borderRadius: 5,
    ...st.jacenter,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  cancelBtn: {
    backgroundColor: '#bbb',
    height: 50,
    margin: 20,
    borderRadius: 5,
    ...st.jacenter,
  },
  cancelText: {
    fontSize: 16,
    color: '#fff',
  },
});
class DemandOrderList extends base {
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
  _renderlists() {
    const { items } = this.state;
    return (
      <Content>
        {
          items.map((list, index) => (
            <View key={index} style={styles.list}>
              <View style={styles.left}>
                <CachedImage source={{ uri: list.memberInfo.imgUrl }} style={styles.img} />
                <Text style={styles.name}>{decodeURI(list.memberInfo.nickName)}</Text>
              </View>
              <View style={styles.right}>
                <View style={styles.line}>
                  <Text style={styles.lineLabel}>申请时间</Text>
                  <Text style={styles.lineText}>{list.modiDate}</Text>
                </View>
                <View style={styles.line}>
                  <Text style={styles.lineLabel}>期望酬金</Text>
                  <Text style={styles.lineText2}>￥{list.price}</Text>
                </View>
                <View style={styles.line}>
                  <Text style={styles.lineLabel}>对方留言</Text>
                  <Text style={styles.lineText}>{list.message}</Text>
                </View>
                <View style={styles.btnline}>
                  <TOpacity
                    style={styles.btnView}
                    content={
                      <Text style={styles.btnText}>同意</Text>
                    }
                    onPress={() => this.AgreeDemandOrderService(list)}
                  />
                </View>
              </View>
            </View>
          ))
        }
        <TOpacity
          style={styles.cancelBtn}
          content={
            <Text style={styles.cancelText}>取消订单</Text>
          }
          onPress={this.cancelOrder}
        />
      </Content>
    );
  }
  render() {
    return (
      <Container>
        {this._renderlists()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

DemandOrderList.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DemandOrderList);
