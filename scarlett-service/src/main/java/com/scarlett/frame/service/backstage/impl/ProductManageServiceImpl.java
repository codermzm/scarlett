package com.scarlett.frame.service.backstage.impl;

import com.scarlett.bean.bo.ProductBo;
import com.scarlett.bean.dao.ProductDao;
import com.scarlett.dal.mapper.ProductMapper;
import com.scarlett.frame.service.backstage.ProductManageService;
import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.lang.reflect.InvocationTargetException;

/**
 * Created by admin on 2017/6/4.
 */
@Service
public class ProductManageServiceImpl implements ProductManageService {

    private static final Logger logger = LoggerFactory.getLogger( ProductManageServiceImpl.class );

    @Autowired
    private ProductMapper productMapper;


    @Override
    public Boolean create( ProductBo product ) throws InvocationTargetException, IllegalAccessException {
        Assert.notNull( product, "product can not be null" );

        ProductDao productDao = new ProductDao( );
        BeanUtils.copyProperties( productDao, product );

        // 创建产品
        Integer num = productMapper.insertSelective( productDao );
        if ( num < 0 ) {
            logger.error( "Product|create product error, num less than 0" );
            return false;
        }

        return true;
    }

    @Override
    public Boolean update( ProductBo product ) throws InvocationTargetException, IllegalAccessException {
        Assert.notNull( product, "product can not be null" );

        ProductDao productDao = productMapper.selectByPrimaryKey( product.getId( ));
        if ( productDao == null ) {

        }

        BeanUtils.copyProperties( productDao, product );

        // 创建产品
        Integer num = productMapper.updateByPrimaryKeySelective( productDao );
        if ( num < 0 ) {
            logger.error( "Product|update product error, num less than 0" );
            return false;
        }

        return true;
    }

    @Override
    public Boolean delete( Long id ) {
        Assert.notNull( id, "id can not be null" );

        ProductDao productDao = productMapper.selectByPrimaryKey( id );
        if ( productDao == null ) {

        }

        // 创建产品
        Integer num = productMapper.deleteByPrimaryKey( id );
        if ( num < 0 ) {
            logger.error( "Product|delete product error, num less than 0" );
            return false;
        }

        return true;
    }

}
