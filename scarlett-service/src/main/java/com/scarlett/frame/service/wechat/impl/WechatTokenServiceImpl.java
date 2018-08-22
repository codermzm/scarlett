package com.scarlett.frame.service.wechat.impl;

import com.scarlett.frame.service.wechat.WechatTokenService;
import com.scarlett.frame.service.wechat.utils.CheckModel;
import com.scarlett.frame.service.wechat.utils.EncoderUtils;
import org.springframework.stereotype.Service;

import java.util.Arrays;

/**
 * Created by admin on 2017/3/29.
 */
@Service
public class WechatTokenServiceImpl implements WechatTokenService {

    private static final String WXTOKEN = "123QWEasd";

    @Override
    public String validate(CheckModel tokenModel) {
        String signature = tokenModel.getSignature();
        Long timestamp = tokenModel.getTimestamp();
        Long nonce =tokenModel.getNonce();
        String echostr = tokenModel.getEchostr();
        if(signature!=null&&timestamp!=null&nonce!=null) {
            String[] str = {WXTOKEN, timestamp+"", nonce+""};
            Arrays.sort(str); // 字典序排序
            String bigStr = str[0] + str[1] + str[2];
            // SHA1加密
            String digest = EncoderUtils.encode("SHA1", bigStr).toLowerCase();
            // 确认请求来至微信
            if (digest.equals(signature)) {
                //最好此处将echostr存起来，以后每次校验消息来源都需要用到
                return echostr;
            }
        }

        return "error";
    }
}
