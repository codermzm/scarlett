package com.scarlett.common.type;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.beanutils.BeanMap;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public class TypeUtils {
    
    @SuppressWarnings("unused")
    private static final Logger log = LoggerFactory.getLogger(TypeUtils.class);
    
    private static final SimpleDateFormat dataformat = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
    private static final SimpleDateFormat datatimeformat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
    private static final SimpleDateFormat timeforame = new SimpleDateFormat("HH:mm:ss");//设置日期格式
    private static final Pattern timeforamedouble = Pattern.compile("^((\\d{1,2}):(\\d{1,2}):(\\d{1,2}).(\\d+))|((\\d{4})(-|\\/)(\\d{1,2})(-|\\/)(\\d{1,2}) (\\d{1,2}):(\\d{1,2}):(\\d{1,2}).(\\d+))$");
    
    
    public static Object getDefault(Class<?> klz) {
        Object result = null;
        // 8种基本类型
        if (int.class.equals(klz) || byte.class.equals(klz)
            || short.class.equals(klz) || long.class.equals(klz)
            || char.class.equals(klz)) {
            result = 0;
        } else if (float.class.equals(klz)) {
            result = 0.0f;
        } else if (double.class.equals(klz)) {
            result = 0.0;
        }else if (boolean.class.equals(klz)) {
            result = false;
        }

        // 其他为引用类型
        return result;
    }
    
    /**
     * 判断对象或对象数组中每一个对象是否为空: 对象为null，字符序列长度为0，集合类、Map为empty
     * 
     * @param obj
     * @return
     */
    public static boolean isEmpty(Object obj) {
        if (obj == null)
            return true;
        if(obj instanceof String)
            return StringUtils.isEmpty((String)obj);
            
        if (obj instanceof CharSequence)
            return ((CharSequence) obj).length() == 0;

        if (obj instanceof Collection)
            return ((Collection<?>) obj).isEmpty();

        if (obj instanceof Map)
            return ((Map<?, ?>) obj).isEmpty();

        if (obj instanceof Object[]) {
            Object[] object = (Object[]) obj;
            if (object.length == 0) {
                return true;
            }
            boolean empty = true;
            for (int i = 0; i < object.length; i++) {
                if (!isEmpty(object[i])) {
                    empty = false;
                    break;
                }
            }
            return empty;
        }
        
        return false;
    }

    /**
     * 获取真实值
     * @param value 原值
     * @param type 目标类型
     * @return 目标值
     * */
    public static Object convertRealValue(Object value,Class<?> type){
        String strValue = convertObjToStr(value);
        
        return convertStrToObj(strValue,type);
    }
    
    /**
     * 转换字符串到真实类型
     * */
    public static Object convertStrToObj(String str,Class<?> type){
        Object objValue = null;
        if(type == String.class){
            objValue = String.valueOf(str);
        }else if(type == Integer.class){
            objValue = Integer.valueOf(str);
        }else if(type == Long.class){
            objValue = Long.valueOf(str);
        }else if(type == Float.class){
            objValue = Float.valueOf(str);
        }else if(type == Double.class){
            objValue = Double.valueOf(str);
        }else if(type == Boolean.class){
            objValue = Boolean.valueOf(str);
        }else if(type == Date.class){
            try {
                Matcher m = timeforamedouble.matcher(str);
                if(isDate(str)){
                    objValue = dataformat.parse(str);
                }else if(isTime(str)){
                    objValue = timeforame.parse(str);
                }else if(isDateTime(str)){
                    objValue = datatimeformat.parse(str);
                }else if(m.matches()){//带小数的时间
                    str = StringUtils.split(str,'.')[0];// str.split(".")[0];
                    objValue = convertStrToObj(str,Date.class);
                }else if(StringUtils.isEmpty(str)){
                    objValue = null;
                }else{
                    throw new RuntimeException("转换日期类型数据错误!运行库日期格式统一采用yyyy-MM-dd HH:mm:ss 。当前日期数据："+str);
                }
            } catch (ParseException e) {
                throw new RuntimeException("转换日期类型数据错误!运行库日期格式统一采用yyyy-MM-dd HH:mm:ss 。当前日期数据："+str);
            }
        }else if(type == java.sql.Date.class){
            Matcher m = timeforamedouble.matcher(str);
            if(m.matches())
                str = StringUtils.split(str,'.')[0];
            Date date = (Date) convertStrToObj(str,java.util.Date.class);
            if(isDate(str)){
                objValue = new java.sql.Date(date.getTime());
            }else if(isTime(str)){
                objValue = new java.sql.Time(date.getTime());
            }else if(isDateTime(str)){
                objValue = new java.sql.Timestamp(date.getTime());
            }else if(StringUtils.isEmpty(str)){
                objValue = null;
            }else{
                throw new RuntimeException("转换日期类型数据错误!运行库日期格式统一采用yyyy-MM-dd HH:mm:ss 。当前日期数据："+str);
            }
        }else if(type == BigDecimal.class){
            double d = Double.valueOf(str);
            objValue = BigDecimal.valueOf(d);
        }else{
            throw new RuntimeException("发现了未知的数据类型:"+type.toString());
        }
        
        return objValue;
    }
    
    /**
     * 转换Object 到字符串类型
     * */
    public static String convertObjToStr(Object obj){
        String result = StringUtils.EMPTY;
        if(obj instanceof Date){
            result = datatimeformat.format((Date) obj);
        }else{
            result = obj.toString();
        }
        
        return result;
    }
    
    
    /**
	 * 将Bean对象转换成Map对象，将忽略掉值为null或size=0的属性
	 * @param obj 对象
	 * @return 若给定对象为null则返回size=0的map对象
	 */
	public static Map<String, Object> toMap(Object obj) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (obj == null) {
			return map;
		}
		BeanMap beanMap = new BeanMap(obj);
		Iterator<String> it = beanMap.keyIterator();
		while (it.hasNext()) {
			String name = it.next();
			Object value = beanMap.get(name);
			// 转换时会将类名也转换成属性，此处去掉
			if (value != null && !name.equals("class")) {
				map.put(name, value);
			}
		}
		return map;
	}

	/**
	 * 该方法将给定的所有对象参数列表转换合并生成一个Map，对于同名属性，依次由后面替换前面的对象属性
	 * @param objs 对象列表
	 * @return 对于值为null的对象将忽略掉
	 */
	public static Map<String, Object> toMap(Object... objs) {
		Map<String, Object> map = new HashMap<String, Object>();
		for (Object object : objs) {
			if (object != null) {
				map.putAll(toMap(object));
			}
		}
		return map;
	}
    
    /**
	 * 获取接口的泛型类型，如果不存在则返回null
	 * @param clazz
	 * @return
	 */
	public static Class<?> getGenericClass(Class<?> clazz) {
		Type t = clazz.getGenericSuperclass();
		if (t instanceof ParameterizedType) {
			Type[] p = ((ParameterizedType) t).getActualTypeArguments();
			return ((Class<?>) p[0]);
		}
		
		return null;
	}

    /**
     * 转换mysql类型到java
     * */
    public static Class<?> getMysqlToJavaType( String mysqlType ) {
        return String.class;
    }
    
    protected static Pattern _date = Pattern.compile("^(\\d{4})(-|\\/)(\\d{1,2})(-|\\/)(\\d{1,2})$");
    private static boolean isDate(String date){
        Matcher matcher = _date.matcher(date);
        return matcher.matches();
    }
    
    protected static Pattern _datetime = Pattern.compile("^(\\d{4})(-|\\/)(\\d{1,2})(-|\\/)(\\d{1,2}) (\\d{1,2}):(\\d{1,2}):(\\d{1,2})$");
    private static boolean isDateTime(String date){
        Matcher matcher = _datetime.matcher(date);
        return matcher.matches();
    }
    
    protected static Pattern _time = Pattern.compile("^((20|21|22|23|24|[0-1]\\d)\\:[0-5][0-9])(\\:[0-5][0-9])?$");
    private static boolean isTime(String date){
        Matcher matcher = _time.matcher(date);
        return matcher.matches();
    }
    
    
}
