package com.scarlett.frame.service.backstage.impl;

import com.alibaba.fastjson.JSONObject;
import com.scarlett.bean.bo.VisitHistoryBo;
import com.scarlett.bean.dao.VisitHistoryDao;
import com.scarlett.common.path.PathUtils;
import com.scarlett.dal.mapper.VisitHistoryMapper;
import com.scarlett.frame.service.backstage.VisitHistoryAsyncService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.concurrent.Future;

/**
 * Created by admin on 2017/10/16.
 */
@Service
public class VisitHistoryAsyncServiceImpl implements VisitHistoryAsyncService {

    private static final Logger logger = LoggerFactory.getLogger( VisitHistoryAsyncServiceImpl.class );

    @Autowired
    public VisitHistoryMapper visitHistoryMapper;

    @Async
    public Future<Boolean> insertVisit(HttpServletRequest request ) {

        String remoteHost  = PathUtils.getRemoteHost( request );
        String requestPath = request.getRequestURI( );
        String popuChannel = request.getParameter( "channel" );
        if ( StringUtils.isEmpty( StringUtils.trim( popuChannel ))) {
            popuChannel = "0";
        }

        VisitHistoryBo visitHistoryBo = new VisitHistoryBo( );
        visitHistoryBo.setUserId( 0L );
        visitHistoryBo.setRemoteIp( remoteHost );
        visitHistoryBo.setViewName( requestPath );
        visitHistoryBo.setPopuChannel( popuChannel );

        logger.info( "VisitHistoryAsync|visit async insert request,visit_info:{}",
                JSONObject.toJSONString( visitHistoryBo ));

        return this.insertVisit( visitHistoryBo );
    }

    @Async
    public Future<Boolean> insertVisit( VisitHistoryBo visitHistoryBo ) {
        VisitHistoryDao visitHistoryDao = new VisitHistoryDao( );
        BeanUtils.copyProperties( visitHistoryBo, visitHistoryDao );

        visitHistoryDao.setUpdateTime( new Date( ));
        visitHistoryDao.setCreateTime( new Date( ));

        Integer num = visitHistoryMapper.insertSelective( visitHistoryDao );
        if ( num <= 0 ) {
            logger.error( "visit insert error, num lessAndEq than 0" );

            return new AsyncResult( false );
        }

        return new AsyncResult( true );
    }
}
