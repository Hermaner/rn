import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import { Loading, Header, TFeedback, ImageLook } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import styles from './styles';
import myBase from './base';

class ReturnOrderLOG extends myBase {
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
  _renderHeader() {
    // const { push } = this.props;
    const { info, list, imgList } = this.state;
    return (
      <View>
        <View style={styles.firstBox}>
          <Text>订单编号：{info.refundOrderNumber}</Text>
        </View>
        {
          list.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.secendBox}>
                  <View style={styles.rowBox}>
                    <Text style={{ flex: 1, color: '#333' }}>{item.name}</Text>
                    <View style={styles.rowBox}>
                      <Text style={{ flex: 1, color: '#666', textAlign: 'right' }}>{item.label}</Text>
                      {/* {
                        item.haveIcn &&
                        <Icon name="md-arrow-dropright" style={styles.icn} />
                      } */}
                    </View>
                  </View>
                </View>}
              onPress={() => { }}
            />
          ))
        }
        <View style={[styles.secendBox, { marginTop: 10 }]}>
          <View style={{ flex: 1 }}>
            <Text style={{ flex: 1, color: '#333' }}>发货凭证</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              {
                imgList.length > 0 &&
                <ImageLook
                  images={imgList}
                />
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="物流详情"
        />
        <Content>
          {this._renderHeader()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ReturnOrderLOG.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ReturnOrderLOG);
