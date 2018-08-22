package com.scarlett.web.controller.pc;

import com.scarlett.bean.bo.AdminUserBo;
import com.scarlett.bean.constant.ConstantCodeKey;
import com.scarlett.bean.constant.ContantCopywrite;
import com.scarlett.frame.service.backstage.AdminUserService;
import com.scarlett.web.base.BaseController;
import com.scarlett.web.base.JsonResult;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.InvocationTargetException;

@Controller
@RequestMapping("/backstage/login")
public class BackstageLoginController extends BaseController {

	private static final Logger log = LoggerFactory.getLogger(BackstageLoginController.class);

	// 后台登录
	private static final String USER_LOGIN = "PC/Backstage/Login";

	@Autowired
	private AdminUserService adminUserService;

	@RequestMapping("view")
	public ModelAndView login( ) {
		return new ModelAndView( USER_LOGIN );
	}

	@ResponseBody
	@RequestMapping("/userLogin")
	public JsonResult<Boolean> userLogin(String username,
										 String password,
										 String verifiCode,
										 HttpServletRequest httpServletRequest)
			throws InvocationTargetException, IllegalAccessException {

		username = StringUtils.trim( username );
		password = StringUtils.trim( password );
		verifiCode = StringUtils.trim( verifiCode );

		Assert.notNull( username, "user name can not be null" );
		Assert.notNull( password, "password can not be null" );
		// Assert.notNull( verifiCode, "verifiCode can not be null" );

		AdminUserBo adminUser = adminUserService.findByUserName( username );
		// 用户是否存在
		if ( adminUser == null ) {
			return super.error( ContantCopywrite.ADMIN_USER_UNREGEDIT.getDescribe( ));
		}

		// 用户名密码是否相同
		if ( StringUtils.equals( adminUser.getPasswd( ), password ) == false ) {
			return super.error( ContantCopywrite.ADMIN_PWD_INCORRECT.getDescribe( ));
		}

		HttpSession session = httpServletRequest.getSession( false ) != null ? httpServletRequest.getSession( false ) : httpServletRequest.getSession( );
		// Object key = session.getAttribute( ConstantCodeKey.VERIFICATION_CODE_KEY.getKey( ));
		// String keyStr = StringUtils.trim( String.valueOf( key ));
		// if ( StringUtils.equalsIgnoreCase( verifiCode, keyStr )) {
		// 	return super.error( ContantCopywrite.ADMIN_VERIFY_CODE_INCORRECT.getDescribe( ));
		// }

		// 记录用户
		session.setAttribute( ConstantCodeKey.USER_LOGIN_CODE_KEY.getKey( ), adminUser.getName( ));

		return super.success( true );
	}

	@ResponseBody
	@RequestMapping("/userExit")
	public Boolean userExit( String username )
			throws InvocationTargetException, IllegalAccessException {
		username = StringUtils.trim( username );
		Assert.notNull( username, "user name can not be null" );

		AdminUserBo adminUser = adminUserService.findByUserName( username );
		// 用户是否存在
		if ( adminUser == null ) {
			return false;
		}

		return true;
	}

}
