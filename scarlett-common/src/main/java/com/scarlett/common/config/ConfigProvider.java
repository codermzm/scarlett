package com.scarlett.common.config;

import java.util.Map;

/**
 * Created by mazhiming on 2017/6/14.
 */
public interface ConfigProvider {

    String getConfig(String key);

    Map<String, String> getAll();

    void init();
}
