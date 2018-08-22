package com.scarlett.frame.service.backstage;

import com.scarlett.bean.bo.AdminUserBo;

import java.lang.reflect.InvocationTargetException;

/**
 * 超级管理员
 * Created by mazhiming on 2017/6/14.
 */
public interface AdminUserService {

    /**
     * 根据用户名获取用户
     * */
    AdminUserBo findByUserName(String userName ) throws InvocationTargetException, IllegalAccessException;

}
