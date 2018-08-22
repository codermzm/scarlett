package com.scarlett.frame.service.orm.impl;

import com.scarlett.frame.service.orm.QQCustomerClient;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2017/8/6.
 */
@Service
public class QQCustomerClientImpl implements QQCustomerClient {

    private static final Logger logger = LoggerFactory.getLogger( QQCustomerClientImpl.class );

    private static final String BASE_URL = "http://webpresence.qq.com/getonline?Type=1&";

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Map<String, Boolean> qqIsOnline( List<String> qqNums ) {
        Map<String, Boolean> result = new HashMap<>( );
        if ( CollectionUtils.isEmpty( qqNums )) {
            logger.info( "qq num list is empty" );
            return result;
        }

        // 检查QQ号是否合法
        List<Long> qqNumList = verifyQQnums( qqNums );
        String url = builderUrl( qqNumList );
        logger.info( "request to qq,url:{}", url );
        String resultStrs = restTemplate.getForObject( url, String.class );
        logger.info( "qq response,result:{}", resultStrs );
        String[] onlines = StringUtils.split( resultStrs, ";" );
        if ( onlines == null && onlines.length <= 0 ) {
            return result;
        }

        for ( int index = 0; index < qqNumList.size( ); index++ ) {
            Long qqNum = qqNumList.get( index );
            String onlineStr =  onlines[ index ];
            String[] keyValue = StringUtils.split( onlineStr, "=" );
            if ( keyValue == null || keyValue.length < 2 ) {
                continue;
            }
            // 0 -> false,1 -> true
            String value = keyValue[ 1 ];
            Boolean b = StringUtils.equalsIgnoreCase( "1", value );
            result.put( String.valueOf( qqNum ), b );
        }

        return result;
    }

    private String builderUrl( List<Long> qqNumList ) {
        if ( CollectionUtils.isEmpty( qqNumList )) {
            return StringUtils.EMPTY;
        }
        StringBuilder builder = new StringBuilder( );
        builder.append( BASE_URL );
        for ( Long qqNum : qqNumList ) {
            builder.append( qqNum );
            builder.append( ":" );
        }

        return builder.toString( );
    }

    private List<Long> verifyQQnums( List<String> qqNums ) {
        // 检查QQ号是否合法
        List<Long> qqNumList = new LinkedList<>( );
        for ( String qqStr : qqNums ) {
            if ( StringUtils.isNumeric( qqStr )) {
                qqNumList.add( Long.valueOf( qqStr ));
            }
        }

        return qqNumList;
    }

}
