package com.lelan.huibao;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.lelan.huibao.update.UpdatePackage;
import com.facebook.react.ReactApplication;
import cn.reactnative.modules.qq.QQPackage;
import com.theweflex.react.WeChatPackage;
import com.emekalites.react.compress.image.ImageCompressPackage;
import com.eaffy.rnandroidnotificationpermission.RNAndroidNotificationPermissionPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
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
            new QQPackage(),
            new WeChatPackage(),
            new ImageCompressPackage(),
            new RNAndroidNotificationPermissionPackage(),
            new RNSoundPackage(),
            new ReactNativeAudioPackage(),
            new ImageResizerPackage(),
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
  }
  @Override protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(base);
  }

}
