package com.scarlett.common.type;


import org.apache.commons.lang3.reflect.FieldUtils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class ReflectUtil {
    public static Object setFieldValueDefault(Object target, String fname,
                                              Class ftype, Object fvalue) {
        if (target == null
                || fname == null
                || "".equals(fname)
                || (fvalue != null && !ftype
                .isAssignableFrom(fvalue.getClass()))) {
            return target;
        }
        Class clazz = target.getClass();
        Field[] fs = clazz.getDeclaredFields();
        try {
            for (int i = 0; i < fs.length; i++) {
                if (fname.toLowerCase().equals(fs[i].getName().toLowerCase())) {
                    Method method = clazz.getDeclaredMethod("set"
                            + Character.toUpperCase(fs[i].getName().charAt(0))
                            + fs[i].getName().substring(1), String.class);
                    if (!Modifier.isPublic(method.getModifiers())) {
                        method.setAccessible(true);
                    }
                    method.invoke(target, fvalue);
                }
            }
        } catch (Exception me) {
            try {
                Field field = clazz.getDeclaredField(fname);
                if (!Modifier.isPublic(field.getModifiers())) {
                    field.setAccessible(true);
                }
                field.set(target, fvalue);
            } catch (Exception fe) {
                fe.getStackTrace();
            }
        }
        return target;
    }
    public static Object getFieldValue(Object obj , String fieldName ){

        if(obj == null){
            return null ;
        }

        Field targetField = getTargetField(obj.getClass(), fieldName);

        try {
            return FieldUtils.readField(targetField, obj, true ) ;
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return null ;
    }

    public static Field getTargetField(Class<?> targetClass, String fieldName) {
        Field field = null;

        try {
            if (targetClass == null) {
                return field;
            }

            if (Object.class.equals(targetClass)) {
                return field;
            }

            field = FieldUtils.getDeclaredField(targetClass, fieldName, true);
            if (field == null) {
                field = getTargetField(targetClass.getSuperclass(), fieldName);
            }
        } catch (Exception e) {
        }

        return field;
    }

    public static void setFieldValue(Object obj , String fieldName , Object value ){
        if(null == obj){return;}
        Field targetField = getTargetField(obj.getClass(), fieldName);
        try {
            FieldUtils.writeField(targetField, obj, value) ;
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}
