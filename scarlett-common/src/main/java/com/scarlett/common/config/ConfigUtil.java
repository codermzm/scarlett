package com.scarlett.common.config;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by mazhiming on 2017/6/14.
 */

public class ConfigUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(ConfigUtil.class);

    private static List<String> jndiLocations;

    /**
     * if true add "java:comp/env/" as the prefix
     */
    private static boolean addEnvPrefix = true;

    private static List<ConfigProvider> providers;
    private static ConfigProvider propertiesConfigProvider;
    private static ConfigProvider centralConfigProvider;
    private static Map<String, String> initConfig = new HashMap<String, String>();

    private ConfigUtil() {
    }

    /**
     *
     * 初始化配置
     * @author huhai huhai@baidu.com
     * @date 2014年5月6日 下午1:18:16
     */
    public synchronized static void init() {
        if (null == providers) {
            providers = new ArrayList<ConfigProvider>();
            providers.add(propertiesConfigProvider);
            if (null != jndiLocations && !jndiLocations.isEmpty()) {
                ConfigProviderImpl configProvider = new ConfigProviderImpl();
                configProvider.setJndiLocations(jndiLocations);
                configProvider.setAddEnvPrefix(addEnvPrefix);
                providers.add(configProvider);
            }

            providers.add(centralConfigProvider);
            providers.add(new CmdArgsConfigProvider());
        }

        if (CollectionUtils.isNotEmpty(providers)) {
            //初始化时优先级最高的最后压入map
            for (ConfigProvider provider : providers) {
                if (null != provider) {
                    try {
                        provider.init();
                        Map<String, String> all = provider.getAll();
                        if (null != all) {
                            for (Map.Entry<String, String> entry : provider.getAll().entrySet()) {
                                String oldValue = initConfig.get(entry.getKey());
                                if (null != oldValue) {
                                    LOGGER.warn("override config . key={} oldValue={} newValue={} currentProvider={}",
                                            entry.getKey(), oldValue, entry.getValue(), provider.getClass());
                                }
                                initConfig.put(entry.getKey(), entry.getValue());
                            }
                        }
                        LOGGER.info("init provider success:{}", provider.getClass());
                    } catch (Exception e) {
                        LOGGER.error("init provider failure:{}", provider.getClass(), e);
                    }

                }
            }
            //逆转顺序，获取时优先级最高的先获取
            Collections.reverse(providers);
        }

    }

    public static String get(String key) {
        String val = null;

        if (null != providers && !providers.isEmpty()) {
            for (ConfigProvider provider : providers) {
                if (null != provider) {
                    val = provider.getConfig(key);
                    if (null != val) {
                        if (LOGGER.isDebugEnabled()) {
                            LOGGER.debug("get config from {} {}={}", provider.getClass(), key, val);
                        }
                        return val;
                    }
                }
            }
        }
        if (null == val) {
            LOGGER.warn("configuration not exists. key=" + key);
        }
        return val;
    }

    public static Integer getInteger(String key) {
        Object value = get(key);
        if (null == value) {
            return null;
        }

        String val = value.toString().trim();
        if (StringUtils.isNumeric(val)) {
            return Integer.valueOf(val);
        } else {
            LOGGER.warn("configuration type error. expect an integer number. " + key + "=" + val);
        }
        return null;
    }

    public static Long getLong(String key) {
        Object value = get(key);
        if (null == value) {
            return null;
        }

        String val = value.toString().trim();
        if (StringUtils.isNumeric(val)) {
            return Long.valueOf(val);
        } else {
            LOGGER.warn("configuration type error. expect an long number. " + key + "=" + val);
        }
        return null;
    }

    public static Double getDouble(String key) {
        Object value = get(key);
        if (null == value) {
            return null;
        }

        String val = value.toString().trim();
        if (val.matches("\\d+.?\\d+")) {
            return Double.valueOf(val);
        } else {
            LOGGER.warn("configuration type error. expect a double number. " + key + "=" + val);
        }
        return null;
    }

    public static Boolean getBoolean(String key) {
        Object value = get(key);
        if (null == value) {
            return null;
        }

        String val = value.toString().trim();
        return Boolean.valueOf(val);
    }

    public static String[] getArray(String key, String separator, boolean trim) {
        Object value = get(key);
        if (null == value) {
            return null;
        }
        String val = value.toString();
        if (trim) {
            val = val.trim();
        }
        String[] arr = val.split(separator);
        if (trim) {
            for (int i = 0; i < arr.length; i++) {
                arr[i] = arr[i].trim();
            }

            return arr;
        }
        return null;
    }

    public static String[] getArray(String key) {
        return getArray(key, "[;,]", true);
    }

    /**
     *
     * 获取初始化时的全部配置 (只读)
     * @return
     * @author huhai huhai@baidu.com
     * @date 2014年5月6日 下午1:16:21
     */
    public static Map<String, String> getAllInitConfig() {
        return Collections.unmodifiableMap(initConfig);
    }

    /**
     *
     * 设置JNDI是否以java:comp/env/作为前缀
     * @param addEnvPrefix
     * @author huhai huhai@baidu.com
     * @date 2014年5月6日 下午10:39:57
     */
    public static void setAddEnvPrefix(boolean addEnvPrefix) {
        ConfigUtil.addEnvPrefix = addEnvPrefix;
    }

    public static void setJndiLocations(List<String> jndiLocations) {
        ConfigUtil.jndiLocations = jndiLocations;
    }

    public static void setProviders(List<ConfigProvider> providers) {
        ConfigUtil.providers = providers;
    }

    /**
     *
     * @Description: 用于支持
     * @param propertiesConfigProvider
     * @author huhai huhai@baidu.com
     * @date 2014年5月6日 下午10:37:43
     */
    public static void setPropertiesConfigProvider(ConfigProvider propertiesConfigProvider) {
        ConfigUtil.propertiesConfigProvider = propertiesConfigProvider;
    }

    /**
     *
     * 设置集中配置提供者（可以是zookeeper、memcache、redis等的实现）
     * @param centralConfigProvider
     * @author huhai huhai@baidu.com
     * @date 2014年5月6日 下午10:18:20
     */
    public static void setCentralConfigProvider(ConfigProvider centralConfigProvider) {
        ConfigUtil.centralConfigProvider = centralConfigProvider;
    }
}