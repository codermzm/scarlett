package com.scarlett.frame.service.wechat;

import com.scarlett.frame.service.wechat.utils.CheckModel;

/**
 * Created by admin on 2017/3/28.
 */
public interface WechatTokenService {

    String validate( CheckModel tokenModel );

}
