package com.scarlett.dal.mybatis.plugin;

import com.baomidou.mybatisplus.toolkit.PluginUtils;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.util.Properties;

/**
 * Created by admin on 2017/9/11.
 */
@Intercepts({
        @Signature(
                type = StatementHandler.class,
                method = "prepare",
                args = { Connection.class, Integer.class }
        )
})
public class TrimInterceptor implements Interceptor {

    private static Logger logger = LoggerFactory.getLogger(TrimInterceptor.class);

    private Properties properties;

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        try {
            StatementHandler statementHandler = ( StatementHandler ) PluginUtils.realTarget( invocation.getTarget( ));
            MetaObject metaObject = SystemMetaObject.forObject( statementHandler );
            BoundSql boundSql = ( BoundSql ) metaObject.getValue( "delegate.boundSql" );
            String sql = boundSql.getSql( );
            sql = sql.replaceAll( "[\\s]+", " " );
            metaObject.setValue( "delegate.boundSql.sql", sql );
        } catch ( Exception ex ) {
            logger.error( "TrimInterceptorError", ex );
        }

        return invocation.proceed( );
    }


    @Override
    public Object plugin(Object target) {
        if (target instanceof StatementHandler) {
            return Plugin.wrap(target, this);
        }
        return target;
    }

    @Override
    public void setProperties(Properties properties0) {
        this.properties = properties0;
    }
}
