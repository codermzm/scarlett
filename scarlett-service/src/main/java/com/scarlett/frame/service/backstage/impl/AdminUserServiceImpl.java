package com.scarlett.frame.service.backstage.impl;

import com.scarlett.bean.bo.AdminUserBo;
import com.scarlett.bean.dao.AdminUserDao;
import com.scarlett.bean.dao.AdminUserDaoCriteria;
import com.scarlett.dal.mapper.AdminUserMapper;
import com.scarlett.frame.service.backstage.AdminUserService;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

/**
 * Created by mazhiming on 2017/6/14.
 */
@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private AdminUserMapper adminUserMapper;

    @Override
    public AdminUserBo findByUserName(String userName ) throws InvocationTargetException, IllegalAccessException {
        if ( StringUtils.isEmpty( userName )) {
            return null;
        }

        AdminUserDaoCriteria adminUserCriteria = new AdminUserDaoCriteria( );
        AdminUserDaoCriteria.Criteria criteria = adminUserCriteria.createCriteria( );
        criteria.andNameEqualTo( userName );
        List<AdminUserDao> adminUsers = adminUserMapper.selectByExample( adminUserCriteria );
        if ( CollectionUtils.isEmpty( adminUsers )) {
            return null;
        }
        AdminUserDao adminUserDao = adminUsers.get( 0 );

        AdminUserBo adminUserBo = new AdminUserBo( );
        BeanUtils.copyProperties( adminUserBo, adminUserDao );

        return adminUserBo;
    }
}
