package com.scarlett.common.config;

import java.util.*;

/**
 * Created by admin on 2017/6/24.
 */
public class PropertiesConfigProvider implements ConfigProvider {
    Map<String, String> cache = new HashMap();

    public PropertiesConfigProvider() {
    }

    public void cacheProperties(Properties props) {
        Iterator keys = props.keySet().iterator();

        while(keys.hasNext()) {
            Object keyObject = keys.next();
            String key = keyObject.toString();
            this.cache.put(key, props.getProperty(key));
        }

    }

    public String getConfig(String key) {
        return (String)this.cache.get(key);
    }

    public void init() {
    }

    public Map<String, String> getAll() {
        return Collections.unmodifiableMap(this.cache);
    }
}