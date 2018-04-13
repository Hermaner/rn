package com.lelan.huibao.update;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.lelan.huibao.update.UpdateChecker;
import com.lelan.huibao.MainActivity;

/**
 * Created by lj on 2017/5/6.
 */
public class UpdateApp extends ReactContextBaseJavaModule {

    private ReactContext reactContext;

    public UpdateApp(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "UpdateApp";
    }
    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }
    @ReactMethod
    public void updateDialog (){
        UpdateChecker.checkForDialog(MainActivity.getMainActivity());
    }

}
