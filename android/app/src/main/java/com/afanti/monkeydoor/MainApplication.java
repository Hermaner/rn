package com.afanti.monkeydoor;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.yunpeng.alipay.AlipayPackage;
import com.theweflex.react.WeChatPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativecomponent.amaplocation.RCTAMapLocationPackage;
import com.horcrux.svg.SvgPackage;
import cn.jpush.reactnativejpush.JPushPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.beefe.picker.PickerViewPackage;
import com.afanti.monkeydoor.update.UpdatePackage;

import java.util.Arrays;
import java.util.List;

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
          new RCTAMapLocationPackage(),
            new AlipayPackage(),
            new WeChatPackage(),
            new PickerPackage(),
            new SvgPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new RNDeviceInfo(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new RCTCameraPackage(),
            new PickerViewPackage(),
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
