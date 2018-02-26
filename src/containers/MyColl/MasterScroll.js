import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { MasterItem, NoData } from '../../components';
import base from './MasterBase';

class MasterScroll extends base {
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
                  <MasterItem
                    item={item.masterInfo}
                    rowID={index}
                    key={index}
                    onPress={() => { this.props.push({ key: 'MasterDetail', params: { masterId: item.masterInfo.masterId } }); }}
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

MasterScroll.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(MasterScroll);
