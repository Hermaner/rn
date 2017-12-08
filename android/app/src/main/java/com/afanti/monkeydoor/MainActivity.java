package com.afanti.monkeydoor;

import android.os.Bundle;

import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import cn.jpush.android.api.JPushInterface;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "App";
    }
    @Override
   protected void onCreate(Bundle savedInstanceState) {
       SplashScreen.show(this);
       super.onCreate(savedInstanceState);
       JPushInterface.init(this);
   }
   @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }
    private static MainActivity mainActivity;
    public MainActivity() {
        mainActivity = this;
    }
    public static MainActivity getMainActivity() {
        return mainActivity;
    }
}
