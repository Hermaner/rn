import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetDemandOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderByName: '',
      orderByType: 'desc',
      currentPage: '1',
      typeIds: '',
      realName: '',
      items: [],
      pageSize: '15',
      markers: [],
      distance: '',
      demandCategoryId: '',
      latitude: 39.914884,
      longitude: 116.403883,
      centerLat: 39.914884,
      centerLng: 116.403883,
    };
  }
  onStatusChange = (result) => {
    this.status = result;
    this.cluster.update(result);
    this.setState({
      centerLat: result.center.latitude,
      centerLng: result.center.longitude,
    });
  }
  onClusterPress = (cluster) => {
    this.mapView.setStatus({
      center: cluster.coordinate,
      zoomLevel: this.status.zoomLevel + 1,
    }, 500);
  }
  getInit = () => {
    this.GetDemandOrderService();
  }
  toCenter = () => {
    const { latitude, longitude } = this.state;
    this.mapView.setStatus({ center: { latitude, longitude } }, 500);
    this.setState({
      centerLat: latitude,
      centerLng: longitude,
    });
  }
  GetDemandOrderService = () => {
    const {
      orderByName,
      orderByType,
      pageSize,
      currentPage,
      realName,
      typeIds,
      latitude,
      longitude,
      distance,
      demandCategoryId,
    } = this.state;
    GetDemandOrderService({
      demandCategoryId,
      distance,
      orderByName,
      orderByType,
      pageSize,
      realName,
      typeIds,
      longitude,
      latitude,
      memberId: global.memberId,
      isFlushDistance: '1',
      currentPage,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const items = res.data.pageData;
        console.log(items);
        this.setState({
          items,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
