package com.scarlett.common.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * Created by admin on 2017/6/24.
 */
public class SpringPlaceHolderConfigAdapter extends PropertyPlaceholderConfigurer {
    private static final Logger LOGGER = LoggerFactory.getLogger(SpringPlaceHolderConfigAdapter.class);

    public SpringPlaceHolderConfigAdapter() {
    }

    protected void loadProperties(Properties props) throws IOException {
        long t1 = System.currentTimeMillis();
        super.loadProperties(props);
        PropertiesConfigProvider propertiesConfigProvider = new PropertiesConfigProvider();
        propertiesConfigProvider.cacheProperties(props);
        ConfigUtil.setPropertiesConfigProvider(propertiesConfigProvider);
        ConfigUtil.init();
        if(null != props) {
            Iterator i$ = ConfigUtil.getAllInitConfig().entrySet().iterator();

            while(i$.hasNext()) {
                Map.Entry entry = (Map.Entry)i$.next();
                LOGGER.info("INIT CONFIG {}={}", entry.getKey(), entry.getValue());
                if(null != entry.getValue()) {
                    props.put(entry.getKey(), entry.getValue());
                }
            }
        }

        LOGGER.info("load properties completed in " + (System.currentTimeMillis() - t1) + " ms.");
    }

    public void setAddEnvPrefix(boolean addEnvPrefix) {
        ConfigUtil.setAddEnvPrefix(addEnvPrefix);
    }

    public void setJndiLocations(List<String> jndiLocations) {
        ConfigUtil.setJndiLocations(jndiLocations);
    }

    public void setCentralConfigProvider(ConfigProvider centralConfigProvider) {
        ConfigUtil.setCentralConfigProvider(centralConfigProvider);
    }

    public void setProviders(List<ConfigProvider> providers) {
        if(null != providers && !providers.isEmpty()) {
            ConfigUtil.setProviders(providers);
        }

    }
}