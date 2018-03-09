import React from 'react';
import { View, ScrollView, BackHandler } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { Container, Text, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TOpacity, TFeedback, InputNumber, NoData } from '../../components';
import base from './base';
import styles from './styles';

class FixedList extends base {
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
  _renderLeft() {
    const { tabs } = this.state;
    return (
      <View style={styles.left}>
        <ScrollView
          style={styles.leftScroll}
          showsVerticalScrollIndicator={false}
        >
          {
            tabs.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.leftList, item.cur && styles.leftListCur]}>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                }
                onPress={() => { this.changeTab(index); }}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
  _renderRight() {
    const { items, loading } = this.state;
    return (
      <View style={styles.right}>
        {
          items.length > 0 ?
            <ScrollView style={styles.rightScroll}>
              {
                items.map((item, index) => (
                  <View key={index} style={styles.list}>
                    <View style={styles.imgView}>
                      <CachedImage source={{ uri: `${item.imgUrl}?imageView2/1/w/60` }} style={styles.img} />
                    </View>
                    <View style={styles.labelView}>
                      <View style={styles.label}>
                        <Text style={styles.name} numberOfLines={2} >{item.name}</Text>
                        <View style={styles.priceView}>
                          <Text style={styles.price}>{item.price}元</Text>
                          <Text style={styles.unit}>/{item.unit}</Text>
                        </View>
                      </View>
                      <InputNumber
                        onChange={c => this.changeCount(c, index)}
                        value={item.count}
                        small
                        min={0}
                      />
                    </View>
                  </View>
                ))
              }
            </ScrollView>
            :
            !loading && <NoData
              label="没有相关内容"
            />
        }
      </View>
    );
  }
  _renderFooter() {
    const { amount, ruleInfo } = this.state;
    return (
      <Footer style={styles.footer}>
        <View style={styles.footLeft}>
          <View style={styles.footPriceView}>
            <Text style={styles.footPriceLabel}>待支付</Text>
            <Text style={styles.footPrice}>{amount}元</Text>
          </View>
          <Text style={styles.footTips}>{ruleInfo.name}</Text>
        </View>
        <TOpacity
          style={styles.footBtn}
          content={
            <View style={styles.footBtnView}>
              <Text style={styles.footBtnText}>立即购买</Text>
            </View>
          }
          onPress={this.goNext}
        />
      </Footer>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="选择类别" />
        <View style={styles.content}>
          {this._renderLeft()}
          {this._renderRight()}
        </View>
        {this._renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

FixedList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(FixedList);
