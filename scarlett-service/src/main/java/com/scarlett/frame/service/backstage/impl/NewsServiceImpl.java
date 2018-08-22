package com.scarlett.frame.service.backstage.impl;

import com.scarlett.bean.bo.NewsBo;
import com.scarlett.bean.constant.NewsStatusEnum;
import com.scarlett.bean.dao.NewsDao;
import com.scarlett.bean.dao.NewsDaoCriteria;
import com.scarlett.bean.pojo.NewsConditionPojo;
import com.scarlett.common.domain.Page;
import com.scarlett.dal.mapper.NewsMapper;
import com.scarlett.frame.service.backstage.NewsService;
import com.scarlett.frame.service.utils.FileOperationService;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.io.IOException;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by admin on 2017/7/21.
 */
@Service
public class NewsServiceImpl implements NewsService {

    private static final Logger logger = LoggerFactory.getLogger( NewsServiceImpl.class );

    @Autowired
    private NewsMapper newsMapper;

    @Autowired
    private FileOperationService fileOperationService;

    @Override
    public Page<NewsBo> list( NewsConditionPojo newsConditionPojo, Integer currentPage, Integer pageSize ) {
        NewsDaoCriteria newsDaoCriteria = new NewsDaoCriteria( );
        NewsDaoCriteria.Criteria criteria = newsDaoCriteria.createCriteria( );
        if ( newsConditionPojo.getNewsStatus( ) != null ) {
            criteria.andStatusEqualTo( newsConditionPojo.getNewsStatus( ).getKey( ));
        } else {
            criteria.andStatusNotEqualTo( NewsStatusEnum.OFFLINE.getKey( ));
        }
        if ( newsConditionPojo.getNewsTypeEnum( ) != null ) {
            criteria.andTypeEqualTo( newsConditionPojo.getNewsTypeEnum( ).getKey( ));
        }

        newsDaoCriteria.setOrderByClause( " is_top desc, news_time desc " );

        Long totalCount = newsMapper.countByExample( newsDaoCriteria );

        Page<NewsBo> page = new Page<NewsBo>( );
        page.setPageNo( currentPage );
        page.setPageSize( pageSize );
        page.setTotalCount( totalCount );

        newsDaoCriteria.setLimitStart( page.getLimitStart( ));
        newsDaoCriteria.setLimitEnd( page.getLimitEnd( ));

        List<NewsDao> newsDaos = newsMapper.selectByExample( newsDaoCriteria );
        if ( CollectionUtils.isEmpty( newsDaos )) {
            return page;
        }

        List<NewsBo> newsBos = new LinkedList<>( );
        if ( CollectionUtils.isNotEmpty( newsDaos )) {
            for ( NewsDao newsDao : newsDaos ) {
                NewsBo newsBo = new NewsBo( );
                BeanUtils.copyProperties( newsDao, newsBo );
                newsBos.add( newsBo );
            }
        }
        page.setResult( newsBos );

        return page;
    }

    @Override
    public Boolean add( NewsBo newsBo ) {
        Assert.notNull( newsBo, "param can not be null" );
        Assert.notNull( newsBo.getType( ), "type can not be empty" );
        Assert.notNull( newsBo.getNewsTime( ), "newsTime can not be null" );
        if ( StringUtils.isEmpty( newsBo.getTitle( ))) {
            throw new IllegalArgumentException( "title can not be empty" );
        }
        Assert.notNull( newsBo, "newsBo can not be null" );

        NewsDao newsDao = new NewsDao( );
        BeanUtils.copyProperties( newsBo, newsDao );

        // 填充默认参数
        if ( newsDao.getStatus( ) == null ) {
            newsDao.setStatus( NewsStatusEnum.BEFORE_EXAMINE.getKey( ));
        }
        if ( StringUtils.isEmpty( newsDao.getTitleImgUrl( ))) {
            newsDao.setTitleImgUrl( StringUtils.EMPTY );
        }
        if ( StringUtils.isEmpty( newsDao.getContentUrl( ))) {
            newsDao.setContentUrl( StringUtils.EMPTY );
        }
        newsDao.setCreateTime( new Date( ));
        newsDao.setUpdateTime( new Date( ));

        newsDao.setId( null );
        int num = newsMapper.insertSelective( newsDao );
        if ( num > 0 ) {
            newsBo.setId( newsDao.getId( ));
        }
        return num > 0;
    }

    @Override
    public Boolean update( NewsBo newsBo ) {
        Assert.notNull( newsBo, "param can not be null" );
        Assert.notNull( newsBo.getType( ), "type can not be empty" );
        Assert.notNull( newsBo.getNewsTime( ), "newsTime can not be null" );
        if ( StringUtils.isEmpty( newsBo.getTitle( ))) {
            throw new IllegalArgumentException( "title can not be empty" );
        }
        Assert.notNull( newsBo, "newsBo can not be null" );
        NewsDao newsDao = new NewsDao( );
        BeanUtils.copyProperties( newsBo, newsDao );
        newsDao.setUpdateTime( new Date( ));

        int num = newsMapper.updateByPrimaryKeySelective( newsDao );

        return num > 0;
    }

    @Override
    public Boolean saveContent( Long id, String content ) throws IOException {
        // 判断新闻是否存在
        NewsDao newsDao = newsMapper.selectByPrimaryKey( id );
        if ( newsDao == null ) {
            logger.error( "SaveContent|can not find news,id:{}", id );

            return false;
        }

        // 内容文件上传服务器
        String fileName = id + ".htm";
        // content = ESAPI.encoder().encodeForHTML( content );
        String url = fileOperationService.uploadFile( fileName, content );
        if ( StringUtils.isEmpty( url )) {
            logger.error( "SaveContent|url is empty,id:{}", id );

            return false;
        }

        // 存db
        NewsDao newsDaoUpdate = new NewsDao( );
        newsDaoUpdate.setId( id );
        newsDaoUpdate.setContentUrl( url );

        int num = newsMapper.updateByPrimaryKeySelective( newsDaoUpdate );

        return num > 0;
    }

    @Override
    public NewsBo detail( Long id ) {
        NewsDao newsDao = newsMapper.selectByPrimaryKey( id );
        if ( newsDao == null ) {
            return null;
        }
        NewsBo newsBo = new NewsBo( );
        BeanUtils.copyProperties( newsDao, newsBo );

        return newsBo;
    }

    @Override
    public Boolean examine( Long id, Boolean status ) {
        NewsStatusEnum statusEnum = status ? NewsStatusEnum.ONLINE : NewsStatusEnum.BEFORE_EXAMINE;

        NewsDao newsDao = new NewsDao( );
        newsDao.setId( id );
        newsDao.setStatus( statusEnum.getKey( ));

        Integer num = newsMapper.updateByPrimaryKeySelective( newsDao );
        logger.info( "NewsService|Examine id:{},status:{},num:{}", id, status, num );

        return num > 0;
    }

    @Override
    public Boolean close( Long id ) {
        NewsDao newsDao = new NewsDao( );
        newsDao.setId( id );
        newsDao.setStatus( NewsStatusEnum.OFFLINE.getKey( ));

        int num = newsMapper.updateByPrimaryKeySelective( newsDao );

        return num > 0;
    }
}
