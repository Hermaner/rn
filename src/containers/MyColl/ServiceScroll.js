import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { ServiceItem, NoData } from '../../components';
import base from './ServiceBase';

class ServiceScroll extends base {
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
                  <ServiceItem
                    item={item.masterServicesInfo}
                    rowID={index}
                    key={index}
                    onPress={() => { this.props.push({ key: 'ServiceDetail', params: { masterServicesId: item.masterServicesInfo.id } }); }}
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

ServiceScroll.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(ServiceScroll);
