import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading } from '../../components';
import base from './base';
import styles from './styles';

import Child from './child';

class HuinongGoodsMotif extends base {
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
  _renderBody() {
    const { isTabOne, brands, goodsItems, backGround1 } = this.state;
    const { name } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>
        <CachedImage style={styles.image} source={backGround1} />
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {
            brands && brands.length > 0 &&
            brands.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.tabView, isTabOne === index ? styles.textBorder : '']}>
                    <Text style={[styles.tabText, isTabOne === index ? styles.tabTextChoose : '']}>{item.brandName}</Text>
                  </View>}
                onPress={() => this.tabChange(index, brands[index].brandId || '')}
              />
            ))
          }
        </View>
        <View style={{ flex: 1 }}>
          {
            brands && brands.length > 0 ?
              <Child
                name={name}
                brandId={brands[isTabOne].brandId || ''}
                data={goodsItems}
              />
            :
              <Child
                name={name}
                brandId=""
                data={goodsItems}
              />
          }
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="慧包好货专场" />
        <Content>
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

HuinongGoodsMotif.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(HuinongGoodsMotif);
