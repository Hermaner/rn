import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute } from '../../actions';
import { Header, ScrollableTab } from '../../components';
import BmMarketScroll from './BmMarketScroll';
import DecorateScroll from './DecorateScroll';
import MasterScroll from './MasterScroll';
import ServiceScroll from './ServiceScroll';

class MyColl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="我的收藏"
        />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <ServiceScroll tabLabel="服务" />
          <MasterScroll tabLabel="师傅" />
          <BmMarketScroll tabLabel="建材市场" />
          <DecorateScroll tabLabel="装修公司" />
        </ScrollableTabView>
      </Container>
    );
  }
}

MyColl.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(MyColl);
