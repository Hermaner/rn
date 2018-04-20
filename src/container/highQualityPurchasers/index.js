import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading } from '../../components';
import Base from './base';
import styles from './styles';
import Child from './child';
import { Mcolor } from '../../utils';

class HighQualityPurchasers extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.GetAppCategoryService();
  }
  componentWillUnmount() {
    this.getDelete();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { items } = this.state;
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView
          style={{ flex: 1 }}
          tabBarInactiveTextColor="#666"
          tabBarActiveTextColor={Mcolor}
          tabBarBackgroundColor="#f5f5f5"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarUnderlineStyle={{ height: 2, backgroundColor: Mcolor }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          {
            items.map((item, index) => (
              <Child
                key={index}
                tabLabel={item.name}
                categoryId={item.categoryId}
                title={item.name}
              />
            ))
          }
        </ScrollableTabView>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="采购专场" />
        {this._renderBody()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

HighQualityPurchasers.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(HighQualityPurchasers);
