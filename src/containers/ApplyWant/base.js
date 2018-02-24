import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        title: '师傅入驻',
        label: '平台接单，赚取外快，收入翻番',
        icon: 'icon-gongren',
        color: '#f96b57',
        page: 'ApplyMaster',
      },
      {
        title: '装修公司入驻',
        label: '找精品师傅，接更多业务',
        icon: 'icon-gongsimingcheng',
        color: '#f96b57',
        page: 'ApplyDecorate',
      },
      {
        title: '建材市场入驻',
        label: '更多用户上门选购，提升知名度',
        icon: 'icon-jianzhujiancai',
        color: '#febf27',
        page: 'ApplyBmMarket',
      },
      {
        title: '其他商家入驻',
        label: '提高销量，业绩翻倍',
        icon: 'icon-msnui-shops',
        color: '#febf27',
        page: 'ApplyOther',
      }],
      joins: [{
        title: '线下门店加盟',
        label: '让平台和师傅成为您的忠实伙伴',
        icon: 'icon-jiarujiazu',
        color: '#f96b57',
        page: '',
      },
      {
        title: '线上业务代理',
        label: '我们维护您使用',
        icon: 'icon-liuliangyunpingtaitubiao03',
        color: '#f96b57',
        page: '',
      }],
    };
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
