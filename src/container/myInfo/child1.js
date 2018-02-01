import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TFeedback } from '../../components';
import { pushRoute } from '../../actions';
import styles from './styles';

class Child1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  render() {
    const { data, push, memberId } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          data.map((item, index) => (
            <View style={{ marginBottom: 5 }} key={index}>
              <TFeedback
                content={
                  <View style={styles.goodsItem}>
                    {
                      item.supplyImages.length === 0 ?
                        <Image
                          style={styles.goodsImg}
                          source={{ uri: item.imgUrl }}
                        />
                      :
                        <Image
                          style={styles.goodsImg}
                          source={{ uri: item.supplyImages[0].imgUrl }}
                        />
                    }
                    <View style={{ flex: 1 }}>
                      <Text style={styles.goodsName}>{item.brandName} {item.categoryName}</Text>
                      <Text style={styles.goodsPlace}>
                        {item.sendProvinceName}{item.sendCityName}{item.sendDistrictName}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.chooseBtn}>{item.supplyMode}</Text>
                        <View />
                      </View>
                      <View style={styles.goodsPriceInfo}>
                        <View>
                          <Text style={styles.price}>{item.wholesalePrice}元/{item.unit}</Text>
                        </View>
                        <View style={styles.howLongBox}>
                          <Text style={styles.howLong}>{item.beforeTime == null ? '1天前' : item.beforeTime}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                }
                onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, member: memberId } }); }}
              />
            </View>
          ))
        }
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
  data: PropTypes.array,
  memberId: PropTypes.string,
};
export default connect(null, { push: pushRoute })(Child1);
