package com.scarlett.frame.service.orm;

import com.scarlett.common.junit.BaseUnitTest;
import org.apache.commons.collections4.MapUtils;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2017/8/6.
 */
public class QQCustomerClientTest extends BaseUnitTest {

    @Autowired
    private QQCustomerClient qqCustomerClient;

    @Test
    public void qqIsOnlineTest( ) {
        List<String> qqNums = Arrays.asList( "1" );
        Map< String, Boolean > isOnlineMap = qqCustomerClient.qqIsOnline( qqNums );
        Assert.assertTrue( "返回值不能为空", MapUtils.isNotEmpty( isOnlineMap ));
        Assert.assertTrue( "集合长度与输入长度不符", isOnlineMap.size( ) == qqNums.size( ));

        for ( String qqNum : qqNums ) {
            Boolean b =  isOnlineMap.get( qqNum );
            Assert.assertTrue( "预期结果不一致", b == true || b == false );
        }
    }

}
