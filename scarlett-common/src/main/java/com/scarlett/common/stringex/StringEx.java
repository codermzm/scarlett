package com.scarlett.common.stringex;

import org.apache.commons.lang3.StringUtils;

public class StringEx {
	/**
	 * 字符串首字母小写
	 * @param str
	 * @return
	 */
	public static String toLowerCaseFirstOne(String str) {
		if (StringUtils.isEmpty(str))
			return str;
		
		return Character.isLowerCase(str.charAt(0)) ? str : (new StringBuilder()).append(Character.toLowerCase(str.charAt(0))).append(str.substring(1)).toString();
			
	}

	/**
	 * 字符串首字母大写
	 * @param str
	 * @return
	 */
	public static String toUpperCaseFirstOne(String str) {
		if (StringUtils.isEmpty(str))
			return str;
		
		return Character.isUpperCase(str.charAt(0)) ? str : (new StringBuilder()).append(Character.toUpperCase(str.charAt(0))).append(str.substring(1)).toString();
	}
}
