import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { DecorateItem, NoData } from '../../components';
import base from './DecorateBase';

class DecorateScroll extends base {
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
                  <DecorateItem
                    item={item.decoration}
                    rowID={index}
                    key={index}
                    onPress={() => { this.props.push({ key: 'DecorateDetail', params: { decorationId: item.decoration.decorationId } }); }}
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

DecorateScroll.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(DecorateScroll);
