package com.afanti.monkeydoor;

import android.os.Bundle;
import android.content.Intent;

import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import cn.jpush.android.api.JPushInterface;
import com.afanti.monkeydoor.module.ShareModule;
import com.umeng.socialize.UMShareAPI;


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
       SplashScreen.show(this, true);
       super.onCreate(savedInstanceState);
       JPushInterface.init(this);
       ShareModule.initActivity(this);
   }

   @Override
   public void onActivityResult(int requestCode, int resultCode, Intent data) {
       super.onActivityResult(requestCode, resultCode, data);
       UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
   }

   @Override
   protected void onDestroy() {
       super.onDestroy();
       // 解决内存泄漏问题
       UMShareAPI.get(this).release();
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
