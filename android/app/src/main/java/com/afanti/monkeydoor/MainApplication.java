package com.afanti.monkeydoor;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.afanti.monkeydoor.update.UpdatePackage;
import com.facebook.react.ReactApplication;
import cn.qiuxiang.react.baidumap.BaiduMapPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.puti.paylib.PayReactPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;

import com.afanti.monkeydoor.module.SharePackage;
import com.umeng.socialize.Config;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;


public class MainApplication extends Application implements ReactApplication {

  private boolean SHUTDOWN_TOAST = false;
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {


    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BaiduMapPackage(),
            new PayReactPackage(),
            new RNFetchBlobPackage(),
            new PickerPackage(),
            new SvgPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new RNDeviceInfo(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new RCTCameraPackage(),
            new UpdatePackage()
      );
    }
  };
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this,false);
    // 此处配置类型，供后台分析各渠道时使用
    Config.shareType = "react native";
    // 初始化Umeng分享
    UMShareAPI.get(this);
  }
  @Override protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(base);
  }


  // 配置平台key、secret信息
  {
    PlatformConfig.setWeixin("wx083bf496cbc48aec", "750e9075fa521c82274a9d548c399825");
    PlatformConfig.setQQZone("1106207359", "3JjbG8aXMuh5w0sV");
    PlatformConfig.setSinaWeibo("2733400964", "fac50980a44e3e3afd4bc968ea572887", "www.baidu.com");
  }
}
