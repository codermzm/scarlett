package com.scarlett.frame.service.backstage;

import com.scarlett.bean.bo.ProductBo;

import java.lang.reflect.InvocationTargetException;

/**
 * Created by admin on 2017/6/4.
 */
public interface ProductManageService {

    /**
     * 创建产品
     * */
    Boolean create(ProductBo product ) throws InvocationTargetException, IllegalAccessException;

    Boolean update(ProductBo product) throws InvocationTargetException, IllegalAccessException;

    Boolean delete(Long id);
}
