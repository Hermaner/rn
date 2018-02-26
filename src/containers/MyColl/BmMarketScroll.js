import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { BmMarketItem, NoData } from '../../components';
import base from './BmMarketBase';

class BmMarketBase extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  render() {
    const { items } = this.state;
    return (
      <Container>
        {
          items.length > 0 ?
            <Content>
              {
                items.map((item, index) => (
                  <BmMarketItem
                    item={item.bmMarket}
                    rowID={index}
                    key={index}
                    onPress={() => { this.props.push({ key: 'BmMarketDetail', params: { bmMarketId: item.bmMarket.bmMarketId } }); }}
                  />
                ))
              }
            </Content>
            :
            <NoData
              label="没有相关数据"
              onPress={() => {}}
            />
        }
      </Container>
    );
  }
}

BmMarketBase.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(BmMarketBase);
