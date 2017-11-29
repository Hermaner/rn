package com.app.update;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.List;
import java.util.Collections;
import java.util.ArrayList;

/**
 * Created by lj on 2017/5/6.
 */
public class UpdatePackage implements ReactPackage {
    List<NativeModule> modules=new ArrayList<>();
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        modules.add(new UpdateApp(reactContext));
        return modules;
    }

    // @Override
    // public List<Class<? extends JavaScriptModule>> createJSModules() {
    //     return Collections.emptyList();
    // }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {

        return Collections.emptyList();
    }
}
