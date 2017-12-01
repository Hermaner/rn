const configHong = {
  apiurldev: 'http://192.168.50.248:8889/jpax/?service=',
  apiurl: 'http://o2oswapi.hongware.com/openApi/dyncHongware/mobile/',
  nick: 'O2Omobile',
  name: 'O2Omobile',
  // apiurl: 'http://sandbox.o2o.swapi.hongware.com/openApi/dyncHongware/mobile/',
  // nick: 'leo',
  // name: 'leo',
};
// const configDev = {
//   apiurl: 'http://sandbox.o2o.swapi.hongware.com/openApi/dyncHongware/mobile/',
//   nick: '朱增亮',
//   name: '朱增亮',
// };
// apiurl: 'http://openapi.eichitoo.com/openApi/dyncHongware/mobile/',
// apiurl: 'http://testopenapi.eichitoo.com/openApi/dyncHongware/mobile/',

// 测试配置
const configDev = {
  apiurl: 'http://testopenapi.eichitoo.com/openApi/dyncHongware/mobile/',
  nick: 'heilan',
  name: 'heilan',
  dev: true,
};
// 正式配置
const configPro = {
  apiurl: 'http://openapi.eichitoo.com/openApi/dyncHongware/mobile/',
  nick: 'heilan',
  name: 'heilan',
  dev: false,
};

// 测试配置
const configShgDev = {
  apiurl: 'http://testlivingapi.jyhengyuan.com/openApi/dyncHongware/mobile/',
  nick: 'heilan',
  name: 'heilan',
  dev: true,
};
// 正式配置
const configShgPro = {
  apiurl: 'http://livingapi.jyhengyuan.com/openApi/dyncHongware/mobile/',
  nick: 'heilan',
  name: 'heilan',
  dev: false,
};
export default {
  // config,
  configDev,
  configPro,
  configHong,
  configShgDev,
  configShgPro,
};
