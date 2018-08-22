package com.scarlett.common.assembly;

import org.springframework.context.ApplicationContext;

public class AssemblyManage {
	
	 private static ApplicationContext applicationContext = null;   
	    
	    @SuppressWarnings("unchecked")
	    public static <T> T getBean(String name,Class<?> type){
	        T t = null;
	        if(applicationContext != null){
	            t = (T) applicationContext.getBean(name, type);
	        }else{
	           throw new RuntimeException("beanFactory未初始化!");
	        }
	        
	        return t;
	    }
	    
	    @SuppressWarnings("unchecked")
	    public static <T> T getBean(Class<?> type){
	        T t = null;
	        if(applicationContext != null){
	            t = (T) applicationContext.getBean(type);
	        }else{
	           throw new RuntimeException("beanFactory未初始化!");
	        }
	        
	        return t;
	    }

	    public static boolean containsBean(String beanId){
	        return applicationContext.containsBean(beanId);
	    }

	    public static ApplicationContext getApplicationContext() {
	        return applicationContext;
	    }

	    public static void setApplicationContext(ApplicationContext app) {
	        applicationContext = app;
	    }
}
