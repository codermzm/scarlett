package com.scarlett.web.controller.pc.backstage;

import com.scarlett.bean.bo.ProductBo;
import com.scarlett.frame.service.backstage.ProductManageService;
import com.scarlett.web.base.BaseController;
import com.scarlett.web.base.JsonResult;
import com.scarlett.web.controller.pc.backstage.vo.ProductParamVo;
import com.scarlett.web.exception.ParamValidationException;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.InvocationTargetException;

/**
 * Created by admin on 2017/6/27.
 */
@Controller
@RequestMapping("/backstage/product")
public class ProductManageController extends BaseController {

    @Autowired
    private ProductManageService productManageService;

    @ResponseBody
    @RequestMapping("/create")
    public JsonResult<Boolean> create( ProductParamVo productParamVo )
            throws InvocationTargetException, IllegalAccessException {

        verifyParam( productParamVo );

        // 构建参数
        ProductBo productBo = new ProductBo( );
        BeanUtils.copyProperties( productBo, productParamVo );
        Boolean bool = productManageService.create( productBo );

        if ( bool == true ) {
            return super.success( true );
        } else {
            return super.error( false );
        }
    }

    @ResponseBody
    @RequestMapping("/update")
    public JsonResult<Boolean> update( ProductParamVo productParamVo )
            throws InvocationTargetException, IllegalAccessException {

        verifyParam( productParamVo );

        // 构建参数
        ProductBo productBo = new ProductBo( );
        BeanUtils.copyProperties( productBo, productParamVo );
        Boolean bool = productManageService.update( productBo );

        if ( bool == true ) {
            return super.success( true );
        } else {
            return super.error( false );
        }
    }

    @ResponseBody
    @RequestMapping("/delete")
    public JsonResult<Boolean> delete( Long id )
            throws InvocationTargetException, IllegalAccessException {
        if ( id == null ) {
            throw new ParamValidationException( "id", "id can not be null" );
        }
        Boolean bool = productManageService.delete( id );

        if ( bool == true ) {
            return super.success( true );
        } else {
            return super.error( false );
        }
    }

    private void verifyParam( ProductParamVo productParamVo ) {
        if ( productParamVo == null ) {
            throw new ParamValidationException( "product", "param can not be null" );
        }

        if ( StringUtils.isEmpty( productParamVo.getTitle( ))) {
            throw new ParamValidationException( "title", "title can not be null" );
        }

        if ( StringUtils.isEmpty( productParamVo.getDescribe( ))) {
            throw new ParamValidationException( "title", "title can not be null" );
        }

        if ( StringUtils.isEmpty( productParamVo.getImgMini( ))) {
            throw new ParamValidationException( "imgMini", "imgMini can not be null" );
        }

        if ( StringUtils.isEmpty( productParamVo.getImgBig( ))) {
            throw new ParamValidationException( "imgBig", "imgBig can not be null" );
        }

        if ( productParamVo.getLevel( ) == null ) {
            throw new ParamValidationException( "level", "level can not be null" );
        }
    }

}
