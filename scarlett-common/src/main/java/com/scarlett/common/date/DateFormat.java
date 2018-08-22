package com.scarlett.common.date;

/**
 * Created by admin on 2017/3/4.
 */
public enum DateFormat {

    DATE_FORMAT( "yyyy-MM-dd" ),

    TIME_FORMAT( "HH:mm:ss" ),

    DATETIME_FORMAT( "yyyy-MM-dd HH:mm:ss" );

    private String format;

    DateFormat( String format ) {
        this.format = format;
    }

    public String getFormat( ) {
        return format;
    }

}
