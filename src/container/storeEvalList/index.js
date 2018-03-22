import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { Header, ScrollableTab, Loading } from '../../components';

import Child from './child';

class StoreEvalList extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      memberId: params ? params.memberId : '',
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  render() {
    const { pop } = this.props;
    const { memberId } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header back={pop} title="评价" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="全部" type="" isimgUrl="" memberId={memberId} />
          <Child tabLabel="好评" type="3" isimgUrl="0" memberId={memberId} />
          <Child tabLabel="中评" type="2" isimgUrl="0" memberId={memberId} />
          <Child tabLabel="差评" type="1" isimgUrl="0" memberId={memberId} />
          <Child tabLabel="有图" type="" isimgUrl="1" memberId={memberId} />
        </ScrollableTabView>
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}

StoreEvalList.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(StoreEvalList);
