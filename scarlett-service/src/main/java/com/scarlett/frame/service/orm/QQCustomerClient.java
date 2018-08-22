package com.scarlett.frame.service.orm;

import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2017/8/6.
 */
public interface QQCustomerClient {

    /**
     * 判断QQ是否在线
     * @param qqNums QQ号
     * @return qq是否在线
     * */
    Map<String, Boolean> qqIsOnline( List<String> qqNums );

}
