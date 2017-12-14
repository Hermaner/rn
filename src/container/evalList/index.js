import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, ListView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { popRoute, pushRoute } from '../../actions';
import { Header } from '../../components';
import { Mred } from '../../utils';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  _renderEval() {
    return (
      <View style={styles.evalView}>
        <View style={styles.evalViewTop}>
          <Text style={styles.evalTopLabel}>评价</Text>
          <View style={styles.evalTopRight}>
            <Text style={styles.evalTopText}>查看<Text style={styles.evalTopColor}>4</Text>条评价</Text>
            <Icon name="arrow-back" style={styles.evalTopIcon} />
          </View>
        </View>
        <View style={styles.evalViewBom}>
          <Text style={styles.evalMainText}>评价文字显示的确</Text>
          <View style={styles.evalMain}>
            <View style={styles.evalMainLeft}>
              <StarRating
                disabled
                starSize={16}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                starColor={Mred}
                maxStars={5}
                rating={3.5}
              />
              <Text style={styles.evalMainCount}>购买数量：x2</Text>
            </View>
            <Text style={styles.evalMainName}>h****8</Text>
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
          title="供应详情"
          showRight
          rightText="更多"
          rightPress={this.resetState}
        />
        <Content>
          {this._renderEval()}
        </Content>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
