import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { CreateMasterServicesService, UpdateMasterServicesService, GetCategoryService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      status: false,
      initImages: [],
      upImages: [],
      ModalOpen: false,
      isCategoryShow: false,
      isCityShow: false,
      categorys: [],
      categoryTitle: '',
      categoryParentId: '',
      categoryId: '',
      cityId: '',
      name: '',
      detail: '',
      salesPrice: '',
      load: false,
      price: '',
      purchaseCount: '',
      masterServicesId: '',
    };
  }
  getInit = () => {
    const { params } = this.props.navigation.state;
    if (params) {
      const {
        id,
        imgUrl,
        name,
        salesPrice,
        price,
        detail,
        purchaseCount,
        categoryParentId,
        categoryId,
        categoryParentName,
        categoryName,
        status,
      } = params.item;
      this.setState({
        masterServicesId: id,
        initImages: imgUrl.split(','),
        load: true,
        name,
        salesPrice: salesPrice.toString(),
        price: price.toString(),
        detail,
        categoryTitle: `${categoryParentName}-${categoryName}`,
        purchaseCount: purchaseCount.toString(),
        categoryParentId,
        categoryId,
        status: status === 1,
      });
      return;
    }
    this.GetCategoryService();
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
  }
  openCategory = () => {
    this.setState({
      ModalOpen: true,
      isCategoryShow: true,
      isCityShow: false,
    });
  }
  openCity = () => {
    this.setState({
      ModalOpen: true,
      isCategoryShow: false,
      isCityShow: true,
    });
  }
  closeModal = () => {
    this.setState({
      ModalOpen: false,
      isCategoryShow: false,
      isCityShow: true,
    });
  }
  selectCategory = (categoryTitle, categoryParentId, categoryId) => {
    this.setState({
      categoryTitle,
      categoryParentId,
      categoryId,
    });
    this.closeModal();
  }
  GetCategoryService = () => {
    this.sleek.toggle();
    GetCategoryService({
      parentId: '0',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const categorys = res.data;
        this.setState({
          categorys,
          load: true,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  save = () => {
    const {
      masterServicesId,
      upImages,
      name,
      detail,
      salesPrice,
      price,
      purchaseCount,
      servicesLength,
      categoryParentId,
      categoryId,
      cityId,
      status,
    } = this.state;
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    const zreg = /^[1-9]\d*$/;
    if (!reg.test(salesPrice) || !reg.test(price)) {
      Toast.show('价格格式错误');
      return;
    }
    if (!zreg.test(purchaseCount)) {
      Toast.show('起购数格式错误');
      return;
    }
    if (detail.length < 10) {
      Toast.show('项目描述少于10字');
      return;
    }
    if (name.length < 4 || name.length > 10) {
      Toast.show('项目名称长度错误');
      return;
    }
    if (!categoryId) {
      Toast.show('请选择分类');
      return;
    }
    if (upImages.length === 0) {
      Toast.show('上传至少1张图片');
      return;
    }
    const masterServices = {
      masterId: global.masterId,
      imgUrl: upImages.map(item => item.key).join(','),
      name,
      detail,
      salesPrice,
      price,
      status: status ? '1' : '0',
      purchaseCount,
      servicesLength,
      categoryParentId: categoryParentId.toString(),
      categoryId: categoryId.toString(),
      cityId,
    };
    this.sleek.toggle();
    const targetFn = masterServicesId ? UpdateMasterServicesService : CreateMasterServicesService;
    targetFn({
      masterServicesId,
      masterServices: JSON.stringify(masterServices),
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('发布成功');
        // if (masterServicesId) {
        //   DeviceEventEmitter.emit('emitRefresh');
        // }
        // this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.navigation,
};
export default Base;
